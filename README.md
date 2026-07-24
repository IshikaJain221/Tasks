# Student and Course Management — Backend

A REST API for managing students and courses, built with **Node.js, Express,
and PostgreSQL**. Uses stored procedures for write operations, database
transactions for consistency, and JWT-based role authentication
(ADMIN / STUDENT).

## Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Express 4
- **Database:** PostgreSQL 13+
- **Auth:** JWT (jsonwebtoken) + bcrypt password hashing
- **Docs:** Swagger UI (OpenAPI 3.0) at `/api-docs`

---

## 1. Setup and Run

### Prerequisites
- Node.js 18+
- PostgreSQL 13+ running locally (or a connection string to a hosted instance)

### Steps

```bash
# 1. Clone and install
git clone <repo-url>
cd student-course-management
npm install

# 2. Create the database
createdb student_course_db
# or: psql -U postgres -c "CREATE DATABASE student_course_db;"

# 3. Configure environment
cp .env.example .env
# edit .env with your DB credentials and a JWT secret

# 4. Run the schema + stored procedures
psql -U postgres -d student_course_db -f sql/01_schema.sql
psql -U postgres -d student_course_db -f sql/02_procedures.sql

# 5. (Optional) Seed an admin user + sample courses
npm run seed
# creates admin@example.com / Admin@123 and 3 sample courses

# 6. Start the server
npm run dev      # with nodemon (auto-reload)
# or
npm start

# Server:    http://localhost:3000
# API docs:  http://localhost:3000/api-docs
```

---

## 2. Database Schema

### `courses`
| Column          | Type         | Constraints                        |
|-----------------|--------------|-------------------------------------|
| course_id       | UUID         | PK, default `gen_random_uuid()`     |
| course_name     | VARCHAR(150) | NOT NULL                            |
| course_code     | VARCHAR(20)  | NOT NULL, UNIQUE                    |
| course_duration | INTEGER      | NOT NULL, CHECK > 0 (weeks)         |
| created_at      | TIMESTAMPTZ  | default now()                       |
| updated_at      | TIMESTAMPTZ  | auto-updated via trigger            |

### `students`
| Column       | Type         | Constraints                                          |
|--------------|--------------|-------------------------------------------------------|
| student_id   | UUID         | PK, default `gen_random_uuid()`                       |
| first_name   | VARCHAR(80)  | NOT NULL                                               |
| last_name    | VARCHAR(80)  | NOT NULL                                               |
| email        | VARCHAR(150) | NOT NULL, UNIQUE                                       |
| phone        | VARCHAR(20)  |                                                         |
| course_id    | UUID         | FK → courses(course_id), **ON DELETE RESTRICT**, nullable |
| enrolled_at  | TIMESTAMPTZ  | default now()                                          |
| created_at   | TIMESTAMPTZ  | default now()                                          |
| updated_at   | TIMESTAMPTZ  | auto-updated via trigger                               |

### `users` (auth)
| Column        | Type         | Constraints                                    |
|---------------|--------------|--------------------------------------------------|
| user_id       | UUID         | PK                                                |
| email         | VARCHAR(150) | NOT NULL, UNIQUE                                  |
| password_hash | VARCHAR(255) | NOT NULL (bcrypt)                                 |
| role          | ENUM         | 'ADMIN' \| 'STUDENT'                              |
| student_id    | UUID         | FK → students(student_id), ON DELETE CASCADE, nullable |

**Why `ON DELETE RESTRICT` on `students.course_id`?** It gives a hard
database-level guarantee that a course can never be silently orphaned from
students pointing at it. The app layer additionally offers a controlled
**cascade** path (see below) for when you *do* want to delete a course and
unassign its students in one atomic step.

Indexes are added on `students.course_id`, `students.email`,
`courses.course_code`, and `users.email` for query performance.

---

## 3. Stored Procedures (`sql/02_procedures.sql`)

All write paths that touch student↔course relationships go through
PL/pgSQL functions so validation + write happen atomically inside the
database, in addition to the Express-layer checks:

| Function | Purpose |
|---|---|
| `sp_add_student(first_name, last_name, email, phone, course_id)` | Validates the course exists (if provided) before inserting the student. Raises `COURSE_NOT_FOUND` otherwise. |
| `sp_update_student(student_id, first_name, last_name, email, phone, course_id, update_course)` | Partial update (`NULL` = leave unchanged for name/email/phone). `update_course` flag lets you explicitly set `course_id` to `NULL` (unassign) vs. leaving it untouched. Validates new course exists. |
| `sp_delete_student(student_id)` | Deletes a student; raises `STUDENT_NOT_FOUND` if missing. |
| `sp_delete_course(course_id, cascade)` | `cascade = false` (default): **restricts** deletion, raising `COURSE_HAS_STUDENTS` if any student is enrolled. `cascade = true`: unassigns all enrolled students (`course_id = NULL`) then deletes the course — both steps in one atomic function call. |

Each function either fully succeeds or raises an exception; combined with
Express-level `try/catch`, a partial write never lands in the database.

For the student **registration** flow (creating a `students` row + a
`users` login row together), the Node layer wraps both inserts in an
explicit transaction (`withTransaction` in `src/config/db.js`) using
`BEGIN` / `COMMIT` / `ROLLBACK`, since that operation spans two tables
outside the stored-procedure layer.

---

## 4. API Overview

Full interactive docs: `GET /api-docs` (Swagger UI).

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register-admin` | Public (bootstrap) | Create an admin login |
| POST | `/api/auth/register-student` | Public | Create student record + login (transactional) |
| POST | `/api/auth/login` | Public | Returns JWT `{ token, role, studentId }` |

### Courses
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/courses` | ADMIN | Create course |
| GET | `/api/courses` | ADMIN, STUDENT | List courses (+ enrolled count) |
| GET | `/api/courses/:id` | ADMIN, STUDENT | Get one course |
| GET | `/api/courses/:id/students` | ADMIN, STUDENT | Students enrolled in a course |
| PUT | `/api/courses/:id` | ADMIN | Update course |
| DELETE | `/api/courses/:id?cascade=true` | ADMIN | Delete course. Restricts by default if students are enrolled; `cascade=true` unassigns them first. |

### Students
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/students` | ADMIN | Add student with course assignment |
| GET | `/api/students?course_id=` | ADMIN | All students + joined course info, optional course filter |
| GET | `/api/students/:id` | ADMIN, or STUDENT (own record only) | Student + course details |
| PUT | `/api/students/:id` | ADMIN | Update student, optionally reassign course |
| DELETE | `/api/students/:id` | ADMIN | Delete student |

### Auth header
```
Authorization: Bearer <jwt-token>
```

---

## 5. Role-Based Access Control

- **ADMIN** — full access to all student and course endpoints.
- **STUDENT** — can only `GET /api/students/:id` for **their own**
  `student_id` (enforced by the `ownStudentRecordOnly` middleware, which
  compares the JWT's `studentId` claim to the URL param), and can browse
  course listings (`GET /api/courses`, `GET /api/courses/:id`).

Passwords are hashed with bcrypt (10 salt rounds); JWTs are signed with
`JWT_SECRET` and expire per `JWT_EXPIRES_IN` (default 8h).

---

## 6. Testing

A Postman collection is not included in this snapshot, but every endpoint
is documented and testable directly from Swagger UI at `/api-docs` —
click "Authorize" and paste `Bearer <token>` after logging in.

Suggested manual test flow:
1. `npm run seed` → gives you `admin@example.com` / `Admin@123` and 3 courses.
2. `POST /api/auth/login` as admin → copy the `token`.
3. `POST /api/courses` → create/verify courses, or list via `GET /api/courses`.
4. `POST /api/students` → add a student with a valid `course_id`; try an
   invalid UUID to confirm the `404 COURSE_NOT_FOUND` path.
5. `GET /api/students` → confirm joined course data appears.
6. `PUT /api/students/:id` with a new `course_id` → confirm reassignment.
7. `DELETE /api/courses/:id` on a course with enrolled students → expect
   `409`. Retry with `?cascade=true` → expect `204` and students'
   `course_id` set to `null`.
8. `POST /api/auth/register-student` → then log in as that student and
   confirm `GET /api/students/:id` works for their own ID but
   `403 Forbidden` for another student's ID.

---

## 7. Project Structure

```
student-course-management/
├── sql/
│   ├── 01_schema.sql          # Tables, constraints, indexes, triggers
│   └── 02_procedures.sql      # Stored procedures (add/update/delete)
├── src/
│   ├── config/db.js           # PG pool + transaction helper
│   ├── controllers/           # Route handlers
│   ├── middleware/auth.js     # JWT auth + role guards
│   ├── routes/                # Express routers
│   ├── db/seed.js             # Seeds admin user + sample courses
│   └── server.js              # App entrypoint
├── swagger.yaml                # OpenAPI spec
├── .env.example
└── package.json
```

## 8. Design Notes / Assumptions

- `course_duration` is stored in **weeks** (documented via column comment
  in the schema).
- A student's `course_id` is **nullable** — a student can exist unassigned
  to any course (e.g., pending enrollment).
- Course deletion defaults to **restrict**; cascade is opt-in via a query
  param to avoid accidental mass-unassignment.
- Bootstrap endpoints (`register-admin`) are open for demo purposes; in a
  production deployment this would be locked behind an existing admin
  session or a one-time setup script.

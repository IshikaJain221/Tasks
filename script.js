// =============================================================
// Icon set — simple stroke-based line icons, one per topic
// =============================================================
const icons = {
  mask: `<svg viewBox="0 0 48 48" fill="none"><path d="M8 20c0-9 7-14 16-14s16 5 16 14c0 10-6 20-16 20S8 30 8 20Z" stroke="currentColor" stroke-width="2"/><path d="M14 22c2 3 5 4 10 4s8-1 10-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="17" cy="18" r="1.6" fill="currentColor"/><circle cx="31" cy="18" r="1.6" fill="currentColor"/></svg>`,
  clay: `<svg viewBox="0 0 48 48" fill="none"><path d="M12 18h24l-2.5 20a4 4 0 0 1-4 3.5h-11a4 4 0 0 1-4-3.5L12 18Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 18h30" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M18 18v-3a6 6 0 0 1 12 0v3" stroke="currentColor" stroke-width="2"/></svg>`,
  serum: `<svg viewBox="0 0 48 48" fill="none"><path d="M20 6h8v9l6 6v18a3 3 0 0 1-3 3H17a3 3 0 0 1-3-3V21l6-6V6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M17 6h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M17 28h14" stroke="currentColor" stroke-width="2"/></svg>`,
  biotin: `<svg viewBox="0 0 48 48" fill="none"><rect x="14" y="10" width="20" height="28" rx="10" stroke="currentColor" stroke-width="2"/><path d="M14 24h20" stroke="currentColor" stroke-width="2"/></svg>`,
  toner: `<svg viewBox="0 0 48 48" fill="none"><path d="M18 14h8l4 4v20a3 3 0 0 1-3 3H17a3 3 0 0 1-3-3V18l4-4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M22 6h4v8h-4z" stroke="currentColor" stroke-width="2"/><path d="M30 20l6-2M31 25l6 0M30 30l6 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  lips: `<svg viewBox="0 0 48 48" fill="none"><path d="M8 22c4-6 10-8 16-8s12 2 16 8c-3 1-6 4-16 4S11 23 8 22Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8 22c4 7 10 10 16 10s12-3 16-10" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
  eye: `<svg viewBox="0 0 48 48" fill="none"><path d="M6 24c5-8 12-12 18-12s13 4 18 12c-5 8-12 12-18 12S11 32 6 24Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="24" cy="24" r="5" stroke="currentColor" stroke-width="2"/></svg>`,
  sun: `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="9" stroke="currentColor" stroke-width="2"/><path d="M24 4v6M24 38v6M4 24h6M38 24h6M9 9l4.2 4.2M34.8 34.8 39 39M39 9l-4.2 4.2M13.2 34.8 9 39" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
};

// =============================================================
// Topic + content data
// =============================================================
const topics = [
  {
    id: "face-masks",
    icon: icons.mask,
    name: "Face Masks",
    tagline: "Brighten, calm, or deep-clean — pick your finish.",
    diy: [
      {
        title: "Turmeric & Yogurt Brightening Mask",
        time: "15 min",
        skin: "Dull, uneven tone",
        ingredients: ["1 tbsp plain yogurt", "1/4 tsp turmeric powder", "1/2 tsp honey"],
        steps: ["Mix all three into a smooth paste.", "Apply a thin, even layer, avoiding eyes.", "Leave for 12–15 minutes, rinse with lukewarm water."],
      },
      {
        title: "Banana Oat Calming Mask",
        time: "20 min",
        skin: "Dry, sensitive",
        ingredients: ["1/2 ripe banana, mashed", "1 tbsp ground oats", "1 tsp milk or curd"],
        steps: ["Mash banana until lump-free, stir in oats and milk.", "Spread over face and neck.", "Rest 15–20 minutes, massage off gently with water."],
      },
    ],
    brand: [
      { name: "Charcoal Detox Mask", brand: "The Body Shop", price: "₹1,395", key: "Activated charcoal", type: "Oily, congested" },
      { name: "Ultra Repair Cream Mask", brand: "First Aid Beauty", price: "₹2,900", key: "Colloidal oatmeal", type: "Dry, reactive" },
    ],
  },
  {
    id: "multani-mitti",
    icon: icons.clay,
    name: "Multani Mitti Packs",
    tagline: "Fuller's earth for oil control and a matte finish.",
    diy: [
      {
        title: "Classic Multani Mitti & Rosewater",
        time: "20 min",
        skin: "Oily, acne-prone",
        ingredients: ["2 tbsp multani mitti", "Rosewater, as needed", "A few drops lemon juice (optional)"],
        steps: ["Mix multani mitti with rosewater to a spreadable paste.", "Apply evenly, keep away from active breakouts if using lemon.", "Let dry for 15–20 minutes; rinse before it fully cracks."],
      },
      {
        title: "Multani Mitti & Neem Clarifying Pack",
        time: "20 min",
        skin: "Acne-prone, breakout-heavy",
        ingredients: ["2 tbsp multani mitti", "1 tsp neem powder", "Water or rosewater to mix"],
        steps: ["Combine powders, add liquid slowly to a thick paste.", "Apply, avoiding open blemishes.", "Rinse after 15 minutes with cool water."],
      },
    ],
    brand: [
      { name: "Fuller's Earth Face Pack", brand: "Himalaya", price: "₹95", key: "Multani mitti + rosewater", type: "Oily" },
      { name: "Clay Detox Mask", brand: "Mamaearth", price: "₹399", key: "Multani mitti + bentonite", type: "Oily, dull" },
    ],
  },
  {
    id: "serums",
    icon: icons.serum,
    name: "Serums",
    tagline: "Concentrated actives — homemade or lab-formulated.",
    diy: [
      {
        title: "Aloe & Vitamin E Hydration Serum",
        time: "5 min prep",
        skin: "Dry, dehydrated",
        ingredients: ["2 tbsp fresh aloe vera gel", "1 vitamin E capsule", "3–4 drops glycerin"],
        steps: ["Scoop fresh aloe gel, whisk until smooth.", "Pierce and stir in the vitamin E capsule.", "Add glycerin, store in a clean bottle, refrigerate, use within 5 days."],
      },
      {
        title: "Green Tea Antioxidant Mist-Serum",
        time: "10 min prep",
        skin: "Dull, stressed skin",
        ingredients: ["1/4 cup brewed green tea, cooled", "1 tsp aloe vera gel", "1/2 tsp glycerin"],
        steps: ["Whisk cooled tea with aloe and glycerin.", "Pour into a spray or dropper bottle.", "Pat onto skin after cleansing; keep refrigerated, use within a week."],
      },
    ],
    brand: [
      { name: "Niacinamide 10% + Zinc 1%", brand: "The Ordinary", price: "₹690", key: "Niacinamide", type: "Oily, blemish-prone" },
      { name: "Vitamin C Suspension 23%", brand: "The Ordinary", price: "₹950", key: "Vitamin C", type: "Dull, uneven tone" },
    ],
  },
  {
    id: "biotin",
    icon: icons.biotin,
    name: "Biotin & Hair-Skin Boost",
    tagline: "Feed skin and scalp from the inside and out.",
    diy: [
      {
        title: "Biotin-Rich Breakfast Bowl",
        time: "10 min",
        skin: "Supports hair + skin, all types",
        ingredients: ["2 boiled eggs", "A handful of almonds & walnuts", "1/2 cup cooked sweet potato"],
        steps: ["Boil eggs and cool.", "Combine with nuts and sweet potato for a biotin-rich meal.", "Have a few times a week alongside your routine, not as a replacement for it."],
      },
      {
        title: "Egg & Yogurt Hair-Skin Mask",
        time: "25 min",
        skin: "Dry scalp and skin",
        ingredients: ["1 egg", "2 tbsp plain yogurt", "1 tsp honey"],
        steps: ["Whisk egg, yogurt, and honey together.", "Apply to scalp/hairline and face, avoiding eyes.", "Leave 20 minutes, rinse with lukewarm (not hot) water."],
      },
    ],
    brand: [
      { name: "Biotin Gummies", brand: "HealthKart", price: "₹499", key: "Biotin 5000mcg", type: "Dietary support" },
      { name: "Anti-Hairfall Biotin Serum", brand: "WOW Skin Science", price: "₹399", key: "Biotin + caffeine", type: "Scalp care" },
    ],
  },
  {
    id: "toners",
    icon: icons.toner,
    name: "Toners",
    tagline: "The step between cleansing and everything else.",
    diy: [
      {
        title: "Rosewater & Witch Hazel Toner",
        time: "5 min prep",
        skin: "Normal, oily",
        ingredients: ["1/2 cup pure rosewater", "2 tbsp alcohol-free witch hazel"],
        steps: ["Combine both in a clean bottle, shake to mix.", "Apply with a cotton pad after cleansing.", "Store away from direct sunlight, use within 2 weeks."],
      },
      {
        title: "Cooled Green Tea Toner",
        time: "10 min prep",
        skin: "Sensitive, stressed",
        ingredients: ["1 green tea bag", "1/2 cup hot water, cooled fully"],
        steps: ["Steep tea bag 5 minutes, then cool completely.", "Pour into a spray bottle.", "Mist onto face or apply with cotton pad; refrigerate, use within a week."],
      },
    ],
    brand: [
      { name: "Glycolic Acid 7% Toning Solution", brand: "The Ordinary", price: "₹1,190", key: "Glycolic acid", type: "Textured, dull" },
      { name: "Rose Water Facial Toner", brand: "Kama Ayurveda", price: "₹425", key: "Pure rose water", type: "All skin types" },
    ],
  },
  {
    id: "lip-care",
    icon: icons.lips,
    name: "Lip Care",
    tagline: "Soft lips need less than the internet says.",
    diy: [
      {
        title: "Sugar & Honey Lip Scrub",
        time: "5 min",
        skin: "Dry, chapped lips",
        ingredients: ["1 tsp sugar", "1/2 tsp honey", "Few drops coconut oil"],
        steps: ["Mix into a coarse paste.", "Massage onto lips in gentle circles for a minute.", "Rinse off, follow with a balm."],
      },
      {
        title: "Beetroot Tint Lip Balm",
        time: "15 min",
        skin: "Dry lips, wants tint",
        ingredients: ["1 tsp beetroot juice", "1 tbsp shea or cocoa butter, melted"],
        steps: ["Stir beetroot juice into melted butter.", "Pour into a small clean container, let set.", "Apply as needed; keep refrigerated for longer shelf life."],
      },
    ],
    brand: [
      { name: "Lip Sleeping Mask", brand: "Laneige", price: "₹1,590", key: "Berry extract + shea", type: "Overnight repair" },
      { name: "Lip Balm SPF 15", brand: "Nivea", price: "₹99", key: "Shea butter + SPF", type: "Daily protection" },
    ],
  },
  {
    id: "under-eye",
    icon: icons.eye,
    name: "Under-Eye Care",
    tagline: "Puffiness, darkness, and fine lines, addressed gently.",
    diy: [
      {
        title: "Chilled Cucumber Slices",
        time: "10 min",
        skin: "Puffy, tired eyes",
        ingredients: ["1 cucumber, chilled and sliced"],
        steps: ["Refrigerate slices for at least 30 minutes.", "Lie back and place a slice over each closed eye.", "Rest for 10 minutes, remove and pat dry."],
      },
      {
        title: "Cold Spoon + Potato Juice",
        time: "10 min",
        skin: "Dark circles, puffiness",
        ingredients: ["1 grated potato (juice extracted)", "2 metal spoons, chilled"],
        steps: ["Chill spoons in the fridge for 15 minutes.", "Dab a little potato juice under eyes, avoid direct eye contact.", "Rest the cold spoons over eyes for 5 minutes."],
      },
    ],
    brand: [
      { name: "Advanced Genifique Eye Cream", brand: "Lancôme", price: "₹4,200", key: "Bifidus prebiotic", type: "Fine lines, tired eyes" },
      { name: "Caffeine Solution 5% + EGCG", brand: "The Ordinary", price: "₹690", key: "Caffeine", type: "Puffiness, dark circles" },
    ],
  },
  {
    id: "sunscreen",
    icon: icons.sun,
    name: "Sunscreen Guide",
    tagline: "The one step nothing else can replace.",
    diyDisabled: true,
    diyNote: "We don't publish DIY sunscreen recipes. Homemade mixtures can't be tested for real SPF or UVA/UVB coverage, so they leave skin far less protected than the label suggests. This is one category worth buying, not brewing.",
    diy: [],
    brand: [
      { name: "Ultra Facial UV Fluid SPF50", brand: "Kiehl's", price: "₹2,500", key: "Broad spectrum SPF50", type: "All skin types" },
      { name: "Aqualux Sunscreen SPF50 PA++++", brand: "Minimalist", price: "₹549", key: "Broad spectrum, lightweight", type: "Oily, sensitive" },
    ],
  },
];

// =============================================================
// Render topic grid
// =============================================================
const topicGrid = document.getElementById("topicGrid");
let activeTopicId = topics[0].id;
let activeMode = "diy";

function renderTopicGrid() {
  topicGrid.innerHTML = "";
  topics.forEach((t) => {
    const card = document.createElement("button");
    card.className = "topic-card" + (t.id === activeTopicId ? " active" : "");
    card.innerHTML = `
      <span class="topic-icon">${t.icon}</span>
      <span class="topic-name">${t.name}</span>
      <span class="topic-tagline">${t.tagline}</span>
    `;
    card.addEventListener("click", () => {
      activeTopicId = t.id;
      activeMode = t.diyDisabled ? "brand" : "diy";
      renderTopicGrid();
      renderDetail();
      document.getElementById("detail").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    topicGrid.appendChild(card);
  });
}

// =============================================================
// Render detail panel
// =============================================================
const detailEyebrow = document.getElementById("detailEyebrow");
const detailTitle = document.getElementById("detailTitle");
const detailTagline = document.getElementById("detailTagline");
const toggleDiy = document.getElementById("toggleDiy");
const toggleBrand = document.getElementById("toggleBrand");
const diyCaution = document.getElementById("diyCaution");
const cardGrid = document.getElementById("cardGrid");

function currentTopic() {
  return topics.find((t) => t.id === activeTopicId);
}

function renderDetail() {
  const t = currentTopic();
  detailEyebrow.textContent = t.name;
  detailTitle.textContent = t.tagline;
  detailTagline.textContent =
    activeMode === "diy" ? "Ingredients you likely already have." : "Formulated, tested, ready to buy.";

  toggleDiy.classList.toggle("active", activeMode === "diy");
  toggleBrand.classList.toggle("active", activeMode === "brand");
  toggleDiy.disabled = !!t.diyDisabled;
  toggleDiy.classList.toggle("disabled", !!t.diyDisabled);

  if (t.diyDisabled && activeMode === "diy") {
    diyCaution.hidden = false;
    diyCaution.textContent = t.diyNote;
    cardGrid.innerHTML = "";
    return;
  }
  diyCaution.hidden = true;

  cardGrid.innerHTML = "";
  if (activeMode === "diy") {
    t.diy.forEach((r) => {
      const card = document.createElement("article");
      card.className = "card card-diy";
      card.innerHTML = `
        <div class="card-top">
          <h3>${r.title}</h3>
          <span class="card-meta">${r.time} · ${r.skin}</span>
        </div>
        <p class="card-label">Ingredients</p>
        <ul class="ingredient-list">${r.ingredients.map((i) => `<li>${i}</li>`).join("")}</ul>
        <p class="card-label">Steps</p>
        <ol class="step-list">${r.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
      `;
      cardGrid.appendChild(card);
    });
  } else {
    t.brand.forEach((p) => {
      const card = document.createElement("article");
      card.className = "card card-brand";
      card.innerHTML = `
        <div class="card-top">
          <h3>${p.name}</h3>
          <span class="card-meta">${p.brand}</span>
        </div>
        <div class="brand-rows">
          <div><span>Key ingredient</span><strong>${p.key}</strong></div>
          <div><span>Best for</span><strong>${p.type}</strong></div>
          <div><span>Price</span><strong>${p.price}</strong></div>
        </div>
      `;
      cardGrid.appendChild(card);
    });
  }
}

toggleDiy.addEventListener("click", () => {
  if (toggleDiy.disabled) return;
  activeMode = "diy";
  renderDetail();
});
toggleBrand.addEventListener("click", () => {
  activeMode = "brand";
  renderDetail();
});

// =============================================================
// Mobile nav toggle
// =============================================================
const navToggle = document.getElementById("navToggle");
const topNav = document.getElementById("topNav");
navToggle.addEventListener("click", () => {
  const open = topNav.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", open);
});
topNav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    topNav.classList.remove("open");
    navToggle.classList.remove("open");
  })
);

// =============================================================
// Init
// =============================================================
renderTopicGrid();
renderDetail();

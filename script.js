const products = [
  {name:"Broccoli", ar:"بروكلي مجمد", pack:"400g", image:"broccoli.jpg"},
  {name:"Cut Green Beans", ar:"فاصوليا خضراء مقطعة", pack:"400g", image:"green-beans.jpg"},
  {name:"Green Peas", ar:"بازلاء خضراء", pack:"400g", image:"green-peas.jpg"},
  {name:"Cauliflower", ar:"قرنبيط مجمد", pack:"400g", image:"cauliflower.jpg"},
  {name:"Spinach", ar:"سبانخ مجمدة", pack:"400g", image:"spinach.jpg"},
  {name:"Molokhia", ar:"ملوخية مجمدة", pack:"400g", image:"molokhia.jpg"},
  {name:"Mixed Vegetables", ar:"خضروات مشكلة", pack:"400g", image:"mixed-vegetables.jpg"},
  {name:"Strawberries", ar:"فراولة مجمدة", pack:"1kg", image:"strawberries.jpg"},
  {name:"Mango", ar:"مانجو مجمدة", pack:"1kg", image:"mango.jpg"}
];
const phone = "201280133913";

function wa(name="", pack="", qty="") {
  const lines = [
    "Hello Dream of the Future, I would like to request a quotation.",
    name ? `Product: ${name}` : "",
    pack ? `Packaging: ${pack}` : "",
    qty ? `Quantity: ${qty}` : ""
  ].filter(Boolean).join("\n");

  return `https://wa.me/${phone}?text=${encodeURIComponent(lines)}`;
}

const grid = document.getElementById("productsGrid");

if (grid) {
  grid.innerHTML = products.map(p => `
    <article class="product-card">
      <a class="product-link" href="product.html?product=${encodeURIComponent(p.name)}">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <h3>${p.name}</h3>
        <p>${p.ar}</p>
        <span>${p.pack}</span>
      </a>

      <div class="product-actions">
        <a class="btn" href="product.html?product=${encodeURIComponent(p.name)}">
          VIEW DETAILS
        </a>
        <a class="btn whatsapp" target="_blank" href="${wa(p.name,p.pack)}">
          WHATSAPP
        </a>
      </div>
    </article>
  `).join("");
}

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => nav.classList.remove("open"));
  });
}

const detail = document.getElementById("detail");

if (detail) {
  const params = new URLSearchParams(location.search);
  const requested = params.get("product");

  const p = products.find(x => x.name === requested) || products[0];

  document.title = `${p.name} | Dream of the Future`;

  detail.innerHTML = `
    <div class="detail-image">
      <img src="${p.image}" alt="${p.name}">
    </div>

    <div class="detail-copy">
      <span class="eyebrow">PREMIUM IQF</span>
      <h1>${p.name}</h1>
      <h2>${p.ar}</h2>

      <p>
        Premium Egyptian IQF frozen ${p.name.toLowerCase()},
        carefully selected and processed to preserve freshness,
        taste and quality.
      </p>

      <label for="packSize">Packaging</label>

      <select id="packSize">
        <option value="400g">400 gram</option>
        <option value="1kg">1 kilo</option>
        <option value="2.5kg">2.5 kilo</option>
        <option value="10kg">10 kilo</option>
      </select>

      <label for="quantity">Quantity</label>

      <input
        id="quantity"
        type="number"
        min="1"
        value="1"
        placeholder="Quantity"
      >

      <a
        id="topQuote"
        class="btn primary"
        target="_blank"
        href="${wa(p.name,"400g","1")}"
      >
        REQUEST QUOTE ON WHATSAPP
      </a>
    </div>
  `;

  const packSelect = document.getElementById("packSize");
  const qtyInput = document.getElementById("quantity");
  const topQuote = document.getElementById("topQuote");

  function updateWhatsApp() {
    topQuote.href = wa(
      p.name,
      packSelect.value,
      qtyInput.value
    );
  }

  packSelect.addEventListener("change", updateWhatsApp);
  qtyInput.addEventListener("input", updateWhatsApp);
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();

    const data = new FormData(e.target);

    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const message = data.get("message") || "";

    const text =
      `Hello Dream of the Future,\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Message: ${message}`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  });
}

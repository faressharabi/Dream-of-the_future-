const products = [
    {
        name: "Broccoli",
        ar: "بروكلي مجمد",
        image: "broccoli.jpg"
    },
    {
        name: "Cut Green Beans",
        ar: "فاصوليا خضراء مقطعة",
        image: "green-beans.jpg"
    },
    {
        name: "Green Peas",
        ar: "بازلاء خضراء",
        image: "green-peas.jpg"
    },
    {
        name: "Cauliflower",
        ar: "قرنبيط مجمد",
        image: "cauliflower.jpg"
    },
    {
        name: "Spinach",
        ar: "سبانخ مجمدة",
        image: "spinach.jpg"
    },
    {
        name: "Molokhia",
        ar: "ملوخية مجمدة",
        image: "molokhia.jpg"
    },
    {
        name: "Mixed Vegetables",
        ar: "خضار مشكل",
        image: "mixed-vegetables.jpg"
    },
    {
        name: "Strawberries",
        ar: "فراولة مجمدة",
        image: "strawberries.jpg"
    },
    {
        name: "Mango",
        ar: "مانجو مجمدة",
        image: "mango.jpg"
    }
];

const phone = "201280133913";


/* =========================
   WHATSAPP
========================= */

function wa(name = "", pack = "", qty = "") {

  const lines = [
    "Hello Dream of the Future, I would like to request a quotation.",
    name ? `Product: ${name}` : "",
    pack ? `Packaging: ${pack}` : "",
    qty ? `Quantity: ${qty}` : ""
  ]
  .filter(Boolean)
  .join("\n");

  return `https://wa.me/${phone}?text=${encodeURIComponent(lines)}`;
}


/* =========================
   PRODUCTS ON HOME PAGE
========================= */

const grid = document.getElementById("productsGrid");

if (grid) {

  grid.innerHTML = products.map(p => `
    
    <article class="product-card">

      <a
        class="product-link"
        href="product.html?product=${encodeURIComponent(p.name)}"
      >

        <img
          src="${p.image}"
          alt="${p.name}"
          loading="lazy"
        >

        <h3>${p.name}</h3>

        <p>${p.ar}</p>

      </a>

      <div class="product-actions">

        <a
          class="btn"
          href="product.html?product=${encodeURIComponent(p.name)}"
        >
          VIEW DETAILS
        </a>

        <a
          class="btn whatsapp"
          target="_blank"
          href="${wa(p.name)}"
        >
          WHATSAPP
        </a>

      </div>

    </article>

  `).join("");
}


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if (menuBtn && nav) {

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });

  });

}


/* =========================
   PRODUCT DETAILS PAGE
========================= */

const detail = document.getElementById("detail");

if (detail) {

  const params = new URLSearchParams(location.search);

  const requested = params.get("product");

  const p =
    products.find(product => product.name === requested)
    || products[0];


  document.title =
    `${p.name} | Dream of the Future`;


  detail.innerHTML = `

    <div class="detail-image">

      <img
        src="${p.image}"
        alt="${p.name}"
      >

    </div>


    <div class="detail-copy">

      <span class="eyebrow">
        PREMIUM IQF
      </span>

      <h1>
        ${p.name}
      </h1>

      <h2>
        ${p.ar}
      </h2>

      <p>
        Premium Egyptian IQF frozen
        ${p.name.toLowerCase()},
        carefully selected and processed
        to preserve freshness, taste and quality.
      </p>


      <label for="packSize">
        Packaging
      </label>

      <select id="packSize">

        <option value="400 grams">
          400 grams
        </option>

        <option value="1 kilo">
          1 kilo
        </option>

        <option value="2.5 kilos">
          2.5 kilos
        </option>

        <option value="10 kilos">
          10 kilos
        </option>

      </select>


      <label for="quantity">
        Quantity
      </label>

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
        href="${wa(p.name, "400 grams", "1")}"
      >
        REQUEST QUOTE ON WHATSAPP
      </a>

    </div>

  `;


  const packSelect =
    document.getElementById("packSize");

  const qtyInput =
    document.getElementById("quantity");

  const topQuote =
    document.getElementById("topQuote");


  function updateWhatsApp() {

    topQuote.href = wa(
      p.name,
      packSelect.value,
      qtyInput.value
    );

  }


  packSelect.addEventListener(
    "change",
    updateWhatsApp
  );


  qtyInput.addEventListener(
    "input",
    updateWhatsApp
  );

}


/* =========================
   CONTACT FORM
========================= */

const contactForm =
  document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener(
    "submit",
    e => {

      e.preventDefault();

      const data =
        new FormData(e.target);

      const name =
        data.get("name") || "";

      const email =
        data.get("email") || "";

      const message =
        data.get("message") || "";


      const text =
        `Hello Dream of the Future,\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Message: ${message}`;


      window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
        "_blank"
      );

    }
  );

}

const products = [
 {name:"Broccoli", ar:"بروكلي مجمد", pack:"400g", image:"assets/broccoli.jpg"},
 {name:"Cut Green Beans", ar:"فاصوليا خضراء مقطعة", pack:"400g", image:"assets/green-beans.jpg"},
 {name:"Green Peas", ar:"بسلة مجمدة", pack:"400g", image:"assets/green-peas.jpg"},
 {name:"Cauliflower", ar:"قرنبيط مجمد", pack:"400g", image:"assets/cauliflower.jpg"},
 {name:"Spinach", ar:"سبانخ مجمدة", pack:"400g", image:"assets/spinach.jpg"},
 {name:"Molokhia", ar:"ملوخية مجمدة", pack:"400g", image:"assets/molokhia.jpg"},
 {name:"Mixed Vegetables", ar:"خضروات مشكلة", pack:"400g", image:"assets/mixed-vegetables.jpg"},
 {name:"Strawberries", ar:"فراولة مجمدة", pack:"1kg", image:"assets/strawberries.jpg"},
 {name:"Mango", ar:"مانجو مجمدة", pack:"1kg", image:"assets/mango.jpg"}
];
const phone="201280133913";
function wa(name="", pack="", qty="") {
 const lines = [
  "Hello Dream of the Future, I would like to request a quotation.",
  name ? `Product: ${name}` : "",
  pack ? `Packaging: ${pack}` : "",
  qty ? `Quantity: ${qty}` : ""
 ].filter(Boolean).join("\n");
 return `https://wa.me/${phone}?text=${encodeURIComponent(lines)}`;
}

const grid=document.getElementById('productsGrid');
if(grid){grid.innerHTML=products.map(p=>`<article class="product-card"><a class="product-link" href="product.html?product=${encodeURIComponent(p.name)}"><img src="${p.image}" alt="${p.name}" loading="lazy"></a><h3>${p.name}</h3><p>IQF Frozen ${p.name} — ${p.pack}</p><div class="card-actions"><a class="small-btn" href="product.html?product=${encodeURIComponent(p.name)}">VIEW DETAILS</a><a class="small-btn whatsapp-btn" target="_blank" href="${wa(p.name)}">WHATSAPP</a></div></article>`).join('');}

const menuBtn=document.querySelector('.menu-btn'), nav=document.querySelector('nav');
if(menuBtn) menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));
if(nav) nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const detail=document.getElementById('detail');
if(detail){
 const params=new URLSearchParams(location.search); const requested=params.get('product'); const p=products.find(x=>x.name.toLowerCase()===String(requested).toLowerCase()) || products[0];
 document.title=`${p.name} | Dream of the Future`;
 detail.innerHTML=`<div class="detail-image"><img src="${p.image}" alt="${p.name}"></div><div class="detail-copy"><span class="eyebrow">PREMIUM IQF PRODUCT</span><h1>${p.name}</h1><p class="arabic-name">${p.ar}</p><p>Premium Egyptian IQF frozen ${p.name.toLowerCase()}, carefully selected and processed to preserve freshness, taste, color and nutrients.</p><div class="quote-builder"><div class="pack-selector"><label for="packSize">CHOOSE PACKAGING</label><select id="packSize"><option value="400g">400 g</option><option value="1kg">1 kg</option><option value="2.5kg">2.5 kg</option><option value="10kg">10 kg</option></select></div><div class="pack-selector"><label for="quantity">QUANTITY</label><input id="quantity" type="number" min="1" value="1" placeholder="Number of cartons / units"></div></div><div class="specs"><div><strong>PACK SIZE</strong><span id="selectedPack">400 g</span></div><div><strong>ORIGIN</strong><span>Egypt</span></div><div><strong>PROCESS</strong><span>IQF</span></div><div><strong>STORAGE</strong><span>-18°C</span></div></div><div class="detail-actions"><a class="btn primary" id="productQuote" target="_blank" href="${wa(p.name,'400g','1')}">REQUEST QUOTE ON WHATSAPP</a><a class="btn dark-outline" href="products.html">← ALL PRODUCTS</a></div></div>`;
 const packSelect=document.getElementById('packSize'), qtyInput=document.getElementById('quantity'), selectedPack=document.getElementById('selectedPack'), productQuote=document.getElementById('productQuote');
 if(packSelect){ packSelect.value=p.pack==='1kg'?'1kg':'400g'; selectedPack.textContent=packSelect.options[packSelect.selectedIndex].text; const updateQuote=()=>{selectedPack.textContent=packSelect.options[packSelect.selectedIndex].text; const qty=Math.max(1,Number(qtyInput.value||1)); productQuote.href=wa(p.name,packSelect.value,qty);}; updateQuote(); packSelect.addEventListener('change',updateQuote); qtyInput.addEventListener('input',updateQuote); }
 const top=document.getElementById('topQuote'), floater=document.getElementById('floatWhatsapp'); if(top) top.href=wa(p.name); if(floater) floater.href=wa(p.name);
}

const contactForm=document.getElementById('contactForm');
if(contactForm) contactForm.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.target);const subject=encodeURIComponent(data.get('subject')||'Website Inquiry');const body=encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);window.location.href=`mailto:faressharabia3@gmail.com?subject=${subject}&body=${body}`;});

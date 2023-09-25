// Hónapok tömbje
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

// Az API hívása és adatok megjelenítése
fetch("https://api.slingacademy.com/v1/sample-data/products")
  .then((response) => response.json())
  .then((data) => {
    // Változó az adatokhoz
    const products = data.products;

    // Az első 9 terméket megjelenítjük, 3 darab 3 sorban
    const slicedProducts = products.slice(0, 9);

    // HTML elemek létrehozása és beillesztése
    const container = document.querySelector(".grid");
    slicedProducts.forEach((product) => {
      // Dátum formázása
      const date = new Date(product.created_at);
      const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${months[date.getMonth()]}.${date.getFullYear()}`;

      const productElement = document.createElement("div");
      productElement.classList.add(
        "bg-white",
        "rounded",
        "max-w-screen-2xl" // Hozzáadva a szélességi osztály
      );
      productElement.innerHTML = `
        <div class="bg-white rounded">
          <img src="${product.photo_url}" alt="${product.name}" class="w-full h-auto">
          <p class="text-gray-500 mt-2">${formattedDate}</p>
          <p class="text-2xl font-semibold mt-2">${product.name}</p>
        </div>
      `;
      container.appendChild(productElement);

      // Kategória hozzáadása a tömbhöz
      categories.push(product.category);
    });

    // Kategóriák egyedülállóvá tétele a Set használatával
    const uniqueCategories = Array.from(new Set(categories));

    // Kategóriák megjelenítése
    displayCategories(uniqueCategories);

    // Frissítjük az üzenetet az API elérésének sikerességével
    document.getElementById("apiMessage").textContent = "Az API elérve és az adatok megjelenítve!";
  })
  .catch((error) => {
    console.error("Hiba történt:", error);
    // Frissítjük az üzenetet, ha hiba történt
    document.getElementById("apiMessage").textContent = "Hiba történt az API elérése során.";
  });

// Kategóriák tömb
const categories = [];

// Kategóriák megjelenítése
function displayCategories(categories) {
  const mobileCategoryList = document.getElementById("mobileCategoryList");
  const lgCategoryList = document.querySelector(".lg.flex.space-x-4");

  categories.forEach((category) => {
    // Kategória hozzáadása a mobil nézethez
    const mobileListItem = document.createElement("li");
    mobileListItem.textContent = category;
    mobileListItem.classList.add("px-4", "py-2");
    mobileCategoryList.appendChild(mobileListItem);

    // Kategória hozzáadása a nagy képernyőhöz
    const lgListItem = document.createElement("li");
    lgListItem.textContent = category;
    lgListItem.classList.add("mb-1");
    lgCategoryList.appendChild(lgListItem);
  });
}

/* Categories */
function toggleMobileCategories() {
  const mobileCategoryList = document.getElementById("mobileCategoryList");
  mobileCategoryList.classList.toggle("hidden");
}

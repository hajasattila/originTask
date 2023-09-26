// Hónapok
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

// Kategóriák
const categories = [];

// API fetchelése
fetch("https://api.slingacademy.com/v1/sample-data/products")
  .then((response) => response.json())
  .then((data) => {
    const products = data.products;

    // Első 9 termék
    const slicedProducts = products.slice(0, 9);

    // HTML elemek
    const container = document.querySelector(".grid");
    slicedProducts.forEach((product) => {
      // Dátum pipe
      const date = new Date(product.created_at);
      const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${months[date.getMonth()]}.${date.getFullYear()}`;

      //Ha nem láttuk még hozzáadjuk
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }

      //Kártyák megjelenítése
      const productElement = document.createElement("div");
      productElement.classList.add("bg-white", "rounded", "max-w-screen-2xl");
      productElement.innerHTML = `
        <div class="bg-white rounded">
          <img src="${product.photo_url}" alt="${product.name}" class="w-full h-auto">
          <p class="text-gray-500 mt-2">${formattedDate}</p>
          <p class="text-2xl font-semibold mt-2">${product.name}</p>
        </div>
      `;
      container.appendChild(productElement);
    });

    /*     console.log("Kategóriák:", categories); */

    // Kategóriák megjelenítése mobil és gép nézeten
    const mobileCategoryList = document.getElementById("mobileCategoryList");
    const desktopCategoryList = document.getElementById("categoryList");

    categories.forEach((category) => {
      const listItem = document.createElement("li");
      listItem.textContent = category;
      listItem.classList.add("px-4", "py-2");

      mobileCategoryList.appendChild(listItem.cloneNode(true));
      desktopCategoryList.appendChild(listItem);
    });
  });

//Telefon kategória gomb
function toggleMobileCategories() {
  const mobileCategoryList = document.getElementById("mobileCategoryList");
  mobileCategoryList.classList.toggle("hidden");
}

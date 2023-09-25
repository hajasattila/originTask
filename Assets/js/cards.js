// Hónapok tömbje
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dec",
];

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
      const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${
        months[date.getMonth()]
      }.${date.getFullYear()}`;

      const productElement = document.createElement("div");
      productElement.classList.add("p-4", "bg-white", "rounded"); // Keret eltávolítva
      productElement.innerHTML = `
                 <div class="bg-white rounded">
                     <img src="${product.photo_url}" alt="${product.name}" class="w-full h-auto">
                     <p class="text-gray-500 mt-2">${formattedDate}</p>
                     <p class="text-xl font-semibold mt-2">${product.name}</p>
                 </div>
             `;
      /* <p class="text-blue-500 mt-2">${product.category}</p> */
      container.appendChild(productElement);
    });

    // Frissítjük az üzenetet az API elérésének sikerességével
    document.getElementById("apiMessage").textContent =
      "Az API elérve és az adatok megjelenítve!";
  })
  .catch((error) => {
    console.error("Hiba történt:", error);
    // Frissítjük az üzenetet, ha hiba történt
    document.getElementById("apiMessage").textContent =
      "Hiba történt az API elérése során.";
  });

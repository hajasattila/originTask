const carousel = document.querySelector(".carousel-inner");
const photoDescription = document.getElementById("photo-description");
const photoCount = document.getElementById("photo-count");

let currentIndex = 0;
let photos = [];

// Függvény az API lekérdezéséhez
const fetchPhotos = async () => {
  try {
    const response = await fetch("https://api.slingacademy.com/v1/sample-data/photos");
    const data = await response.json();

    if (data.success && data.photos.length > 0) {
      photos = data.photos; // Frissítjük a photos tömböt az új adatokkal
      currentIndex = 0; // Alapértelmezett index

      // Frissítsd a karusellt az új adatokkal
      updateCarousel(photos);
    }
  } catch (error) {
    console.error(error);
  }
};

// Függvény a karusell frissítéséhez
const updateCarousel = (photos) => {
  // Töröld a korábbi dia elemeket
  carousel.innerHTML = "";

  // Megkapjuk a szülő div szélességét és magasságát
  const parentWidth = carousel.clientWidth;
  const parentHeight = carousel.clientHeight;

  // Iterálj az API által visszaadott fotókon
  photos.forEach((photo, index) => {
    const inputId = `carousel-${index + 1}`;

    // Hozz létre input elemet és dia elemet
    const input = document.createElement("input");
    input.setAttribute("class", "carousel-open");
    input.setAttribute("type", "radio");
    input.setAttribute("id", inputId);
    input.setAttribute("name", "carousel");
    input.setAttribute("aria-hidden", "true");
    input.setAttribute("hidden", "");

    const div = document.createElement("div");
    div.setAttribute("class", "carousel-item");

    // Hozz létre egy img elemet a fotóhoz
    const img = document.createElement("img");
    img.setAttribute("src", photo.url);
    img.setAttribute("alt", photo.title);

    // Állítsd be a kép szélességét a szülő div szélességére
    img.style.width = `${parentWidth}px`;

    // Állítsd be a kép magasságát a szülő div magasságának felére
    img.style.height = `40rem`;

    // Hozz létre egy felirat div-et a fotó címével
    const caption = document.createElement("div");
    caption.setAttribute("class", "carousel-caption");
    caption.textContent = photo.title;

    div.appendChild(img);

    // Adj hozzá a dia elemeket a karusellhez
    carousel.appendChild(input);
    carousel.appendChild(div);

    // Kövessük, hogy hányadik képnél jár a slider
    if (index === currentIndex) {
      input.setAttribute("checked", "checked");
    }
  });

  // Frissítsd a képaláírást és a képszámot
  updatePhotoDescription(photos[currentIndex]);
  updatePhotoCount(currentIndex + 1, photos.length);
};

// Függvény a képaláírás frissítéséhez
const updatePhotoDescription = (photo) => {
  photoDescription.textContent = photo.description;
};

// Függvény a képszám frissítéséhez
const updatePhotoCount = (current, total) => {
  photoCount.textContent = `${current} / ${total}`;
};

// Függvény a következő dia-ra váltáshoz
const nextSlide = () => {
  const radios = document.querySelectorAll(".carousel-open");
  radios[currentIndex].removeAttribute("checked");

  currentIndex++;
  if (currentIndex >= radios.length) {
    currentIndex = 0;
  }

  radios[currentIndex].setAttribute("checked", "checked");
  updatePhotoDescription(photos[currentIndex]);
  updatePhotoCount(currentIndex + 1, photos.length); // Frissítjük a képszámot is
};

// Időzítő a következő dia-ra váltáshoz
setInterval(nextSlide, 5000);

// Indítsd el az adatok lekérését és a karusell frissítését
fetchPhotos();

const carousel = document.querySelector(".carousel-inner");
const photoDescription = document.getElementById("photo-description");
const photoCount = document.getElementById("photo-count");

let currentIndex = 0;
let photos = [];

// Fetch API
const fetchPhotos = async () => {
  try {
    const response = await fetch("https://api.slingacademy.com/v1/sample-data/photos");
    const data = await response.json();

    if (data.success && data.photos.length > 0) {
      photos = data.photos;
      currentIndex = 0;
      // Carousel frissítés új adatokkal
      updateCarousel(photos);
    }
  } catch (error) {
    console.error(error);
  }
};

const updateCarousel = (photos) => {
  carousel.innerHTML = "";

  // Szülő szélesség, magasság
  const parentWidth = carousel.clientWidth;
  const parentHeight = carousel.clientHeight;

  // Végig iterálunk az API által adott képeken
  photos.forEach((photo, index) => {
    const inputId = `carousel-${index + 1}`;

    // Input és dia elem
    const input = document.createElement("input");
    input.setAttribute("class", "carousel-open");
    input.setAttribute("type", "radio");
    input.setAttribute("id", inputId);
    input.setAttribute("name", "carousel");
    input.setAttribute("aria-hidden", "true");
    input.setAttribute("hidden", "");

    const div = document.createElement("div");
    div.setAttribute("class", "carousel-item");

    const img = document.createElement("img");
    img.setAttribute("src", photo.url);
    img.setAttribute("alt", photo.title);

    img.style.width = `${parentWidth}px`;
    img.style.height = `40rem`;

    //Felirat
    const caption = document.createElement("div");
    caption.setAttribute("class", "carousel-caption");
    caption.textContent = photo.title;

    div.appendChild(img);

    // Dia elemek hozzáadása
    carousel.appendChild(input);
    carousel.appendChild(div);

    // Hanyadik kép
    if (index === currentIndex) {
      input.setAttribute("checked", "checked");
    }
  });

  // Frissítés
  updatePhotoDescription(photos[currentIndex]);
  updatePhotoCount(currentIndex + 1, photos.length);
};

// Képaláírás
const updatePhotoDescription = (photo) => {
  photoDescription.textContent = photo.description;
};

// Képszám
const updatePhotoCount = (current, total) => {
  photoCount.textContent = `${current} / ${total}`;
};

// Kövi dia
const nextSlide = () => {
  const radios = document.querySelectorAll(".carousel-open");
  radios[currentIndex].removeAttribute("checked");

  currentIndex++;
  if (currentIndex >= radios.length) {
    currentIndex = 0;
  }

  radios[currentIndex].setAttribute("checked", "checked");
  updatePhotoDescription(photos[currentIndex]);
  updatePhotoCount(currentIndex + 1, photos.length);
};

//Váltási időköz
setInterval(nextSlide, 5000);

//Adatok lekérése
fetchPhotos();

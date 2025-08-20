// ============================
// BTN TO TOP
// ============================
const btnToTop = document.getElementById("btnToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btnToTop.classList.add("show");
  } else {
    btnToTop.classList.remove("show");
  }
});

btnToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ============================
// SET YEAR FOOTER
// ============================
document.getElementById("year").textContent = new Date().getFullYear();

// ============================
// GOOGLE MAPS ROUTE BUTTONS
// ============================
const mapsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=-7.043350649199297, 112.07425779150154";

document.getElementById("btnRouteHero").href = mapsUrl;
document.getElementById("btnRouteInfo").href = mapsUrl;

// ============================
// LEAFLET MAP
// ============================
const map = L.map("map").setView([-7.043350649199297, 112.07425779150154], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OSM</a>',
}).addTo(map);

L.marker([-7.043350649199297, 112.07425779150154])
  .addTo(map)
  .bindPopup("<b>Embung Popoan</b><br>Wisata Desa Kepohagung")
  .openPopup();

// ============================
// GALLERY SCROLL
// ============================
const galleryScroll = document.getElementById("galleryScroll");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
let scrollAmount = 0;
const scrollStep = 270; // lebar item + gap
let autoScroll;

function startAutoScroll() {
  autoScroll = setInterval(() => {
    galleryScroll.scrollBy({ left: scrollStep, behavior: "smooth" });
    scrollAmount += scrollStep;

    if (
      galleryScroll.scrollLeft + galleryScroll.clientWidth >=
      galleryScroll.scrollWidth
    ) {
      galleryScroll.scrollTo({ left: 0, behavior: "smooth" });
      scrollAmount = 0;
    }
  }, 3000);
}

function stopAutoScroll() {
  clearInterval(autoScroll);
}

btnNext.addEventListener("click", () => {
  stopAutoScroll();
  galleryScroll.scrollBy({ left: scrollStep, behavior: "smooth" });
  startAutoScroll();
});

btnPrev.addEventListener("click", () => {
  stopAutoScroll();
  galleryScroll.scrollBy({ left: -scrollStep, behavior: "smooth" });
  startAutoScroll();
});

// Mulai autoplay saat load
startAutoScroll();

// ============================
// LIGHTBOX GALERI
// ============================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = lightbox.querySelector(".lightbox-close");
const lightboxPrev = lightbox.querySelector(".lightbox-prev");
const lightboxNext = lightbox.querySelector(".lightbox-next");
const galleryItems = document.querySelectorAll(".gallery-item");

let currentIndex = 0;

// buka lightbox saat klik item
galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxImg.src = item.dataset.src;
    currentIndex = index;
  });
});

// fungsi untuk menampilkan gambar sesuai index
function showImage(index) {
  if (index < 0) {
    index = galleryItems.length - 1;
  } else if (index >= galleryItems.length) {
    index = 0;
  }
  lightboxImg.src = galleryItems[index].dataset.src;
  currentIndex = index;
}

// tombol navigasi
lightboxPrev.addEventListener("click", (e) => {
  e.stopPropagation(); // biar gak trigger close
  showImage(currentIndex - 1);
});
lightboxNext.addEventListener("click", (e) => {
  e.stopPropagation();
  showImage(currentIndex + 1);
});

// tombol close (ikon ×)
lightboxClose.addEventListener("click", (e) => {
  e.stopPropagation();
  lightbox.classList.remove("active");
});

// klik di luar gambar = close
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active");
  }
});


// ============================
// LIGHTBOX DENAH (khusus denah)
// ============================
const infoMapBox = document.querySelector(".info-map");
const lightboxDenah = document.getElementById("lightbox-denah");
const lightboxDenahImg = document.getElementById("lightbox-denah-img");
const lightboxDenahClose = lightboxDenah.querySelector(".lightbox-close");

if (infoMapBox) {
  infoMapBox.addEventListener("click", () => {
    lightboxDenah.classList.add("active");
    lightboxDenahImg.src = "images/denah_popoan.png"; // load khusus denah
  });
}

if (lightboxDenahClose) {
  lightboxDenahClose.addEventListener("click", () => {
    lightboxDenah.classList.remove("active");
  });
}

lightboxDenah.addEventListener("click", (e) => {
  if (e.target === lightboxDenah) {
    lightboxDenah.classList.remove("active");
  }
});

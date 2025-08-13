// -- KKN Kepohagung-Unisda 2025 --

// --- KONSTANTA & VARIABEL ---
const galleryScroll = document.getElementById("galleryScroll");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const galleryItems = Array.from(
  document.querySelectorAll(".gallery-item")
);

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = lightbox.querySelector(".lightbox-close");
const lightboxPrev = lightbox.querySelector(".lightbox-prev");
const lightboxNext = lightbox.querySelector(".lightbox-next");

let currentIndex = 0;
const visibleCount = 4;
const itemWidth = 250 + 20; // width + gap in px

// --- FUNGSI GALERI SCROLL ---
function updateGalleryScroll() {
  const maxScroll =
    (galleryItems.length - visibleCount) * itemWidth;
  let scrollPos = currentIndex * itemWidth;
  if (scrollPos < 0) scrollPos = 0;
  if (scrollPos > maxScroll) scrollPos = maxScroll;
  galleryScroll.style.transform = `translateX(-${scrollPos}px)`;
}

btnPrev.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateGalleryScroll();
  }
});

btnNext.addEventListener("click", () => {
  if (currentIndex < galleryItems.length - visibleCount) {
    currentIndex++;
    updateGalleryScroll();
  }
});

// --- FUNGSI LIGHTBOX ---
function openLightbox(index) {
  currentIndex = index;
  lightbox.classList.add("active");
  updateLightboxImage();
  lightbox.focus();
}

function closeLightbox() {
  lightbox.classList.remove("active");
}

function updateLightboxImage() {
  const item = galleryItems[currentIndex];
  if (item) {
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt || "Foto galeri";
  }
}

function showNextImage() {
  currentIndex++;
  if (currentIndex >= galleryItems.length) currentIndex = 0;
  updateLightboxImage();
}

function showPrevImage() {
  currentIndex--;
  if (currentIndex < 0) currentIndex = galleryItems.length - 1;
  updateLightboxImage();
}

// Variabel delay dan kecepatan
const scrollIntervalMs = 5000; // waktu antar perpindahan foto (5 detik)
const scrollStepPx = itemWidth; // langkah scroll per kali (1 foto)

// Fungsi auto scroll ke kanan dengan loop
function autoScrollGallery() {
  currentIndex++;
  if (currentIndex > galleryItems.length - visibleCount) {
    currentIndex = 0; // reset ke awal untuk loop
  }
  updateGalleryScroll();
}

// Mulai interval auto scroll
let autoScrollTimer = setInterval(autoScrollGallery, scrollIntervalMs);

// Hentikan auto scroll saat user klik tombol prev/next atau galeri
btnPrev.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateGalleryScroll();
    resetAutoScrollTimer();
  }
});

btnNext.addEventListener("click", () => {
  if (currentIndex < galleryItems.length - visibleCount) {
    currentIndex++;
    updateGalleryScroll();
    resetAutoScrollTimer();
  }
});

// Reset interval timer saat user interaksi agar tidak langsung scroll setelah klik
function resetAutoScrollTimer() {
  clearInterval(autoScrollTimer);
  autoScrollTimer = setInterval(autoScrollGallery, scrollIntervalMs);
}

// Optional: Hentikan auto scroll jika mouse hover galeri
const galleryContainer = document.querySelector(".gallery-container");
galleryContainer.addEventListener("mouseenter", () => {
  clearInterval(autoScrollTimer);
});
galleryContainer.addEventListener("mouseleave", () => {
  autoScrollTimer = setInterval(autoScrollGallery, scrollIntervalMs);
});


// --- EVENT LISTENERS ---

// Buka lightbox saat klik gambar galeri
galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openLightbox(index));
  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox(index);
    }
  });
});

// Tutup lightbox saat klik tombol close
lightboxClose.addEventListener("click", closeLightbox);

// Navigasi lightbox dengan panah
lightboxNext.addEventListener("click", showNextImage);
lightboxPrev.addEventListener("click", showPrevImage);

// Navigasi keyboard dalam lightbox
lightbox.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    showNextImage();
  } else if (e.key === "ArrowLeft") {
    showPrevImage();
  } else if (e.key === "Escape") {
    closeLightbox();
  }
});

// Tutup lightbox jika klik di luar gambar
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// --- PETA LEAFLET ---
const map = L.map("map").setView([-7.044132, 112.074571], 15);

L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }
).addTo(map);

const marker = L.marker([-7.044132, 112.074571])
  .addTo(map)
  .bindPopup(
    "<b>Embung Popoan</b><br>Desa Kepohagung, Plumpang, Tuban"
  );

// --- Dinamis tahun di footer ---
document.getElementById("year").textContent =
  new Date().getFullYear();

// --- Link rute google maps ---
const googleMapsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=-7.044132, 112.074571";

document.getElementById("btnRouteHero").href = googleMapsUrl;
document.getElementById("btnRouteInfo").href = googleMapsUrl;

document.addEventListener("DOMContentLoaded", () => {
  const btnToTop = document.getElementById("btnToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      btnToTop.classList.add("show");
    } else {
      btnToTop.classList.remove("show");
    }
  });

  function smoothScrollToTop(duration = 800) {
  const start = window.scrollY;
  const startTime = performance.now();

  function scrollStep(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeInOutQuad = progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress;

    window.scrollTo(0, start * (1 - easeInOutQuad));

    if (progress < 1) {
      requestAnimationFrame(scrollStep);
    }
  }

  requestAnimationFrame(scrollStep);
}

btnToTop.addEventListener("click", () => {
  smoothScrollToTop(1000); // scroll 1 detik
});

});

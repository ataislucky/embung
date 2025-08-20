// ============================
// BTN TO TOP
// ============================
const btnToTop = document.getElementById("btnToTop");
if (btnToTop) {
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
}

// ============================
// SET YEAR FOOTER
// ============================
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ============================
// GOOGLE MAPS ROUTE BUTTONS
// ============================
const mapsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=-7.043350649199297,112.07425779150154";

const btnRouteHero = document.getElementById("btnRouteHero");
if (btnRouteHero) btnRouteHero.href = mapsUrl;

const btnRouteInfo = document.getElementById("btnRouteInfo");
if (btnRouteInfo) btnRouteInfo.href = mapsUrl;

// ============================
// LEAFLET MAP
// ============================
const mapContainer = document.getElementById("map");
if (mapContainer) {
  const map = L.map("map").setView([-7.043350649199297, 112.07425779150154], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OSM</a>',
  }).addTo(map);

  L.marker([-7.043350649199297, 112.07425779150154])
    .addTo(map)
    .bindPopup("<b>Embung Popoan</b><br>Wisata Desa Kepohagung")
    .openPopup();
}

// ============================
// GALLERY SCROLL
// ============================
const galleryViewport = document.getElementById("galleryViewport");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
let autoScroll;

if (galleryViewport && btnPrev && btnNext) {
  const scrollStep = 270;

  function startAutoScroll() {
    stopAutoScroll();
    autoScroll = setInterval(() => {
      galleryViewport.scrollBy({ left: scrollStep, behavior: "smooth" });
      if (
        galleryViewport.scrollLeft + galleryViewport.clientWidth >=
        galleryViewport.scrollWidth - 1
      ) {
        galleryViewport.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 3000);
  }

  function stopAutoScroll() {
    if (autoScroll) clearInterval(autoScroll);
  }

  btnNext.addEventListener("click", () => {
    stopAutoScroll();
    galleryViewport.scrollBy({ left: scrollStep, behavior: "smooth" });
    startAutoScroll();
  });

  btnPrev.addEventListener("click", () => {
    stopAutoScroll();
    galleryViewport.scrollBy({ left: -scrollStep, behavior: "smooth" });
    startAutoScroll();
  });

  startAutoScroll();
}

// ============================
// LIGHTBOX GALERI
// ============================
const lightbox = document.getElementById("lightbox");
if (lightbox) {
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = lightbox.querySelector(".lightbox-close");
  const lightboxPrev = lightbox.querySelector(".lightbox-prev");
  const lightboxNext = lightbox.querySelector(".lightbox-next");
  const galleryItems = document.querySelectorAll(".gallery-item");

  let currentIndex = 0;

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      lightbox.classList.add("active");
      lightboxImg.src = item.dataset.src;
      currentIndex = index;
    });
  });

  function showImage(index) {
    if (index < 0) index = galleryItems.length - 1;
    else if (index >= galleryItems.length) index = 0;
    lightboxImg.src = galleryItems[index].dataset.src;
    currentIndex = index;
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      showImage(currentIndex - 1);
    });
  }
  if (lightboxNext) {
    lightboxNext.addEventListener("click", (e) => {
      e.stopPropagation();
      showImage(currentIndex + 1);
    });
  }
  if (lightboxClose) {
    lightboxClose.addEventListener("click", (e) => {
      e.stopPropagation();
      lightbox.classList.remove("active");
    });
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });
}

// ============================
// LIGHTBOX DENAH
// ============================
const infoMapBox = document.querySelector(".info-map");
const lightboxDenah = document.getElementById("lightbox-denah");
if (infoMapBox && lightboxDenah) {
  const lightboxDenahImg = document.getElementById("lightbox-denah-img");
  const lightboxDenahClose = lightboxDenah.querySelector(".lightbox-close");

  infoMapBox.addEventListener("click", () => {
    lightboxDenah.classList.add("active");
    lightboxDenahImg.src = "images/denah_popoan.png";
  });

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
}

// ============================
// HAMBURGER MENU TOGGLE
// ============================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    console.log("Hamburger clicked -> toggle menu");
  });
}

// ============================
// SWITCH THEME TOGGLE
// ============================
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("light");

    // ganti ikon 🌙 / ☀️
    if (document.documentElement.classList.contains("light")) {
      themeToggle.textContent = "☀️";
      localStorage.setItem("theme", "light");
    } else {
      themeToggle.textContent = "🌙";
      localStorage.setItem("theme", "dark");
    }
  });

  // load preference dari localStorage
  if (localStorage.getItem("theme") === "light") {
    document.documentElement.classList.add("light");
    themeToggle.textContent = "☀️";
  }
}

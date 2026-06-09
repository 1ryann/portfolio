const systems = [
  {
    name: "Portal da Transparencia",
    shots: [
      { type: "Legislacao", image: "1.png" },
      { type: "Legislacoes Federais", image: "12.png" },
      { type: "Legislacoes Pessoais", image: "13.png" },
    ],
  },
  {
    name: "SOPH Portaria Digital",
    shots: [
      { type: "Login", image: "assets/sanitized/2.png" },
      { type: "Menu operacional", image: "assets/sanitized/3.png" },
      { type: "Visitantes e portaria", image: "assets/sanitized/4.png" },
      { type: "Relatorios", image: "assets/sanitized/5.png" },
      { type: "Usuarios", image: "assets/sanitized/6.png" },
    ],
  },
  {
    name: "SOPH Central de Suporte",
    shots: [
      { type: "Painel", image: "assets/sanitized/7.png" },
      { type: "Fila de chamados", image: "assets/sanitized/8.png" },
      { type: "Abertura de chamado", image: "assets/sanitized/9.png" },
      { type: "Gestao de usuarios", image: "assets/sanitized/10.png" },
      { type: "Configuracoes do usuario", image: "assets/sanitized/11.png" },
    ],
  },
];

let activeSystem = 0;

const tabs = document.querySelector("#system-tabs");
const carousel = document.querySelector("#carousel");
const arrowButtons = document.querySelectorAll(".edge-arrow");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxTitle = document.querySelector("#lightbox-title");
const closeButton = document.querySelector(".close-button");

function renderTabs() {
  tabs.innerHTML = systems
    .map(
      (system, index) => `
        <button class="system-tab ${index === activeSystem ? "active" : ""}" type="button" data-system="${index}">
          ${system.name}
        </button>
      `
    )
    .join("");
}

function renderCarousel() {
  const system = systems[activeSystem];

  carousel.innerHTML = system.shots
    .map(
      (shot, index) => `
        <article class="project-card">
          <button type="button" data-shot="${index}" aria-label="Abrir ${system.name}, ${shot.type}">
            <div class="frame">
              <img src="${shot.image}" alt="${system.name} - ${shot.type}" loading="${index < 3 ? "eager" : "lazy"}">
            </div>
          </button>
        </article>
      `
    )
    .join("");

  carousel.scrollTo({ left: 0, behavior: "instant" });
}

tabs.addEventListener("click", (event) => {
  const trigger = event.target.closest("button[data-system]");

  if (!trigger) return;

  activeSystem = Number(trigger.dataset.system);
  renderTabs();
  renderCarousel();
});

arrowButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.direction === "next" ? 1 : -1;

    carousel.scrollBy({
      left: direction * Math.round(carousel.clientWidth * 0.86),
      behavior: "smooth",
    });
  });
});

carousel.addEventListener("click", (event) => {
  const trigger = event.target.closest("button[data-shot]");

  if (!trigger) return;

  const system = systems[activeSystem];
  const shot = system.shots[Number(trigger.dataset.shot)];

  lightboxImage.src = shot.image;
  lightboxImage.alt = `${system.name} - ${shot.type}`;
  lightboxTitle.textContent = `${system.name} / ${shot.type}`;
  lightbox.showModal();
});

closeButton.addEventListener("click", () => lightbox.close());

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

renderTabs();
renderCarousel();

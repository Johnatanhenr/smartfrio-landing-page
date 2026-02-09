// --- Carrossel de Banners (Hero Section) ---
const carouselInner = document.querySelector('.carousel-inner');
const carouselSlides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
let currentBannerIndex = 0;
const bannerIntervalTime = 5000; // 5 segundos para cada slide

function updateBannerCarousel() {
    carouselInner.style.transform = `translateX(${-currentBannerIndex * 100 / carouselSlides.length}%)`;

    // Atualiza os indicadores
    indicators.forEach((indicator, index) => {
        if (index === currentBannerIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function moveCarousel(step) {
    currentBannerIndex += step;
    if (currentBannerIndex >= carouselSlides.length) {
        currentBannerIndex = 0;
    } else if (currentBannerIndex < 0) {
        currentBannerIndex = carouselSlides.length - 1;
    }
    updateBannerCarousel();
}

function currentSlide(n) {
    currentBannerIndex = n - 1; // n é baseado em 1, index é baseado em 0
    updateBannerCarousel();
}

// Rotação automática dos banners
let bannerAutoRotate = setInterval(() => {
    moveCarousel(1);
}, bannerIntervalTime);

// Reinicia o timer ao interagir com as setas ou indicadores
function resetBannerAutoRotate() {
    clearInterval(bannerAutoRotate);
    bannerAutoRotate = setInterval(() => {
        moveCarousel(1);
    }, bannerIntervalTime);
}

// Adiciona event listeners para resetar o timer ao clicar nas setas ou indicadores
document.querySelectorAll('.carousel-control').forEach(control => {
    control.addEventListener('click', resetBannerAutoRotate);
});
document.querySelectorAll('.indicator').forEach(indicator => {
    indicator.addEventListener('click', resetBannerAutoRotate);
});

// Inicializa o carrossel de banners
updateBannerCarousel();

// --- Função para Enviar Formulário para o WhatsApp ---
function enviarParaWhatsApp() {
  const form = document.getElementById("orcamento-form");

  const nome = form.nome.value;
  const email = form.email.value;
  const telefone = form.telefone.value;
  const servico = form.servico.value;
  const mensagem = form.mensagem.value;

  const texto = 
    `Olá! Gostaria de solicitar um orçamento.%0A%0A` +
    `Nome: ${nome}%0A` +
    `E-mail: ${email}%0A` +
    `Telefone: ${telefone}%0A` +
    `Serviço: ${servico}%0A%0A` +
    `Mensagem: ${mensagem}`;

  const numeroWhatsApp = "5511981077551"; // <-- WhatsApp da empresa (com DDI)

  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

  window.open(url, "_blank");

  return false; // impede reload da página
}
// Adiciona a função ao escopo global
window.enviarParaWhatsApp = enviarParaWhatsApp;
const banner = document.querySelector('.banner');
const video = document.querySelector('.bgVideo');
const content = document.querySelector('.banner-content');

let latestScroll = 0;
let ticking = false;
let currentVideoOffset = 0;

function onScroll() {
    latestScroll = window.scrollY;
    if (!ticking) {
        requestAnimationFrame(updateEffects);
        ticking = true;
    }
}

function updateEffects() {
    if (!content || window.innerWidth < 768) {
        ticking = false;
        return;
    }

    const bannerTop = banner.offsetTop;
    const bannerHeight = banner.offsetHeight;
    const scroll = latestScroll - bannerTop;

    if (scroll >= 0 && scroll <= bannerHeight) {
        const progress = scroll / bannerHeight;

        /* 🎥 PARALLAX DO VÍDEO */
        const targetVideoOffset = scroll * 0.3;
        currentVideoOffset += (targetVideoOffset - currentVideoOffset) * 0.08;
        video.style.transform = `translateY(${currentVideoOffset}px)`;

        /* 📦 CONTEÚDO DO BANNER */
        const scale = 1 - progress * 0.2;
        const opacity = 1 - progress * 1.2;

        content.style.transform = `scale(${scale})`;
        content.style.opacity = opacity;
    }

    ticking = false;
}

window.addEventListener('scroll', onScroll);
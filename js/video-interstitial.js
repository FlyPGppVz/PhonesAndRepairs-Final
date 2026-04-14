/**
 * ARCHIVO: js/video-interstitial.js
 * PROPÓSITO: Sistema Intersticial Cinemático estilo Cupertino (V2 - High Hijack).
 * ¿Qué hace?: Intercepta la navegación incluso con inline event handlers, reproduce video y redirige.
 */

document.addEventListener('DOMContentLoaded', () => {
    const interstitialSystem = {
        overlay: null,
        video: null,
        targetUrl: '',

        init() {
            console.log("Interstitial System Initialized");
            this.createOverlay();
            this.hijackProductCards();
            this.attachGlobalListener();
        },

        createOverlay() {
            const overlay = document.createElement('div');
            overlay.id = 'interstitial-overlay';
            // Estilos críticos inyectados por JS para asegurar visibilidad
            overlay.style.cssText = `
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #000;
                z-index: 2147483647;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                opacity: 0;
                transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
            `;
            
            overlay.innerHTML = `
                <video id="interstitial-video" muted playsinline preload="auto" style="width: 100%; height: 100%; object-fit: cover; transform: scale(1.1); transition: transform 1.4s cubic-bezier(0.4, 0, 0.2, 1);">
                    <source src="" type="video/mp4">
                </video>
            `;
            
            document.body.appendChild(overlay);
            this.overlay = overlay;
            this.video = overlay.querySelector('video');

            this.video.onended = () => this.handleVideoEnd();
        },

        hijackProductCards() {
            // Buscamos todas las cards que tengan video y neutralizamos su click original
            const cards = document.querySelectorAll('[data-video-intro]');
            console.log("Found " + cards.length + " cards to hijack");
            
            cards.forEach(card => {
                const originalOnclick = card.getAttribute('onclick');
                if (originalOnclick) {
                    const match = originalOnclick.match(/'([^']+)'/);
                    if (match) {
                        card.setAttribute('data-target-url', match[1]);
                        card.removeAttribute('onclick');
                    }
                }
            });
        },

        attachGlobalListener() {
            document.addEventListener('click', (e) => {
                const productCard = e.target.closest('[data-video-intro]');
                if (!productCard) return;

                const videoSrc = productCard.getAttribute('data-video-intro');
                const targetUrl = productCard.getAttribute('data-target-url') || productCard.getAttribute('href');

                if (videoSrc && targetUrl) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    this.playInterstitial(videoSrc, targetUrl);
                }
            }, true);
        },

        playInterstitial(src, url) {
            console.log("Playing interstitial cinematic for:", url);
            this.targetUrl = url;
            this.video.src = src;
            this.video.load();
            
            this.overlay.style.display = 'flex';
            
            // Force reflow
            void this.overlay.offsetWidth;
            
            this.overlay.style.opacity = '1';
            this.overlay.classList.add('active'); // Para el CSS si existe
            this.video.style.transform = 'scale(1)';
            
            const playPromise = this.video.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    console.warn("Autoplay block or video error:", err);
                    window.location.href = url;
                });
            }
        },

        handleVideoEnd() {
            console.log("Video ended, redirecting...");
            this.overlay.style.opacity = '0';
            setTimeout(() => {
                window.location.href = this.targetUrl;
            }, 600);
        }
    };

    interstitialSystem.init();
});

/**
 * ARCHIVO: js/video-interstitial.js
 * PROPÓSITO: Sistema de Video Modal estilo Cupertino (V6 - Quirúrgico y Seguro).
 * ¿Qué hace?: Intercepta SOLO los productos marcados, sin afectar botones flotantes u otros elementos.
 */

document.addEventListener('DOMContentLoaded', () => {
    const interstitialSystem = {
        overlay: null,
        modal: null,
        video: null,
        closeBtn: null,
        targetUrl: '',

        init() {
            this.createOverlay();
            this.setupListeners();
        },

        createOverlay() {
            // Fondo oscuro (oculto por defecto)
            const overlay = document.createElement('div');
            overlay.id = 'interstitial-overlay';
            overlay.style.cssText = `
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                z-index: 2147483647;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.4s ease;
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                pointer-events: none;
            `;

            const modal = document.createElement('div');
            // Tamaño controlado: Máximo 800px de ancho y proporcional 16:9
            modal.style.cssText = `
                position: relative;
                width: 85%;
                max-width: 800px;
                aspect-ratio: 16 / 9;
                background: #000;
                border-radius: 24px;
                overflow: hidden;
                box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.9);
                transform: scale(0.95);
                transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease;
                border: 1px solid rgba(255, 255, 255, 0.2);
            `;

            modal.innerHTML = `
                <video id="interstitial-video" muted playsinline preload="auto" style="width: 100%; height: 100%; object-fit: cover;">
                    <source src="" type="video/mp4">
                </video>
                <button id="interstitial-close" style="
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    width: 38px;
                    height: 38px;
                    background: rgba(0, 0, 0, 0.6);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    color: #fff;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    backdrop-filter: blur(8px);
                    z-index: 10;
                ">
                    <span class="material-symbols-outlined" style="font-size: 20px;">close</span>
                </button>
            `;

            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            this.overlay = overlay;
            this.modal = modal;
            this.video = overlay.querySelector('video');
            this.closeBtn = overlay.querySelector('#interstitial-close');

            this.closeBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeInterstitial();
            };

            this.video.onended = () => this.handleVideoEnd();
            
            this.overlay.onclick = (e) => {
                if (e.target === this.overlay) this.closeInterstitial();
            };
        },

        setupListeners() {
            // Enfoque quirúrgico: Solo atacar a los elementos con data-video-intro explicitamente
            const cards = document.querySelectorAll('[data-video-intro]');
            
            cards.forEach(card => {
                // Capturar el click de forma directa en el elemento
                card.addEventListener('click', (e) => {
                    const videoSrc = card.getAttribute('data-video-intro');
                    const originalUrl = card.getAttribute('onclick')?.match(/'([^']+)'/)?.[1] || 
                                      card.getAttribute('href');

                    if (videoSrc && originalUrl) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.playInterstitial(videoSrc, originalUrl);
                    }
                }, true); // Usar fase de captura solo para este elemento
            });
        },

        playInterstitial(src, url) {
            this.targetUrl = url;
            this.video.src = src;
            this.video.load();
            
            this.overlay.style.display = 'flex';
            this.overlay.style.pointerEvents = 'auto'; // Habilitar clics en el modal
            void this.overlay.offsetWidth;
            
            this.overlay.style.opacity = '1';
            this.modal.style.transform = 'scale(1)';
            this.modal.style.opacity = '1';
            
            this.video.play().catch(err => {
                console.warn("Video play failed, bypassing", err);
                window.location.href = url;
            });
        },

        closeInterstitial() {
            this.overlay.style.opacity = '0';
            this.modal.style.transform = 'scale(0.95)';
            this.overlay.style.pointerEvents = 'none'; // Deshabilitar inmediatamente
            setTimeout(() => {
                this.overlay.style.display = 'none';
                this.video.pause();
                this.video.currentTime = 0;
            }, 400);
        },

        handleVideoEnd() {
            // Fundido sólido a negro antes de irse
            this.overlay.style.background = '#000';
            this.overlay.style.backdropFilter = 'none';
            this.modal.style.opacity = '0';
            this.modal.style.transform = 'scale(1.02)';
            
            setTimeout(() => {
                window.location.href = this.targetUrl;
            }, 300);
        }
    };

    interstitialSystem.init();
});

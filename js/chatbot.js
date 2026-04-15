/**
 * # ARCHIVO: js/chatbot.js
 * # PROPÓSITO: Define y ejecuta el widget de chatbot integrado en PhonesAndRepairs.
 * # ANÁLISIS DE CAPAS (Z-INDEX): Se utiliza el z-index máximo "z-[2147483647]" en el 
 *   contenedor y en el botón flotante. Esto fuerza que la jerarquía visual del chatbot 
 *   sea superior a la de los botones nativos o inyectados como los de WhatsApp.
 */

// # CONSTANTES GLOBALES
// ¿Qué hace?: Define constantes utilizadas en todo el script en lugar de textos mágicos ("magic strings").
// ¿Para qué sirve?: Facilita el mantenimiento (Clean code) y asegura que los valores sean siempre consistentes.
const STORAGE_KEY = 'cr_chat_history';
const MAX_Z_INDEX = 'z-[60000]';
const OPEN_Z_INDEX = 'z-[60010]';

// # CLASE PRINCIPAL
// ¿Qué hace?: Modela los datos, el estado visual y la lógica del widget.
// ¿Para qué sirve?: Encapsula toda la lógica de chat sin contaminar el entorno global de JavaScript.
class ChatbotWidget {

    // # CONSTRUCTOR
    // ¿Qué hace?: Función que se llama al instanciar la clase mediante `new`. 
    // ¿Para qué sirve?: Declara los valores por defecto del chatbot y desencadena la inicialización.
    constructor() {
        this.isOpen = false;        // Booleano para el estado de visibilidad del modal de chat
        this.container = null;      // Referencia en el DOM al wrapper contenedor (#cr-chatbot-container)
        this.chatWindow = null;     // Referencia en el DOM a la ventana gráfica del chat 
        this.toggleBtn = null;      // Referencia en el DOM al botón circular C&R 
        this.messageContainer = null; // Referencia en el DOM donde van los globos de charla
        this.inputField = null;     // Referencia al textarea donde se escribe
        this.toggleIcon = null;     // Referencia al icono del botón toggle
        this.sendBtn = null;        // Referencia al botón de enviar msj
        this.closeBtn = null;       // Referencia al botón cerrar de la cabecera
        this.messages = this.loadHistory(); // Cache local en RAM de los mensajes mostrados

        this.init(); // Arranca el ciclo de vida del componente
    }

    // # MÉTODOS DE DATOS (DATA LAYER)

    // ¿Qué hace?: Carga la secuencia de mensajes recuperando la cadena del localStorage.
    // ¿Para qué sirve?: Para que el usuario no pierda el contexto del chat si cambia de página o refresca.
    loadHistory() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        return [
            { sender: 'bot', text: 'Hello! How can I help you today?', time: new Date().toISOString() }
        ];
    }

    // ¿Qué hace?: Convierte el arreglo local `this.messages` en String para guardarlo.
    // ¿Para qué sirve?: Persistir la conversación después de un nuevo chat insertado en pantalla.
    saveHistory() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.messages));
    }

    // # MÉTODOS DE INICIALIZACIÓN

    // ¿Qué hace?: Orquesta la construcción procedural del chatbot.
    // ¿Para qué sirve?: Para separar el dibujado, los eventos de usuario y el procesado de datos lógicamente.
    init() {
        this.renderWidget();
        this.attachEventListeners();
        this.renderMessages();
    }

    // # MÉTODOS DE INTERFAZ GRÁFICA (UI)

    // ¿Qué hace?: Inyecta código HTML seguro para armar la ventana interactiva del bot.
    // ¿Para qué sirve?: Evita modificar el HTML directamente en cada página, siendo un componente modular al 100%.
    renderWidget() {
        // Contenedor principal: z-index maximizado sobre WhatsApp
        this.container = document.createElement('div');
        this.container.id = 'cr-chatbot-container';
        this.container.classList.add('fixed', 'bottom-6', 'left-6', 'z-[60000]', 'font-sans', 'flex', 'flex-col', 'items-start', 'pointer-events-none');

        // Ventana del Chat
        this.chatWindow = document.createElement('div');
        this.chatWindow.classList.add(
            // Clean Code: se estructura el Tailwind por categoría en la misma línea visual a modo de componentes.
            'bg-surface-container-lowest', 'rounded-2xl', 'shadow-2xl', 'w-[350px]', 'h-[500px]', 'mb-4',
            'flex', 'flex-col', 'overflow-hidden', 'transition-all', 'duration-300', 'origin-bottom-left', 'border', 'border-slate-200', 'dark:border-slate-800'
        );

        // Estado por defecto invisible y encogido
        this.chatWindow.style.opacity = '0';
        this.chatWindow.style.transform = 'scale(0.8)';
        this.chatWindow.style.pointerEvents = 'none';

        // Estructura header
        const header = document.createElement('div');
        header.classList.add('bg-primary', 'text-on-primary', 'p-4', 'flex', 'justify-between', 'items-center', 'shadow-sm');
        header.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span class="material-symbols-outlined text-sm">support_agent</span>
                </div>
                <div>
                    <h3 class="font-bold text-sm leading-tight">C&R Support</h3>
                    <p class="text-[0.65rem] opacity-80">Always active</p>
                </div>
            </div>
            <button id="chatbot-close-btn" class="hover:bg-white/20 p-1.5 rounded-full transition-colors flex items-center justify-center">
                <span class="material-symbols-outlined text-lg">close</span>
            </button>
        `;

        // Área scroll container para leer historial
        this.messageContainer = document.createElement('div');
        this.messageContainer.classList.add('flex-1', 'p-4', 'overflow-y-auto', 'bg-surface-container-low', 'flex', 'flex-col', 'gap-3');
        this.messageContainer.id = 'chatbot-messages';

        // Pie o zona de tipeo
        const inputArea = document.createElement('div');
        inputArea.classList.add('p-3', 'bg-surface-container-lowest', 'border-t', 'border-outline-variant/30', 'flex', 'items-end', 'gap-2');
        inputArea.innerHTML = `
            <textarea id="chatbot-input" rows="1" placeholder="Type a message..." class="flex-1 bg-surface-container-low border-none rounded-2xl py-2 px-4 text-sm focus:ring-1 focus:ring-primary outline-none resize-none min-h-[40px] max-h-[100px] overflow-hidden"></textarea>
            <button id="chatbot-send-btn" class="bg-primary text-on-primary w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20 shrink-0">
                <span class="material-symbols-outlined text-sm">send</span>
            </button>
        `;

        // Ensamblado
        this.chatWindow.appendChild(header);
        this.chatWindow.appendChild(this.messageContainer);
        this.chatWindow.appendChild(inputArea);

        // Botón toggle de apertura con Z-Index maximizado sobre elementos como el botón WhatsApp.
        this.toggleBtn = document.createElement('button');
        this.toggleBtn.classList.add(
            'w-11', 'h-11', 'rounded-full', 'bg-primary', 'text-on-primary', 'shadow-xl', 'shadow-primary/30',
            'flex', 'items-center', 'justify-center', 'hover:scale-105', 'active:scale-95', 'transition-all', 'pointer-events-auto'
        );
        this.toggleBtn.innerHTML = `
            <span class="material-symbols-outlined text-[22px] transition-transform duration-300" id="chatbot-toggle-icon">chat</span>
        `;

        // Inserción en el árbol maestro DOM
        this.container.appendChild(this.chatWindow);
        this.container.appendChild(this.toggleBtn);
        document.body.appendChild(this.container);

        // Caching optimizado (Clean Code) 
        // Previamente extraías con getElementById desde múltiples métodos de eventos, lo cual resultaba ineficiente en rendimiento.
        // Ahora todo vive cacheado a nivel de clase una vez se renderiza el widget:
        this.inputField = document.getElementById('chatbot-input');
        this.toggleIcon = document.getElementById('chatbot-toggle-icon');
        this.sendBtn = document.getElementById('chatbot-send-btn');
        this.closeBtn = document.getElementById('chatbot-close-btn');
    }

    // # MÉTODOS DE EVENTOS

    // ¿Qué hace?: Escucha interacciones en los elementos pre-cacheados (botones y teclado).
    // ¿Para qué sirve?: Dar vida al HTML, de forma que los clics desencadenen comportamientos.
    attachEventListeners() {
        this.toggleBtn.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.toggleChat());
        this.sendBtn.addEventListener('click', () => this.handleSend());

        this.inputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSend();
            }
        });

        // Clean Code: Retenemos el target limpio mediante el evento "e" en vez de depender de la mutabilidad de "this" no vinculada fuertemente.
        this.inputField.addEventListener('input', (e) => {
            e.target.style.height = '40px';
            e.target.style.height = (e.target.scrollHeight) + 'px';
        });
    }

    // # MÉTODOS DE LÓGICA DE INTERFAZ (TOGGLES Y RENDERIZADOS SECUNDARIOS)

    // ¿Qué hace?: Alterna el switch `isOpen` y lanza animaciones para abrir o cerrar.
    // ¿Para qué sirve?: Es la puerta de entrada para mostrar (activar Pointer Events) u ocultar la ventana y el historial.
    toggleChat() {
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            this.container.classList.remove(MAX_Z_INDEX);
            this.container.classList.add(OPEN_Z_INDEX);
            this.chatWindow.style.opacity = '1';
            this.chatWindow.style.transform = 'scale(1)';
            this.chatWindow.style.pointerEvents = 'auto'; // Permitir clicks internos al abrir
            this.toggleIcon.style.transform = 'rotate(90deg)';
            setTimeout(() => { this.toggleIcon.textContent = 'close'; }, 150);

            this.scrollToBottom();
            setTimeout(() => this.inputField.focus(), 300);
        } else {
            this.container.classList.remove(OPEN_Z_INDEX);
            this.container.classList.add(MAX_Z_INDEX);
            this.chatWindow.style.opacity = '0';
            this.chatWindow.style.transform = 'scale(0.8)';
            this.chatWindow.style.pointerEvents = 'none'; // Desactivar clicks preventivos sobre elementos traslúcidos
            this.toggleIcon.style.transform = 'rotate(0deg)';
            setTimeout(() => { this.toggleIcon.textContent = 'chat'; }, 150);
        }
    }

    // ¿Qué hace?: Limpia el area de chat y repopula todo el historial.
    // ¿Para qué sirve?: Renderizar lo que exista en LocalStorage la primera vez que se carga el JS de esta página.
    renderMessages() {
        this.messageContainer.innerHTML = '';
        this.messages.forEach(msg => {
            this.appendMessageElement(msg);
        });
        this.scrollToBottom();
    }

    // ¿Qué hace?: Ensambla un div de Tailwind individual para los globos de conversación del usuario/bot en su zona izquierda/derecha.
    // ¿Para qué sirve?: Acomodar dinámicamente un nuevo mensaje de ida o de vuelta en pantalla al emitirse.
    appendMessageElement(msg) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('flex', 'w-full');

        const bubble = document.createElement('div');
        bubble.classList.add('max-w-[80%]', 'py-2', 'px-4', 'text-sm', 'leading-relaxed', 'shadow-sm');

        if (msg.sender === 'user') {
            wrapper.classList.add('justify-end');
            bubble.classList.add('bg-primary', 'text-on-primary', 'rounded-t-2xl', 'rounded-l-2xl', 'rounded-br-sm');
        } else {
            wrapper.classList.add('justify-start');
            bubble.classList.add('bg-surface-container-lowest', 'border', 'border-outline-variant/20', 'text-on-surface', 'rounded-t-2xl', 'rounded-r-2xl', 'rounded-bl-sm');
        }

        bubble.textContent = msg.text;
        wrapper.appendChild(bubble);
        this.messageContainer.appendChild(wrapper);
    }

    // # MÉTODOS DE LÓGICA DE NEGOCIO Y BOT

    // ¿Qué hace?: Lee lo ingresado, valida que no esté vacío, lo envía al array y simula al bot.
    // ¿Para qué sirve?: Encapsular el ciclo principal humano -> máquina para no ensuciar el evento origen en teclado.
    handleSend() {
        const text = this.inputField.value.trim();
        if (!text) return; // Validación anti vacío

        const userMsg = { sender: 'user', text: text, time: new Date().toISOString() };
        this.messages.push(userMsg);
        this.appendMessageElement(userMsg);
        this.saveHistory();

        // Limpiamos los rastros y el alto forzado al enviar (Clean code preventivo visual)
        this.inputField.value = '';
        this.inputField.style.height = '40px';
        this.scrollToBottom();

        this.simulateBotResponse(text);
    }

    // ¿Qué hace?: Carga un indicador temporal estético, lee contexto mediante ifs con includes(), y devuelve la respuesta emulando latencia.
    // ¿Para qué sirve?: Para sostener el engaño inteligente de soporte virtual sin un backend externo conectado.
    simulateBotResponse(userText) {
        const typingId = 'typing-' + Date.now();
        const wrapper = document.createElement('div');
        wrapper.id = typingId;
        wrapper.classList.add('flex', 'w-full', 'justify-start');
        wrapper.innerHTML = `
            <div class="bg-surface-container-lowest border border-outline-variant/20 rounded-t-2xl rounded-r-2xl rounded-bl-sm p-3 shadow-sm flex gap-1">
                <span class="w-2 h-2 rounded-full bg-outline-variant animate-bounce" style="animation-delay: 0s;"></span>
                <span class="w-2 h-2 rounded-full bg-outline-variant animate-bounce" style="animation-delay: 0.15s;"></span>
                <span class="w-2 h-2 rounded-full bg-outline-variant animate-bounce" style="animation-delay: 0.3s;"></span>
            </div>
        `;
        this.messageContainer.appendChild(wrapper);
        this.scrollToBottom();

        // Emulamos el "Typing" del bot humano 
        setTimeout(() => {
            const typingIndicator = document.getElementById(typingId);
            if (typingIndicator) typingIndicator.remove();

            let responseText = "Thanks for your message! Our team will get back to you shortly.";
            const lower = userText.toLowerCase();

            // Clean Code Option (Optimización Posible Futura): Este mapeo de IFs puede cambiarse a un Mapa u Objeto literal externo
            // para escalar de manera natural agregando respuestas nuevas sin ensuciar la longitud del archivo local.
            if (lower.includes('repair') || lower.includes('broken')) {
                responseText = "We specialize in all types of repairs! Could you tell me more about your device and what's wrong with it?";
            } else if (lower.includes('price') || lower.includes('cost')) {
                responseText = "Prices vary depending on the model and issue. Please check our Service page or describe the device for an estimate.";
            } else if (lower.includes('hello') || lower.includes('hi')) {
                responseText = "Hi there! How can I assist you with your phone or tablet today?";
            }

            const botMsg = { sender: 'bot', text: responseText, time: new Date().toISOString() };
            this.messages.push(botMsg);
            this.appendMessageElement(botMsg);
            this.saveHistory();
            this.scrollToBottom();

        }, 1200);
    }

    // # UTILIDADES AUXILIARES

    // ¿Qué hace?: Ajusta asincrónicamente el scrollTop hasta la altura máxima scrollable total del ChatBox.
    // ¿Para qué sirve?: Auto-baja la pantalla garantizando que se aprecie el último input o respuesta del bot inmediatamente.
    scrollToBottom() {
        setTimeout(() => {
            this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
        }, 50);
    }
}

// # EJECUCIÓN PRINCIPAL (ENTRY POINT)
// ¿Qué hace?: Invoca la instanciación de la Clase una sola vez según el ciclo de vida de la etiqueta <script>.
// ¿Para qué sirve?: Evita que el Chatbot se construya antes de que el árbol Document Object Model (DOM) global esté 100% montado en el layout, previniendo null references.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ChatbotWidget());
} else {
    new ChatbotWidget();
}

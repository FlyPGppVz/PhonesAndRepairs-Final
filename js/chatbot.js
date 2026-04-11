/* 
 * CellphonesAndRepair - Persistent Chatbot Widget
 * Implements a floating chat interface with LocalStorage persistence.
 * #bot #assistant #floating-widget
 */

class ChatbotWidget {
    constructor() {
        this.STORAGE_KEY = 'cr_chat_history';
        this.isOpen = false;
        this.messages = this.loadHistory();
        this.init();
    }

    loadHistory() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        return [
            { sender: 'bot', text: 'Hello! How can I help you with your device today?', time: new Date().toISOString() }
        ];
    }

    saveHistory() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.messages));
    }

    init() {
        this.renderWidget();
        this.attachEventListeners();
        this.renderMessages();
    }

    renderWidget() {
        // Container
        this.container = document.createElement('div');
        this.container.classList.add('fixed', 'bottom-6', 'right-6', 'z-[9999]', 'font-sans', 'flex', 'flex-col', 'items-end');
        
        // Chat Window (hidden by default)
        this.chatWindow = document.createElement('div');
        this.chatWindow.classList.add(
            'bg-surface-container-lowest', 'rounded-2xl', 'shadow-2xl', 'w-[350px]', 'h-[500px]', 'mb-4',
            'flex', 'flex-col', 'overflow-hidden', 'transition-all', 'duration-300', 'origin-bottom-right', 'border', 'border-slate-200', 'dark:border-slate-800'
        );
        
        // Initial state logic
        this.chatWindow.style.opacity = '0';
        this.chatWindow.style.transform = 'scale(0.8)';
        this.chatWindow.style.pointerEvents = 'none';

        // Header
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

        // Message Area
        this.messageContainer = document.createElement('div');
        this.messageContainer.classList.add('flex-1', 'p-4', 'overflow-y-auto', 'bg-surface-container-low', 'flex', 'flex-col', 'gap-3');
        this.messageContainer.id = 'chatbot-messages';

        // Input Area
        const inputArea = document.createElement('div');
        inputArea.classList.add('p-3', 'bg-surface-container-lowest', 'border-t', 'border-outline-variant/30', 'flex', 'items-end', 'gap-2');
        inputArea.innerHTML = `
            <textarea id="chatbot-input" rows="1" placeholder="Type a message..." class="flex-1 bg-surface-container-low border-none rounded-2xl py-2 px-4 text-sm focus:ring-1 focus:ring-primary outline-none resize-none min-h-[40px] max-h-[100px] overflow-hidden"></textarea>
            <button id="chatbot-send-btn" class="bg-primary text-on-primary w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20 shrink-0">
                <span class="material-symbols-outlined text-sm">send</span>
            </button>
        `;

        this.chatWindow.appendChild(header);
        this.chatWindow.appendChild(this.messageContainer);
        this.chatWindow.appendChild(inputArea);

        // Floating Toggle Button
        this.toggleBtn = document.createElement('button');
        this.toggleBtn.classList.add(
            'w-14', 'h-14', 'rounded-full', 'bg-primary', 'text-on-primary', 'shadow-xl', 'shadow-primary/30',
            'flex', 'items-center', 'justify-center', 'hover:scale-105', 'active:scale-95', 'transition-all', 'z-[9999]'
        );
        this.toggleBtn.innerHTML = `
            <span class="material-symbols-outlined text-[28px] transition-transform duration-300" id="chatbot-toggle-icon">chat</span>
        `;

        // Append to container
        this.container.appendChild(this.chatWindow);
        this.container.appendChild(this.toggleBtn);
        
        // Append to body
        document.body.appendChild(this.container);
    }

    attachEventListeners() {
        // Toggle Open/Close
        this.toggleBtn.addEventListener('click', () => this.toggleChat());
        const closeBtn = document.getElementById('chatbot-close-btn');
        closeBtn.addEventListener('click', () => this.toggleChat());

        // Send Message Handlers
        const sendBtn = document.getElementById('chatbot-send-btn');
        this.inputField = document.getElementById('chatbot-input');

        sendBtn.addEventListener('click', () => this.handleSend());
        this.inputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSend();
            }
        });

        // Auto-resize textarea
        this.inputField.addEventListener('input', function() {
            this.style.height = '40px';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const icon = document.getElementById('chatbot-toggle-icon');

        if (this.isOpen) {
            this.chatWindow.style.opacity = '1';
            this.chatWindow.style.transform = 'scale(1)';
            this.chatWindow.style.pointerEvents = 'auto';
            icon.style.transform = 'rotate(90deg)';
            setTimeout(() => { icon.textContent = 'close'; }, 150);
            
            // Scroll to bottom when opened
            this.scrollToBottom();
            setTimeout(() => this.inputField.focus(), 300);
        } else {
            this.chatWindow.style.opacity = '0';
            this.chatWindow.style.transform = 'scale(0.8)';
            this.chatWindow.style.pointerEvents = 'none';
            icon.style.transform = 'rotate(0deg)';
            setTimeout(() => { icon.textContent = 'chat'; }, 150);
        }
    }

    renderMessages() {
        this.messageContainer.innerHTML = '';
        this.messages.forEach(msg => {
            this.appendMessageElement(msg);
        });
        this.scrollToBottom();
    }

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

    handleSend() {
        const text = this.inputField.value.trim();
        if (!text) return;

        // User Message
        const userMsg = { sender: 'user', text: text, time: new Date().toISOString() };
        this.messages.push(userMsg);
        this.appendMessageElement(userMsg);
        this.saveHistory();
        
        // Reset Input
        this.inputField.value = '';
        this.inputField.style.height = '40px';
        this.scrollToBottom();

        // Simulate Bot Typing
        this.simulateBotResponse(text);
    }

    simulateBotResponse(userText) {
        // Show typing indicator
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

        setTimeout(() => {
            // Remove typing indicator
            const typingIndicator = document.getElementById(typingId);
            if(typingIndicator) typingIndicator.remove();

            // Simple logic for response
            let responseText = "Thanks for your message! Our team will get back to you shortly.";
            const lower = userText.toLowerCase();
            
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

        }, 1200); // 1.2s delay for realism
    }

    scrollToBottom() {
        // Use a slight timeout to ensure DOM paints first
        setTimeout(() => {
            this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
        }, 50);
    }
}

// Initialize when DOM is fully loaded or immediately if already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ChatbotWidget());
} else {
    new ChatbotWidget();
}

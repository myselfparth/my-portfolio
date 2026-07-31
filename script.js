// --- Knowledge Base Customized for Prof. Parth Patel (EC & ICT Engineering) ---
const knowledgeBase = [
    {
        keywords: ["hello", "hi", "hey", "greetings"],
        response: "Hello! Welcome to Prof. Parth Patel's academic portal. How can I help you with EC or ICT engineering queries?"
    },
    {
        keywords: ["who", "parth", "patel", "faculty", "professor", "about"],
        response: "Prof. Parth Patel is a faculty member specializing in Electronics & Communication (EC) and Information & Communication Technology (ICT) Engineering."
    },
    {
        keywords: ["subject", "course", "teach", "syllabus", "ec", "ict"],
        response: "Prof. Parth Patel handles subjects related to Embedded Systems, Digital Electronics, Microcontrollers, VLSI, and Communication Networks in the EC & ICT departments."
    },
    {
        keywords: ["office", "room", "location", "cabin", "meet", "where"],
        response: "Office Location: Cabin EC-204, Department of Electronics & Communication Engineering."
    },
    {
        keywords: ["timing", "hours", "available", "time", "appointment"],
        response: "Student meeting hours are Monday to Friday, 3:00 PM to 5:00 PM (or by prior email appointment)."
    },
    {
        keywords: ["contact", "email", "phone", "reach", "message"],
        response: "You can reach Prof. Parth Patel via department email or visit Office EC-204 during student consultation hours."
    },
    {
        keywords: ["project", "lab", "research", "guidance"],
        response: "Prof. Patel guides undergraduate and diploma projects in Embedded IoT Systems, Microcontroller Applications, and VLSI circuit designs."
        
    },
    {
    keywords: ["office", "location", "cabin", "sitting"],
    response: "Prof. Patel  office is at B-101,first floor, B Building of Instiute."
    
}
];

const fallbackResponse = "I am trained to answer questions about Prof. Parth Patel's EC/ICT subjects, office hours, cabin location, and project guidance. Could you rephrase your question?";

// --- DOM Elements ---
const chatLauncher = document.getElementById("chat-launcher");
const chatWindow = document.getElementById("chat-window");
const closeChatBtn = document.getElementById("close-chat");
const clearChatBtn = document.getElementById("clear-chat");
const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const typingIndicator = document.getElementById("typing-indicator");

let messages = [];

// --- Event Listeners ---
document.addEventListener("DOMContentLoaded", initChat);
chatLauncher.addEventListener("click", toggleChat);
closeChatBtn.addEventListener("click", toggleChat);
clearChatBtn.addEventListener("click", clearHistory);
chatForm.addEventListener("submit", handleSendMessage);

function initChat() {
    const savedMessages = localStorage.getItem("parth_patel_chat");
    if (savedMessages) {
        messages = JSON.parse(savedMessages);
        renderAllMessages();
    }
}

function toggleChat() {
    chatWindow.classList.toggle("hidden");
    
    if (!chatWindow.classList.contains("hidden") && messages.length === 0) {
        addBotMessage("Welcome! I am Prof. Parth Patel's virtual assistant. Ask me about EC/ICT courses, office hours, or cabin location.");
    }
    
    if (!chatWindow.classList.contains("hidden")) {
        userInput.focus();
        scrollToBottom();
    }
}

function handleSendMessage(e) {
    e.preventDefault();
    const query = userInput.value.trim();
    if (!query) return;

    addUserMessage(query);
    userInput.value = "";

    showTyping(true);
    
    setTimeout(() => {
        showTyping(false);
        const reply = findBestResponse(query);
        addBotMessage(reply);
    }, 800);
}

function findBestResponse(input) {
    const cleanInput = input.toLowerCase();
    
    for (const entry of knowledgeBase) {
        for (const keyword of entry.keywords) {
            if (cleanInput.includes(keyword)) {
                return entry.response;
            }
        }
    }
    return fallbackResponse;
}

function addUserMessage(text) {
    const messageObj = { sender: "user", text: text, time: getCurrentTime() };
    messages.push(messageObj);
    saveMessages();
    renderSingleMessage(messageObj);
}

function addBotMessage(text) {
    const messageObj = { sender: "bot", text: text, time: getCurrentTime() };
    messages.push(messageObj);
    saveMessages();
    renderSingleMessage(messageObj);
}

function renderSingleMessage(msg) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", msg.sender);

    const isUser = msg.sender === "user";
    const avatarIcon = isUser ? "fa-user" : "fa-microchip";

    msgDiv.innerHTML = `
        <div class="msg-avatar">
            <i class="fa-solid ${avatarIcon}"></i>
        </div>
        <div class="msg-content">
            <div class="msg-bubble">${escapeHTML(msg.text)}</div>
            <span class="msg-time">${msg.time}</span>
        </div>
    `;

    chatMessages.appendChild(msgDiv);
    scrollToBottom();
}

function renderAllMessages() {
    chatMessages.innerHTML = "";
    messages.forEach(msg => renderSingleMessage(msg));
}

function showTyping(show) {
    if (show) {
        typingIndicator.classList.remove("hidden");
    } else {
        typingIndicator.classList.add("hidden");
    }
    scrollToBottom();
}

function clearHistory() {
    if (confirm("Clear all conversation history?")) {
        messages = [];
        localStorage.removeItem("parth_patel_chat");
        chatMessages.innerHTML = "";
        addBotMessage("Chat history cleared. How can I help you?");
    }
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

function saveMessages() {
    localStorage.setItem("parth_patel_chat", JSON.stringify(messages));
}

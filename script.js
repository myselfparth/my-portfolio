// Knowledge Base Customized for Prof. Parth Patel
const knowledgeBase = [
    {
        keywords: ["hello", "hi", "hey", "greetings","HI"],
        response: "Hello! Welcome to Prof. Parth Patel's portal. How can I assist you with EC or ICT engineering queries?"
    },
    {
        keywords: ["who", "parth", "patel", "faculty", "professor", "about","WHO","pdp"],
        response: "Prof. Parth Patel is a faculty member in Electronics & Communication (EC) and Information & Communication Technology (ICT) Engineering."
    },
    {
        keywords: ["subject", "course", "teach", "syllabus", "ec", "ict", "subjects", "programming"],
        response: "Prof. Patel handles Programming Subjects, Embedded Systems, Microcontrollers, Digital Electronics, Mobile Communication, Programming, and Communication Networks."
    },
    {
        keywords: ["office", "room", "location", "cabin", "where", "b-101", "b101", "b block","Where","sitting",],
        response: "Parth Patel's Office Location: Cabin B-101, B Block, Department of Electronics & Communication Engineering."
    },
    {
        keywords: ["timing", "hours", "available", "time", "appointment", "office hours"],
        response: "Student meeting hours are Monday to Friday, 3:00 PM to 5:00 PM in Cabin B-101."
    },
    {
        keywords: ["contact", "email", "phone", "reach","Phone"],
        response: "Contact Details: Phone No + 91 9106903893  | email id: gpgsecpdp@gmail.com"
    },
    {
        keywords: ["project", "lab", "guidance", "projects"],
        response: "Prof. Patel guides projects in IoT Smart Systems, Microcontroller Applications, Web Technologies, Programming and  circuit prototyping."
    }
];

const fallbackResponse = "I don't have the exact answer for that yet, but I can help with Prof. Parth Patel's office hours (Cabin B-101), subjects, or project guidance. What would you like to know?";

// DOM Elements
const chatLauncher = document.getElementById("chat-launcher");
const chatWindow = document.getElementById("chat-window");
const closeChatBtn = document.getElementById("close-chat");
const clearChatBtn = document.getElementById("clear-chat");
const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const typingIndicator = document.getElementById("typing-indicator");
const chipButtons = document.querySelectorAll(".chip");
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

let messages = [];

document.addEventListener("DOMContentLoaded", () => {
    initChat();
    setupTabSwitching();
    loadScenario(0);
});

if (chatLauncher) chatLauncher.addEventListener("click", toggleChat);
if (closeChatBtn) closeChatBtn.addEventListener("click", toggleChat);
if (clearChatBtn) clearChatBtn.addEventListener("click", clearHistory);
if (chatForm) chatForm.addEventListener("submit", handleSendMessage);

chipButtons.forEach(chip => {
    chip.addEventListener("click", () => {
        const query = chip.getAttribute("data-query");
        if (query) {
            if (chatWindow.classList.contains("hidden")) toggleChat();
            processQuery(query);
        }
    });
});

function setupTabSwitching() {
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active-content"));

            btn.classList.add("active");
            const target = btn.getAttribute("data-tab");
            const targetEl = document.getElementById(target);
            if (targetEl) targetEl.classList.add("active-content");
        });
    });
}

function initChat() {
    const savedMessages = localStorage.getItem("parth_patel_ai_chat");
    if (savedMessages) {
        messages = JSON.parse(savedMessages);
        renderAllMessages();
    }
}

function toggleChat() {
    chatWindow.classList.toggle("hidden");
    
    if (!chatWindow.classList.contains("hidden") && messages.length === 0) {
        addBotMessage("Welcome! I am Prof. Parth Patel's AI assistant. Ask me about EC/ICT courses, office hours, or Cabin B-101.");
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
    processQuery(query);
}

function processQuery(query) {
    addUserMessage(query);
    if (userInput.value) userInput.value = "";

    showTyping(true);
    
    setTimeout(() => {
        showTyping(false);
        const reply = findBestResponse(query);
        addBotMessage(reply);
    }, 600);
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
    const avatarIcon = isUser ? "fa-user" : "fa-brain";

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
    if (confirm("Clear chat history?")) {
        messages = [];
        localStorage.removeItem("parth_patel_ai_chat");
        chatMessages.innerHTML = "";
        addBotMessage("Chat history cleared. How can I assist you?");
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
    localStorage.setItem("parth_patel_ai_chat", JSON.stringify(messages));
}

// --- Simulator Logic ---
const scenarios = [
    {
        title: "Lab Modernization Strategy",
        desc: "The department requires an upgrade in hardware for Embedded Systems and Wireless Networks. How do you allocate the annual capital grant?",
        choices: [
            {
                text: "Procure industrial-grade ARM/FPGA development kits and high-speed DSO oscilloscopes.",
                impact: { quality: 15, accreditation: 10, innovation: 20 },
                feedback: "Excellent decision! Hands-on hardware capability and audit metrics rise."
            },
            {
                text: "Focus solely on software tools and virtual simulation platforms.",
                impact: { quality: 5, accreditation: 15, innovation: 0 },
                feedback: "Cost-effective and documentation-friendly, but limits physical lab exposure."
            }
        ]
    },
    {
        title: "Accreditation Audit Preparation",
        desc: "An upcoming external peer-team review requires comprehensive mapping of Course Outcomes (CO) and Program Outcomes (PO).",
        choices: [
            {
                text: "Automate CO-PO attainment calculations via custom digital dashboards.",
                impact: { quality: 10, accreditation: 25, innovation: 15 },
                feedback: "Technocratic efficiency! Audit prep time cut by 60% with total precision."
            },
            {
                text: "Delegate manual logging across all laboratory faculty members.",
                impact: { quality: -5, accreditation: 10, innovation: -10 },
                feedback: "Documentation completed, but faculty burnout reduces focus on instruction."
            }
        ]
    }
];

let currentScenarioIndex = 0;
let simScores = { quality: 70, accreditation: 65, innovation: 60 };

function loadScenario(index) {
    const scNumber = document.getElementById("scenario-number");
    if (!scNumber) return;

    if (index >= scenarios.length) {
        showFinalRating();
        return;
    }

    const scenario = scenarios[index];
    scNumber.innerText = `Decision ${index + 1} of ${scenarios.length}`;
    document.getElementById("scenario-title").innerText = scenario.title;
    document.getElementById("scenario-desc").innerText = scenario.desc;

    const choicesContainer = document.getElementById("choices-container");
    choicesContainer.innerHTML = "";

    scenario.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.innerHTML = `<span>${choice.text}</span> <i class="fa-solid fa-chevron-right"></i>`;
        btn.onclick = () => selectChoice(choice);
        choicesContainer.appendChild(btn);
    });
}

function selectChoice(choice) {
    simScores.quality = Math.min(100, Math.max(0, simScores.quality + choice.impact.quality));
    simScores.accreditation = Math.min(100, Math.max(0, simScores.accreditation + choice.impact.accreditation));
    simScores.innovation = Math.min(100, Math.max(0, simScores.innovation + choice.impact.innovation));

    updateSimUI();

    const feedbackBox = document.getElementById("sim-feedback");
    feedbackBox.innerText = choice.feedback;
    feedbackBox.classList.remove("hidden");

    currentScenarioIndex++;
    setTimeout(() => {
        feedbackBox.classList.add("hidden");
        loadScenario(currentScenarioIndex);
    }, 2000);
}

function updateSimUI() {
    const qEl = document.getElementById("metric-quality");
    if (!qEl) return;

    qEl.style.width = `${simScores.quality}%`;
    document.getElementById("score-quality").innerText = `${simScores.quality}%`;

    document.getElementById("metric-accreditation").style.width = `${simScores.accreditation}%`;
    document.getElementById("score-accreditation").innerText = `${simScores.accreditation}%`;

    document.getElementById("metric-innovation").style.width = `${simScores.innovation}%`;
    document.getElementById("score-innovation").innerText = `${simScores.innovation}%`;
}

function showFinalRating() {
    const avgScore = Math.round((simScores.quality + simScores.accreditation + simScores.innovation) / 3);
    document.getElementById("scenario-box").innerHTML = `
        <div style="text-align: center; padding: 1rem;">
            <i class="fa-solid fa-trophy" style="font-size: 2.5rem; color: var(--accent-color); margin-bottom: 1rem;"></i>
            <h3>Simulation Complete</h3>
            <p class="scenario-text">Academic Efficiency Score: <strong>${avgScore}%</strong></p>
        </div>
    `;
}

function resetSimulator() {
    currentScenarioIndex = 0;
    simScores = { quality: 70, accreditation: 65, innovation: 60 };
    updateSimUI();
    const fb = document.getElementById("sim-feedback");
    if (fb) fb.classList.add("hidden");
    loadScenario(0);
}
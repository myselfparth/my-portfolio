// Chat Elements
const chatToggle = document.getElementById("chat-toggle");
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chat-messages");

// Open / Close Chat
chatToggle.addEventListener("click", () => {
    chatBox.style.display =
        chatBox.style.display === "flex" ? "none" : "flex";
});

// Send Button
sendBtn.addEventListener("click", sendMessage);

// Enter Key
userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {

    const message = userInput.value.trim();

    if (message === "") return;

    // Show User Message
    chatMessages.innerHTML += `
        <div style="text-align:right;margin:10px;">
            <span style="background:#38bdf8;color:#000;padding:10px;border-radius:10px;display:inline-block;">
                ${message}
            </span>
        </div>
    `;

    userInput.value = "";

    try {

        const response = await fetch("https://parth-ai-boat.gpgsecpdp.workers.dev", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        chatMessages.innerHTML += `
            <div class="bot">
                ${data.reply}
            </div>
        `;

    } catch (error) {

        chatMessages.innerHTML += `
            <div class="bot">
                ❌ Unable to connect to AI.
            </div>
        `;

    }

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

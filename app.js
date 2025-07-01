// Chat open/close toggle
const chatToggle = document.getElementById("chat-toggle");
const chatbox = document.getElementById("chatbox");
const closeChat = document.getElementById("close-chat");

chatToggle.addEventListener("click", () => {
  chatbox.style.display = "flex";
  chatToggle.style.display = "none";
});

closeChat.addEventListener("click", () => {
  chatbox.style.display = "none";
  chatToggle.style.display = "block";
});

// Chat sending logic
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const messages = document.getElementById("messages");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMsg = input.value;
  appendMessage("You", userMsg);
  input.value = "";

  const response = await fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMsg }),
  });

  const data = await response.json();
  appendMessage("Rikyz", data.reply);
});

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("chat-bubble");
  msg.classList.add(sender === "You" ? "user" : "bot");

  const bubble = document.createElement("div");
  bubble.classList.add("bubble-text");
  bubble.innerText = text;

  const label = document.createElement("div");
  label.classList.add("sender-label");
  label.innerText = sender === "You" ? "You" : "Rikyz (AI Bot)";

  msg.appendChild(bubble);
  msg.appendChild(label);
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}



const ws = new WebSocket("ws://localhost:8080");
const messagesList = document.getElementById("messages");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

// Listen for messages from server
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  addMessageToUI(message.text, message.type);
};

// Send message to server
sendBtn.addEventListener("click", () => {
  const messageText = messageInput.value;
  if (messageText.trim()) {
    ws.send(JSON.stringify({ text: messageText, type: "sent" }));
    addMessageToUI(messageText, "sent");
    messageInput.value = "";
  }
});

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendBtn.click();
  }
});

// Function to add message to UI
function addMessageToUI(text, type) {
  const messageElement = document.createElement("li");
  messageElement.textContent = text;
  messageElement.classList.add("message", type);
  messagesList.appendChild(messageElement);
  messagesList.scrollTop = messagesList.scrollHeight;
}

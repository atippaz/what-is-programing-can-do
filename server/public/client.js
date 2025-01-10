const socket = io();

function sendMessage() {
  const messageInput = document.getElementById("message");
  const message = messageInput.value;

  socket.emit("message", message);
  messageInput.value = "";
}

socket.on("reply", (data) => {
  const output = document.getElementById("output");
  const div = document.createElement("div");
  div.textContent = data;
  output.appendChild(div);
});

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {
  readJSONFile,
  addNewItem,
  updateItem,
  deleteItem,
} from "./jsonManager.js";
import http from "http";
import { Server } from "socket.io";

const app = express();
const port = 3000;

app.use(express.static("public"));

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.emit("reply", `hi user : ${socket.id}`);

  socket.on("message", (data) => {
    console.log("Message received:", data);
    socket.emit("reply", `you said : ${data}`);

    socket.broadcast.emit("reply", `${socket.id} said : ${data}`);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("reply", `${socket.id} : has leave`);
    console.log("User disconnected:", socket.id);
  });
});

app.use(cors());
app.use(bodyParser.json());

app.get("/pencils", (req, res) => {
  const jsonData = readJSONFile();
  if (jsonData && jsonData.pencils) {
    res.json(jsonData.pencils);
  } else {
    res
      .status(500)
      .json({ error: "Error reading data or invalid JSON structure." });
  }
});

app.get("/pencils/:index", (req, res) => {
  const { index } = req.params;
  const jsonData = readJSONFile();
  if (jsonData && jsonData.pencils && jsonData.pencils[index]) {
    res.json(jsonData.pencils[index]);
  } else {
    res.status(404).json({ error: "Pencil not found at the given index." });
  }
});

app.put("/pencils/:index", (req, res) => {
  const { index } = req.params;
  const updatedPencil = req.body;
  try {
    updateItem(parseInt(index), updatedPencil);
    res.json({ message: "Pencil updated successfully.", updatedPencil });
  } catch (error) {
    res.status(500).json({ error: "Error updating pencil." });
  }
});

app.post("/pencils/:color", (req, res) => {
  const { color } = req.params;
  try {
    const newPencil = { color, qty: 1 };
    addNewItem(newPencil);
    res.json({ message: "New pencil added successfully.", newPencil });
  } catch (error) {
    res.status(500).json({ error: "Error adding new pencil." });
  }
});

app.delete("/pencils/:color", (req, res) => {
  const { color } = req.params;
  try {
    const jsonData = readJSONFile();
    const index = jsonData.pencils.findIndex((x) => x.color === color);
    if (index !== -1) {
      deleteItem(index);
      res.json({ message: `Pencil with color ${color} deleted successfully.` });
    } else {
      res.status(404).json({ error: "Pencil not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting pencil." });
  }
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

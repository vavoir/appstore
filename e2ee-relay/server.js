const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const fs = require("fs-extra");

const app = express();
app.use(express.json({ limit: "2mb" }));

const DB_FILE = "./db.json";

// Sauvegarde d’un blob chiffré
app.post("/save", async (req, res) => {
  const { roomId, encrypted } = req.body;
  if (!roomId || !encrypted) return res.status(400).send("Missing data");

  let db = {};
  if (await fs.pathExists(DB_FILE)) db = await fs.readJson(DB_FILE);
  db[roomId] = encrypted;
  await fs.writeJson(DB_FILE, db, { spaces: 2 });
  res.send({ status: "ok" });
});

// Récupération d’un blob chiffré
app.get("/load/:roomId", async (req, res) => {
  if (!(await fs.pathExists(DB_FILE))) return res.json({});
  const db = await fs.readJson(DB_FILE);
  res.json({ encrypted: db[req.params.roomId] || null });
});

// --- WebSocket relay ---
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const rooms = new Map();

function joinRoom(roomId, ws) {
  if (!rooms.has(roomId)) rooms.set(roomId, new Set());
  rooms.get(roomId).add(ws);
  ws.roomId = roomId;
}

function leaveRoom(ws) {
  const roomId = ws.roomId;
  if (roomId && rooms.has(roomId)) {
    rooms.get(roomId).delete(ws);
    if (rooms.get(roomId).size === 0) rooms.delete(roomId);
  }
}

wss.on("connection", (ws) => {
  ws.on("message", (raw) => {
    let msg;
    try { msg = JSON.parse(raw.toString()); } catch { return; }

    if (msg.type === "join") {
      joinRoom(msg.roomId, ws);
      return;
    }

    // Relais aveugle : renvoie le payload tel quel
    const set = rooms.get(msg.roomId);
    if (!set) return;
    for (const client of set) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: msg.type,
          roomId: msg.roomId,
          payload: msg.payload
        }));
      }
    }
  });

  ws.on("close", () => leaveRoom(ws));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Relay server running on", PORT));

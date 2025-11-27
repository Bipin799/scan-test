// const { WebSocketServer } = require("ws"); 

// const wss = new WebSocketServer({ port: 7070 });

// console.log("🔥 WebSocket Server Started → ws://localhost:7070");

// wss.on("connection", (socket) => {
//   console.log("🟢 Client Connected");

//   socket.on("message", (msg) => {
//     console.log(" Received:", msg.toString());

//     wss.clients.forEach(client => {
//       if (client.readyState === 1) {
//         client.send(msg.toString());
//       }
//     });
//   });

//   socket.on("close", () => console.log("🔴 Client Disconnected"));
// });



const { WebSocketServer } = require("ws");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const wss = new WebSocketServer({ port: 7070 });

console.log("🔥 WebSocket Server Started → ws://localhost:7070");

wss.on("connection", (socket) => {
  console.log("🟢 Client Connected");

  socket.on("message", async (msg) => {
    console.log("📩 RAW Message:", msg.toString());

    let data;
    try {
      data = JSON.parse(msg.toString());
      console.log("📦 Parsed →", data);
    } catch {
      console.log("❌ JSON parse failed");
      return;
    }

    // 🔥 Detect delete event here
    if (data.type === "delete") {
      console.log("🗑 Delete Request:", data.id);

      await fetch(`http://localhost:5000/messages/${data.id}`, { method: "DELETE" });

      wss.clients.forEach(c =>
        c.readyState === 1 && c.send(JSON.stringify({ type: "delete", id: data.id }))
      );

      return;
    }

    // For normal chat messages (text / file)
    wss.clients.forEach(c =>
      c.readyState === 1 && c.send(msg.toString())
    );
  });

  socket.on("close", () => console.log("🔴 Client Disconnected"));
});

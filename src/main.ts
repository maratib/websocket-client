import dotenv from "dotenv";
import WebSocket from "ws";
dotenv.config();

const url = process.env.SERVER;
console.log("Connecting to : " + url);

const ws1 = new WebSocket(url, {
  origin: "http://127.0.0.1",
});

const ws = new WebSocket(url, {
  origin: "http://127.0.0.1",
});

ws.on("open", function open() {
  console.log("Open");
});

ws.on("error", function error(e) {
  console.log("Opppsss :", e);
});

ws.on("message", function message(data) {
  const e = JSON.parse(data.toString());
  console.log("received: %s", e.msgId);
});

console.log("Hello Typescript ", process.env.SERVER);

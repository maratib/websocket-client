import dotenv from "dotenv";
import WebSocket from "ws";
import request from "request";
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
  console.log("Open : ");
});

ws.on("error", function error(e) {
  console.log("Opppsss :", e);
});

ws.on("message", function message(data) {
  const jsonData = JSON.parse(data.toString());

  if (jsonData.msgId === 1103) {
    console.log("received: %s", jsonData.msgId);
  } else {
    sendData(jsonData);
  }
});

function sendData(data) {
  const url1 = "https://hrm.fastbooks.info/device-event";

  request(
    {
      url: url1,
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      json: data,
    },
    function (err, resp, body) {
      if (!err) {
        console.log("BODY: ", body);
      } else {
        console.log("Request err", err);
      }
    }
  );
}

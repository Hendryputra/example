import WebSocket from "ws";
const socket = new WebSocket("wss://stream.aisstream.io/v0/stream");
const API_KEY = "96113e8bc1799c822619b94eb891ad4bee60ced5";
socket.addEventListener("open", (_) => {
  const subscriptionMessage = {
    APIkey: API_KEY,
    BoundingBoxes: [
      [
        [-180, -90],
        [180, 90],
      ],
    ],
  };
  console.log(JSON.stringify(subscriptionMessage));
  socket.send(JSON.stringify(subscriptionMessage));
});

socket.addEventListener("error", (event) => {
  console.log(event);
});

socket.addEventListener("message", (event) => {
  let aisMessage = JSON.parse(event.data);
  if (aisMessage["MessageType"] === "PositionReport") {
    let positionReport = aisMessage["Message"]["PositionReport"];
    console.log(
      `ShipId: ${positionReport["UserID"]} Latitude: ${positionReport["Latitude"]} Longitude: ${positionReport["Longitude"]}`
    );
  }
});
};



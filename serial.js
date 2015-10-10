var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 7000 });

var client_ws, data, value;

var ready = false;

var animate = function() {

  // Debug
  // try {
  //   wss.clients.forEach(function each(client) {
  //     client.send(String(128 + 64 *  Math.sin(Date.now() / 1000)));
  //   });
  // }
  // catch(err) {
  //   console.log(err);
  // }

  ready = true;
  setTimeout(animate, 1000/15);
}

animate();

var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/tty.usbserial-AI02NIF1", {
  baudrate: 256000
});

serialPort.on("open", function () {
  console.log('Serial port opened.');
  serialPort.on('data', function(data) {
    if (!ready) return;
    ready = false;
    data = data.toJSON().data;
    // value = String(data[data.length - 1]);
    value = String(data[0]);
    try {
      wss.clients.forEach(function each(client) {
        client.send(value);
      });
    }
    catch(err) {
      console.log(err);
    }
  });
  serialPort.write("ls\n", function(err, results) {
    console.log('err ' + err);
    console.log('results ' + results);
  });
});

wss.on('connection', function connection(ws) {
  console.log('Client connected.')
  client_ws = ws
});

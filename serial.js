var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 7000 });

var client_ws, data, value;

var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/tty.usbserial-AI02NIF1", {
  baudrate: 256000
});

serialPort.on("open", function () {
  console.log('Serial port opened.');
  serialPort.on('data', function(data) {
    data = data.toJSON().data;
    value = String(data[data.length - 1]);
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

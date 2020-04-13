const net = require('net');
const uuidv1 = require('uuid/v1');

const client  = new net.Socket();
client.setEncoding('utf8');

// Create connection with TCP server
client.on('connect',() => {

  let address = client.address();
  let port = address.port;

  console.log('Client: connection established with server');
  console.log('Client is listening at port ' + port);


  // Send data to server
  client.write(createRequest());

  // Handle server response
  client.on('data',(data) => {
    console.log('Data from server:' + data);
    client.end(() => console.log('Connection closed with server'));
  });
  
  client.on('error', (err) => {
      console.log(`Error: ${err}`);
      client.end(() => console.log('Connection closed with server'));
  });

});

// Create request object
function createRequest() {
    let guid = uuidv1();
    let datetime = new Date().toUTCString();
    let obj = {
        _id: guid,
        datetime: datetime
    };
    return JSON.stringify(obj);
}

//Start sending the data
const sendData = setInterval(() => {
    client.connect({
        port:2222
      });
},5000);

//Stop sending data
setTimeout(() =>  {
    clearInterval(sendData);
    console.log('Stop sending messages to server');
},60000);
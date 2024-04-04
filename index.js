const express = require('express');
const WebSocket = require('ws');
const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.static('public')); 

// Create an HTTP server
const httpServer = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const server = new WebSocket.Server({
        port: 8081
    },
    () => {
        console.log('WS server started on port 8081');
    }
);

server.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log('sending message back');

        server.clients.forEach(function(client) {
            if (client !== ws) {
                client.send(message);
            }
        });
    });

    ws.on('close', (code, reason) => {
        console.log(`Connection closed: ${code} ${reason}!`);
    });

    ws.on("connect_error", (err) => {
        console.log(err.message);
        console.log(err.description);
        console.log(err.context);
      });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/api', (req, res) => {
    res.send('api endpoint');
});

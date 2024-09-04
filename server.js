const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// Инициализация Express приложения
const app = express();
const server = http.createServer(app);

// Инициализация WebSocket сервера
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

// Обработка WebSocket соединений
wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    
    // Рассылка изменений всем подключенным клиентам
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Запуск сервера
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

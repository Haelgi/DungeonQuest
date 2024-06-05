const SERVER = '192.168.1.104'
const PORT = 8592

const net = require('net');
const { setTimeout } = require('timers/promises');

// Создаем клиентский сокет
const client = new net.Socket();



// Подключаемся к серверу
client.connect(PORT, SERVER, () => {
    console.log('Подключено к серверу');
    // Отправляем сообщение серверу
    client.write('connect');
});

// Обрабатываем получение данных от сервера
client.on('data', (data) => {
    console.log('Ответ от сервера: ', data);

});


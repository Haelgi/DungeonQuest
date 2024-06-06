const net = require('net');


const SERVER = '192.168.1.104'
const PORT = 8592


// Создаем клиентский сокет
const client = new net.Socket();



// Подключаемся к серверу
client.connect(PORT, SERVER, () => {
    console.log('Подключено к серверу');
    // Отправляем сообщение серверу
    client.write('new_game');
});

// Обрабатываем получение данных от сервера
// client.on('data', (data) => {
//     console.log('Ответ от сервера: ', data);

// });


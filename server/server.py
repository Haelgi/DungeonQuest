import socket

LOCAL_HOST = '192.168.1.104'
PORT = 8592

# Создаем сокет
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

# Связываем сокет с адресом и портом
server.bind((LOCAL_HOST, PORT))
print('Start server')

# Запускаем прослушивание порта
server.listen()
print('listen...')


while True:
    # Принимаем входящее соединение
    client_socket, client_address = server.accept()
    print(f"Подключен клиент с адресом: {client_address}")

    # получаем данние от клиента
    data = client_socket.recv(4096).decode()

    # если есть игрок нажал "создать игру"
    if data == 'new_game':
        print('Creating a new game')

    # если есть игрок нажал "подключится"
    if data == 'connect':
        print('Connect to existing game')

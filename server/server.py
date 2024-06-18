import socket
from game import Game

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

set_user_ip = set()  # Хранилище IP-адресов подключенных клиентов
list_games = {}  # Хранилище игр как объектов
game_id = 0  # Уникальный идентификатор игры
user_count = 0  # количество игроков


def threaded_client(client_socket, player_id, game_id):
    print('threaded_client', client_socket, player_id, game_id)


while True:
    # Принимаем входящее соединение
    client_socket, client_address = server.accept()
    print(f"Connected: {client_address}")

    # получаем данние от клиента
    data = client_socket.recv(4096).decode()

    # если есть игрок нажал "создать игру"
    if data == 'new_game':

        if list_games:
            game_id += 1  # Присваиваем уникальный ID новой игре

        player_id = 0  # Указываем на первого игрока
        list_games[game_id] = Game(game_id)  # Создаем новую игру
        print('Creating new game')
        # Запускаем новый поток для клиента
        threaded_client(client_socket, player_id, game_id)

    # если есть игрок нажал "подключится"
    if data == 'connect':
        print('Connect to existing game')

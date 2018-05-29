from collections import namedtuple
from game.game import Game
from game.minimax import minimax_decision

GameState = namedtuple('GameState', 'to_move, utility, board, moves')

# data = (('01', '21'), (0, 0, 3), ('52', '22', '10'))
data =  {
    'players':['01', '21'],
    'score': {
        'max': 0,
        'min': 0,
        'total': 1
    },
    'apples': ['22']
}

moves = ['13', '22', '20']

# Estado incial
initial = GameState(to_move='max', utility=0, board=data, moves=moves)
game = Game(initial)

# decision = minimax_decision(initial, game)
# print(decision)

print(game.result(initial, '22'))
print(game.result(initial, '13'))
print(game.result(initial, '20'))

# second = GameState(to_move='min', utility=0, board={'players': ['22', '21'], 'score': {'max': 1, 'total': 2, 'min': 0}, 'apples': ['52', '10']}, moves=['33', '13', '42', '40', '02', '00'])

# print(game.result(second, '00'))

# third = GameState(to_move='max', utility=0, board={'players': ['22', '00'], 'score': {'max': 1, 'total': 2, 'min': 0}, 'apples': ['52', '10']}, moves=['34', '30', '14', '10', '43', '41', '03', '01'])

# print(game.result(third, '10'))

# four = GameState(to_move='min', utility=0, board={'players': ['10', '00'], 'score': {'max': 2, 'total': 1, 'min': 0}, 'apples': ['52']}, moves=['12', '21'])

# print(game.result(four, '12'))

# five = GameState(to_move='max', utility=0, board={'players': ['10', '12'], 'score': {'max': 2, 'total': 1, 'min': 0}, 'apples': ['52']}, moves=['22', '02', '31'])

# print(game.result(five, '31'))

# six = GameState(to_move='min', utility=0, board={'players': ['31', '12'], 'score': {'max': 2, 'total': 1, 'min': 0}, 'apples': ['52']}, moves=['24', '20', '04', '00', '33', '31'])

# print(game.result(six, '31'))

# seven = GameState(to_move='max', utility=0, board={'players': ['31', '31'], 'score': {'max': 2, 'total': 1, 'min': 0}, 'apples': ['52']}, moves=['43', '23', '52', '50', '12', '10'])

# print(game.result(seven, '52'))

from collections import namedtuple
from game.game import Game
from game.minimax import minimax_decision, alphabeta_cutoff_search
from copy import deepcopy

GameState = namedtuple('GameState', 'to_move, utility, board, moves')

data =  {
    'players':['52', '33'],
    'score': {
        'max': 1,
        'min': 0,
        'total': 2
    },
    'apples': ['40', '43']
}

moves = ['40', '33', '44', '31']

# Estado incial
initial = GameState(to_move='max', utility=0, board=data, moves=moves)
game = Game()

# decision = minimax_decision(initial, game)
decision = alphabeta_cutoff_search(initial, game)
print(decision)
# import sys
# print(sys.getrecursionlimit())

# print(game.result(initial, '13'))
# print(game.result(initial, '22'))
# print(game.result(initial, '20'))

# for i in range(10000000):
#     lst = deepcopy(data)
#     print(id(lst))
# lst = deepcopy(data)
# print(id(lst))
# lst = deepcopy(data)
# print(id(lst))

# second = GameState(to_move='min', utility=1, board={'players': ['22', '21'], 'score': {'max': 1, 'total': 2, 'min': 0}, 'apples': ['52', '10']}, moves=['33', '13', '42', '40', '02', '00'])

# print(game.result(second, '00'))

# third = GameState(to_move='max', utility=1, board={'players': ['22', '00'], 'score': {'max': 1, 'total': 2, 'min': 0}, 'apples': ['52', '10']}, moves=['34', '30', '14', '10', '43', '41', '03', '01'])

# print(game.result(third, '10'))

# four = GameState(to_move='min', utility=2, board={'players': ['10', '00'], 'score': {'max': 2, 'total': 1, 'min': 0}, 'apples': ['52']}, moves=['12', '21'])

# print(game.result(four, '12'))

# five = GameState(to_move='max', utility=2, board={'players': ['10', '12'], 'score': {'max': 2, 'total': 1, 'min': 0}, 'apples': ['52']}, moves=['22', '02', '31'])

# print(game.result(five, '31'))

# six = GameState(to_move='min', utility=2, board={'players': ['31', '12'], 'score': {'max': 2, 'total': 1, 'min': 0}, 'apples': ['52']}, moves=['24', '20', '04', '00', '33', '31'])

# print(game.result(six, '31'))

# seven = GameState(to_move='max', utility=2, board={'players': ['31', '31'], 'score': {'max': 2, 'total': 1, 'min': 0}, 'apples': ['52']}, moves=['43', '23', '52', '50', '12', '10'])

# print(game.result(seven, '52'))

# eight = GameState(to_move='min', utility=3, board={'players': ['52', '31'], 'score': {'max': 3, 'total': 0, 'min': 0}, 'apples': []}, moves=[])

# print(game.terminal_test(eight))
# print(game.utility(eight))
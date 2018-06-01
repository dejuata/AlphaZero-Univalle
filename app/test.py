from collections import namedtuple
from game.game import Game
from game.minimax import minimax_decision, minimax_decision1
from copy import deepcopy

GameState = namedtuple('GameState', 'to_move, utility, board, moves')

data =  {
    'players':['03', '23'],
    'score': {
        'max': 3,
        'min': 5,
        'total': 2
    },
    'apples': ['05']
}

moves = ['15', '11', '24', '22']

# Estado incial
state = GameState(to_move='max', utility=0, board=data, moves=moves)
game = Game()

# print(game.sort_moves(data['apples'], moves))
decision = minimax_decision1(state, game)
print(decision)

# def sort_moves_h(['44', '40', '33', '31'], '43'):
    
#     pass
    

# first = game.result(state, '15')
# print(first)

# second = GameState(to_move='min', utility=0, board={'players': ['15', '23'], 'score': {'max': 3, 'total': 2, 'min': 5}, 'apples': ['05']}, moves=['35', '31', '15', '11', '44', '42', '04', '02'])
# print('second', game.result(second, '11'))

# third = GameState(to_move='max', utility=0, board={'players': ['15', '11'], 'score': {'max': 3, 'total': 2, 'min': 5}, 'apples': ['05']}, moves=['23', '03', '34'])
# print('third', game.result(third, '34'))

# four = GameState(to_move='min', utility=0, board={'players': ['34', '11'], 'score': {'max': 3, 'total': 2, 'min': 5}, 'apples': ['05']}, moves=['23', '03', '32', '30'])
# print('four', game.result(four, '03'))

# five = GameState(to_move='max', utility=0, board={'players': ['34', '03'], 'score': {'max': 3, 'total': 2, 'min': 5}, 'apples': ['05']}, moves=['42', '22', '55', '53', '15', '13'])
# print('five', game.result(five, '13'))

# six = GameState(to_move='min', utility=0, board={'players': ['13', '03'], 'score': {'max': 3, 'total': 2, 'min': 5}, 'apples': ['05']}, moves=['15', '11', '24', '22'])
# print('six', game.result(six, '24'))

# seven = GameState(to_move='max', utility=0, board={'players': ['13', '24'], 'score': {'max': 3, 'total': 2, 'min': 5}, 'apples': ['05']}, moves=['05', '25', '21', '01', '34', '32'])
# print('seven', game.result(seven, '05'))

# eight = GameState(to_move='min', utility=1, board={'players': ['05', '24'], 'score': {'max': 4, 'total': 1, 'min': 5}, 'apples': []}, moves=['32', '12', '45', '43', '05', '03'])
# print('eight', game.result(eight, '32'))

# eight = GameState(to_move='min', utility=0, board={'players': ['13', '03'], 'score': {'max': 3, 'total': 2, 'min': 5}, 'apples': ['15', '23']}, moves=['15', '11', '24', '22'])
# print('eight', game.result(eight, '15'))

# nine = GameState(to_move='max', utility=-1, board={'players': ['13', '15'], 'score': {'max': 3, 'total': 1, 'min': 6}, 'apples': ['23']}, moves=['25', '21', '05', '01', '34', '32'])
# print('nine', game.result(nine, '25'))

# ten = GameState(to_move='min', utility=-1, board={'players': ['25', '15'], 'score': {'max': 3, 'total': 1, 'min': 6}, 'apples': ['23']}, moves=['23', '03','34'])
# print('ten', game.result(ten, '23'))
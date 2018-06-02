# -*- coding: utf-8 -*-
from collections import namedtuple
from game.game import Game
from game.minimax import minimax_decision
# from game.utils import sort_moves
from copy import deepcopy

GameState = namedtuple('GameState', 'to_move, utility, board, moves')

data =  {
    'players':['32', '24'],
    'score': {
        'max': 0,
        'min': 2,
        'total': 1
    },
    'apples': ['05'],
    'theft': True
}

# moves = ['44', '40', '24', '20', '53', '51', '13', '11']
moves = ['44', '24', '13', '53', '11', '40', '20', '51']
# Estado incial
game = Game()
# moves = sort_moves(data['apples'], moves)
# print(moves)
state = GameState(to_move='max', utility=0, board={'players': ['32', '24'], 'score': {'max': 0, 'min': 2, 'total': 1}, 'theft': True, 'apples': ['11']}, moves=['24', '11', '20', '44', '40', '13', '51', '53'])
print(state)
print(game.result(state, '24'))

second = GameState(to_move='min', utility=2, board={'players': ['24', '24'], 'score': {'max': 2, 'total': 1, 'min': 0}, 'apples': ['11'], 'theft': True}, moves=['32', '03', '05', '12', '45', '43'])
print(game.result(second, '03'))

third = GameState(to_move='max', utility=2, board={'players': ['24', '03'], 'score': {'max': 2, 'total': 1, 'min': 0}, 'apples': ['11'], 'theft': True}, moves=['32', '03', '05', '12', '45', '43'])
print(game.result(third, '32'))

four = GameState(to_move='min', utility=2, board={'players': ['32', '03'], 'score': {'max': 2, 'total': 1, 'min': 0}, 'apples': ['11'], 'theft': True}, moves=['11', '24', '15', '22'])
print(game.result(four, '11'))


decision = minimax_decision(state, game)
print(decision)



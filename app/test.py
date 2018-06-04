# -*- coding: utf-8 -*-
from collections import namedtuple
from game.game import Game
from game.minimax import minimax_decision
# from game.utils import sort_moves
from copy import deepcopy

GameState = namedtuple('GameState', 'to_move, utility, board, moves')

data =  {
    'players':['11', '21'],
    'score': {
        'max': 0,
        'min': 0,
        'total': 2
    },
    'apples': ['10', '30'],
    'theft': False
}

# moves = ['44', '40', '24', '20', '53', '51', '13', '11']
moves = ['30', '32', '03', '23']

# Estado incial
game = Game()

state = GameState(to_move='max', utility=0, board=data, moves=moves)

first = GameState(to_move='max', utility=0, board={'players': ['24', '22'], 'score': {'max': 2, 'min': 0, 'total': 7}, 'theft': True, 'apples': ['52', '40', '42', '43', '33', '21', '23', '14']}, moves=['43', '12', '32', '45', '03', '05'])
print(first)
decision = minimax_decision(first, game)
print(decision)

# print(game.result(first, '43'))

# second = GameState(to_move='min', utility=1, board={'players': ['43', '22'], 'score': {'max': 3, 'total': 6, 'min': 0}, 'apples': ['52', '40', '42', '33', '21', '23', '14'], 'theft': True}, moves=['14', '30', '41', '34', '10', '01', '03', '43'])
# print(game.result(second, '43'))

# third = GameState(to_move='max', utility=-2, board={'players': ['43', '43'], 'score': {'max': 0, 'total': 6, 'min': 3}, 'apples':['52', '40', '42', '33', '21', '23', '14'], 'theft': True}, moves=['31', '22', '35', '24', '55', '51'])
# print(game.result(third, '31'))

# four = GameState(to_move='min', utility=-2, board={'players': ['31', '43'], 'score': {'max': 0, 'total': 6, 'min': 3}, 'apples':['52', '40', '42', '33', '21', '23', '14'], 'theft': True}, moves=['31', '22', '35', '24', '55', '51'])
# print(game.result(four, '31'))

# five = GameState(to_move='max', utility=-2, board={'players': ['31', '31'], 'score': {'max': 0, 'total': 6, 'min': 3}, 'apples':['52', '40', '42', '33', '21', '23', '14'], 'theft': True}, moves=['23', '52', '12', '50', '10', '43'])
# print(game.result(five, '23'))

# six = GameState(to_move='min', utility=-1, board={'players': ['23', '31'], 'score': {'max': 1, 'total': 5, 'min': 3}, 'apples':['52', '40', '42', '33', '21', '14'], 'theft': True}, moves=['52', '12', '50', '23', '10', '43'])
# print(game.result(six, '23'))

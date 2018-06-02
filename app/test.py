# -*- coding: utf-8 -*-
from collections import namedtuple
from game.game import Game
from game.minimax import minimax_decision
from game.utils import sort_moves
from copy import deepcopy

GameState = namedtuple('GameState', 'to_move, utility, board, moves')

data =  {
    'players':['43', '14'],
    'score': {
        'max': 2,
        'min': 1,
        'total': 2
    },
    'apples': ['52', '53']
}

moves = ['55', '51', '35', '31', '24', '22']

# Estado incial
game = Game()
moves = sort_moves(data['apples'], moves)
print(moves)
state = GameState(to_move='max', utility=0, board=data, moves=moves)

decision = minimax_decision(state, game)
print(decision)



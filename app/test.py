# -*- coding: utf-8 -*-
from collections import namedtuple
from game.game import Game
from game.minimax import minimax_decision, minimax_decision1
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
# moves = game.sort_moves(data['apples'], moves)
# print(moves)
state = GameState(to_move='max', utility=0, board=data, moves=moves)

# decision = minimax_decision(state, game)
# print(decision)

apples = data['apples']

def sort_moves(apples, moves):
    init = list()
    last = list()
    for m in moves:
        if m in apples:
            init.append(m)
        else:
            last.append(m)
    
    if len(apples) == 1:
        last = game.sort_moves_h(last, apples[0])
    
    return init + last
    
# ordena las posiciones de acuerdo a aquellas
# que esten a un mov de capturar la manzana
# Solo usar cuando hay solo una manzana en el juego
def sort_moves_h(moves, apples):
    
    init = set()
    last = set()

    for m in moves:
        pos = game.possible_move(m);
        for a in apples:
            if a in pos:
                init.add(m)
            else:
                last.add(m)
    print(init, last)
    print(set(list(init) + list(last)))
    # return list(set(init + last))
# ['45', '41', '34', '32']
print(sort_moves_h(moves, apples))
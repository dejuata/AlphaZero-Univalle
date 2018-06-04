#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import random
from flask import Flask, render_template, request, json
from collections import namedtuple
from game.game import Game
from game.utils import sort_moves
from game.minimax import minimax_decision

GameState = namedtuple('GameState', 'to_move, utility, board, moves')

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/position', methods=['POST'])
def position():
    if request.method == 'POST':
        request_json = request.get_json()
        data = request_json['data']
        position = minimax(data)
        message = notification(data, position)
        return json.dumps({
            'position': position,
            'message': message})

def minimax(data):
    game = Game()
    state = data['state']
    theft = state['theft'] and game.theft_h('max', state['score'])
    moves = sort_moves(state['apples'], data['moves'], theft, state['players'][1])
    init = GameState(to_move='max', utility=0, board=state, moves=moves)
    print(theft, moves)
    print(init)
    return minimax_decision(init, game)

def notification(data, move):
    state = GameState(to_move='max', utility=0, board=data['state'], moves=data['moves'])
    result = Game().result(state, move)
    board = result.board
    number = random.random()
    message = ''
    if abs(board['score']['max'] - board['score']['min']) > 2:
        if  number >= 0.8:
            message = "I'm very close to victory"
        elif number <= 0.2:
            message = "For you to play if you're going to lose"
    elif move == board['players'][1] and data['state']['theft']:
        if number >= 0.8:
            message = "I'm going to steal you"
        elif number <= 0.2:
            message = "I'm following you"
    return message

    
if __name__ == '__main__':
    app.run(host='0.0.0.0')

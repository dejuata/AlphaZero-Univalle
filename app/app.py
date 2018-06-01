#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import random
from flask import Flask, render_template, request, json
from collections import namedtuple
from game.game import Game
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
        return json.dumps({'position': position})

def minimax(data):
    game = Game()
    print(data['moves'])
    moves = game.sort_moves(data['state']['apples'], data['moves'])
    print(moves)
    state = GameState(to_move='max', utility=0, board=data['state'], moves=moves)
    return minimax_decision(state, game)

if __name__ == '__main__':
    app.run(host='0.0.0.0')

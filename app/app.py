#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import random
from flask import Flask, render_template, request, json
from collections import namedtuple
from game.game import Game
from game.minimax import alphabeta_cutoff_search

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
    state = GameState(to_move='max', utility=0, board=data['state'], moves=data['moves'])
    return alphabeta_cutoff_search(state, Game())

if __name__ == '__main__':
    app.run(host='0.0.0.0')

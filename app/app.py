#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import random
from flask import Flask, render_template, request, json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/position', methods=['POST'])
def position():
    if request.method == 'POST':
        request_json = request.get_json()
        data = request_json['data']
        position = random_position(data)
        return json.dumps({'position': position})

def random_position(lst):
    i = random.random() * len(lst)
    return lst[int(i)]

if __name__ == '__main__':
    app.run(host='0.0.0.0')

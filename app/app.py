#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
from flask import Flask, render_template, request, json

app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/position', methods=['POST'])
def position():
  if request.method == 'POST':
    # data = request.form['data'] # no accedo a la data asi, mirar como
    return json.dumps({'position': '11'})



if __name__ == '__main__':
    app.run(host='0.0.0.0')

from copy import deepcopy
from collections import namedtuple

GameState = namedtuple('GameState', 'to_move, utility, board, moves')

class Game(object):

    def __repr__(self):
        return '<{}>'.format(self.__class__.__name__)

    def __init__(self, initial):
        self.initial = initial

    def actions(self, state):
        return state.moves

    def result(self, state, move):
        """
        Result of applying an action
        """
        if move not in state.moves:
            return state
        else:
            board = deepcopy(state.board)
            position = board['players'][1] if state.to_move == 'max' else board['players'][0]

            if move in state.board['apples']:
                board['apples'].remove(move)
                if state.to_move == 'max':
                    board['score']['max'] += 1
                    board['score']['total'] -= 1
                else:
                    board['score']['min'] += 1
                    board['score']['total'] -= 1
            
            if state.to_move == 'max':
                board['players'][0] = move
            else:
                board['players'][1] = move

            # creo que se deben calcular los movimientos de max y min
            return GameState(
                            to_move=('min' if state.to_move == 'max' else 'max'),
                            utility=self.compute_utility(board, move, state.to_move),
                            board=board, 
                            moves=self.possible_move(position)
                        )

    def compute_utility(self, board, move, player):
        """
        If max wins with this move, return 1; 
        if min wins return -1; else return 0.
        """
        apples = tuple(board['apples'])
        score = board['score']

        if len(apples) == 0 and score['max'] > score['min'] and score['total'] == 0 and player == 'max':
            return 1
        elif len(apples) == 0 and score['max'] < score['min'] and score['total'] == 0 and player == 'min':
            return -1

        return 0

    def utility(self, state, player):
        """
        Return the value to player; 1 for win, -1 for loss, 0 otherwise.
        """
        return state.utility if player == 'max' else -state.utility

    def terminal_test(self, state):
        """
        A state is terminal if it is won or there are no apples.
        """
        return state.utility != 0

    def to_move(self, state):
        """
        Return the player whose move it is in this state.
        """
        return state.to_move

    def display(self, state):
        """
        Print or otherwise display the state.
        """
        print(state)

    def possible_move(self, pos):
        result = list()
        row = int(pos[0])
        col = int(pos[1])

        if row >= 0 and row <= 4:
            if (col >= 0 and col <= 3): result.append("{}{}".format(row + 1, col + 2))
            if (col <= 5 and col >= 2): result.append("{}{}".format(row + 1, col - 2))
        
        if row <= 5 and row >= 1:
            if col >= 0 and col <= 3: result.append("{}{}".format(row - 1, col + 2))
            if col <= 5 and col >= 2: result.append("{}{}".format(row - 1, col - 2))
        
        if row >= 0 and row <= 3: 
            if col >= 0 and col <= 4: result.append("{}{}".format(row + 2, col + 1))
            if col <= 5 and col >= 1: result.append("{}{}".format(row + 2, col - 1))
        
        if row >= 2 and row <= 5:
            if col >= 0 and col <= 4: result.append("{}{}".format(row - 2, col + 1))
            if col <= 5 and col >= 1: result.append("{}{}".format(row - 2, col - 1))

        return result

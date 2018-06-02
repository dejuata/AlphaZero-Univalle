from copy import deepcopy
from collections import namedtuple
from game.utils import sort_moves, possible_move
# from utils import sort_moves, possible_move

GameState = namedtuple('GameState', 'to_move, utility, board, moves')

class Game(object):

    def __repr__(self):
        return '<{}>'.format(self.__class__.__name__)

    def actions(self, state):
        return state.moves

    def result(self, state, move):
        """
        Result of applying an action
        """
        if move not in state.moves:
            return state
        else:
            player = state.to_move
            board = deepcopy(state.board)
            position = board['players'][1] if player == 'max' else board['players'][0]
            catch = False
            utility = state.utility
            theft = self.theft_validation(player, board['score']) if board['theft'] else False

            # Robar o no robar
            if theft and move == position:
                utility = self.theft(player, board['score']) + state.utility
                
            # Capturar manzanas
            elif move in state.board['apples']:
                catch = self.catch_apples(state, board, move)
                utility = self.compute_utility(catch, player, state.utility)

            if player == 'max':
                board['players'][0] = move
            else:
                board['players'][1] = move

            to_move = 'min' if player == 'max' else 'max'
            next_position = sort_moves(board['apples'], possible_move(position), self.theft_validation(player, board['score']), position)

            return GameState(
                to_move=to_move,
                utility=utility,
                board=board, 
                moves=next_position if board['score']['total'] > 0 and len(board['apples']) > 0 else []
            )

    def catch_apples(self, state, board, move):
        board['apples'].remove(move)

        if state.to_move == 'max':
            board['score']['max'] += 1
            board['score']['total'] -= 1
        elif state.to_move == 'min':
            board['score']['min'] += 1
            board['score']['total'] -= 1

        return True

    def compute_utility(self, catch, player, utility):
        """
        If max wins with this move, return 1; 
        if min wins return -1; else return 0.
        """
        if player == 'max' and catch:
            return utility + 1
        elif player == 'min' and catch:
            return utility - 1
        else:
            return utility
    
    def utility(self, state):
        """
        Return the value to player
        """
        return state.utility

    def terminal_test(self, state):
        """
        A state is terminal if it is won or there are no apples.
        """
        return len(state.board['apples']) == 0

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

    def theft(self, player, score):
        if player == 'max':
            score['max'] += score['min']
            score['min'] = 0
            return score['max']
        else:
            score['min'] += score['max']
            score['max'] = 0
            return -score['min']

    def theft_validation(self, player, score):
        theft = False

        if player == 'max' and score['min'] > 0:
            theft = True
        elif player == 'min' and score['max'] > 0:
            theft = True

        return theft

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
            players = board['players']
            apples = board['apples']
            score = board['score']
            position = players[1] if player == 'max' else players[0]
            utility = state.utility

            # todo esto deberia suceder si el robar esta activo, sino, simplemente capture
            if board['theft'] and self.theft(position, move):
                # Calculo utilidad por robo
                theft = self.utility_by_theft(player, score)
                # print(theft)
                utility += theft
                self.set_score(score, True, player, theft)
                
            elif self.catch(apples, move):
                # Calculo utilidad por capturar manzana
                catch = self.utility_by_catch(self.catch(apples, move), player)
                # print(catch)
                apples.remove(move)
                utility += catch
                self.set_score(score, False, player, catch)

            if player == 'max':
                board['players'][0] = move
            else:
                board['players'][1] = move

            to_move = 'min' if player == 'max' else 'max'
            next_position = sort_moves(apples, possible_move(position), board['theft'] and self.theft_h(player, score), position)

            return GameState(
                to_move=to_move,
                utility=utility,
                board=board, 
                moves=next_position if board['score']['total'] > 0 and len(board['apples']) > 0 else []
            )

    def catch(self, apples, move):
        return move in apples
    
    def theft(self, position, move):
        return position == move

    def theft_h(self, player, score):
        return score['min'] > 0 if player == 'max' else score['max'] > 0

    def utility_by_catch(self, catch, player):
        if player == 'max' and catch:
            return +1
        elif player == 'min' and catch:
            return -1
        else:
            return 0
    
    def utility_by_theft(self, player, score):
        if player == 'max':
            return +score['min']
        elif player == 'min':
            return -score['max'] * 10
        else:
            return 0

    def set_score(self, score, theft, player, value):
        if theft:
            if player == 'max':
                score['max'] += value
                score['min'] = 0
            else:
                score['min'] -= value
                score['max'] = 0
        else:
            if player == 'max':
                score['max'] += 1
            else:
                score['min'] += 1

            score['total'] -=1
    
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

    


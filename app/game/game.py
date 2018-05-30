from copy import deepcopy
from collections import namedtuple

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
            board = deepcopy(state.board)
            position = board['players'][1] if state.to_move == 'max' else board['players'][0]
            
            catch = False

            if move in state.board['apples']:
                board['apples'].remove(move)
                catch = True

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
                            utility=self.compute_utility(catch, state.to_move, state.utility),
                            board=board, 
                            moves=self.possible_move(position) if board['score']['total'] > 0 else []
                        )

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

def sort_moves(apples, moves):
    init = list()
    last = list()
    for m in moves:
        if m in apples:
            init.append(m)
        else:
            last.append(m)
    
    last = sort_moves_last(apples, last)

    return init + last
    

def join_list(lsta, lstb):
    lst = list()
    for e in lstb:
        if e not in lsta:
            lst.append(e)
    return lsta + lst

def possible_move(pos):
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

def sort_moves_last(apples, moves):
    init = set()
    medi = set()
    last = set()

    for m in moves:
        pos = possible_move(m);        
        for a in apples:
            if a in pos:
                init.add(m)
            else:
                for p in pos:
                    pos1 = possible_move(p)
                    if a in pos1:
                        medi.add(m)
                    else:
                        last.add(m)

    return join_list(join_list(list(init), list(medi)), list(last))






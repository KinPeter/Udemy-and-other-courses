
def cls():
    """ Clear the lines on the screen """
    for ignore in range(100):
        print()


cls()
print(__file__)

##for i in range(9812, 9824):
##    print(chr(i), end='')
##    if i == 9817:     #last white piece
##        print()
##
##print('\n\n\n')

chess_white = '♙♖♗♘♔♕♗♘♖'
chess_black = '♟♜♞♝♚♛♝♞♜'

board_white = chr(0x2B1C)
board_black = chr(0x2B1B)

for row in range(8):
    if row is 0:
        print(chess_black[1:])
    elif row is 1:
        print(chess_black[0] * 8)
    elif row is 6:
        print(chess_white[0] * 8)
    elif row is 7:
        print(chess_white[1:])
    elif row % 2:
        print( str(board_black + board_white) * 4)
    else:
        print( str(board_white + board_black) * 4)









    



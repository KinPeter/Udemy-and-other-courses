def print_a_number_triangle(number):

    string = ""

    for i in range(1, number+1):
        string += ' '+ str(i)
        print(string)


""" Different approach with nested loops

def print_a_number_triangle(number):
    for i in range(1, number+1):
        for j in range(1, i+1):
            print(j, end=' ')
        print()
"""


print_a_number_triangle(5)


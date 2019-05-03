def valid_triangle(alpha, beta, gamma):
    return alpha + beta + gamma == 180


if valid_triangle(20,30,60):
    print('Valid triangle')
else:
    print('Not a valid triangle')

if valid_triangle(100,30,50):
    print('Valid triangle')
else:
    print('Not a valid triangle')
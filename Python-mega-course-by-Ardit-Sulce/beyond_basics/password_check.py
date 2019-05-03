correct_psw = 'python123'
name = input('Enter name: ')
surname = input('Enter surname: ')
psw = input('Enter the password: ')

while psw != correct_psw:
	psw = input('Wrong password. Enter again: ')

message = "Hi %s %s, you are logged in." % (name, surname)
print(message)


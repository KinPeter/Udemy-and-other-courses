from datetime import datetime

now = datetime.now()
then = datetime(1985, 9, 16, 9, 30)

print('now:', now)
print('then:', then)
print('since then:', now - then)

print('\n', dir(datetime), '\n')

whenever = datetime.strptime('2018-11-15', '%Y-%m-%d')

print(whenever, '\n')

#now = datetime.strftime('%Y-%m-%d %H:%m')
print(now.strftime('év: %Y hónap: %m nap: %d óra: %H perc: %m \n'))
#all strftime formats: http://strftime.org/

print('év:', now.year, 'hónap:', now.month, 'etc...')
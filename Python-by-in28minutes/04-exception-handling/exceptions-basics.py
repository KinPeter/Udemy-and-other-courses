try:
    i = 0
    j = 10 / i
    values = [1, '1']
    sum(values)

# --- handling multiple types of errors:
except (TypeError, ZeroDivisionError) as error:
    print('Problem is:', error)   # getting and printing the error details
    j = 11
# OR one-by-one:

except TypeError:
    print('TypeError!')
    j = 10

except ZeroDivisionError:
    print('ZeroDivisionError!')
    j = 0

else:       # executed only when above defined exceptions do not happen
    print('Else...')
    # else is not so commonly used...

finally:    # executed anyway even if exception is handled or not
    print('Finally...')
    # recommended to close open files in finally block
    # finally block is quite commonly used

print(j)

print('End')

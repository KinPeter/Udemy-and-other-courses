class Account:
    """This class generates general account objects"""  # docstring

    def __init__(self, filepath):
        self.filename = filepath
        with open(filepath, 'r') as file:
            self.balance = int(file.read())

    def withdraw(self, amount):
        self.balance -= amount

    def deposit(self, amount):
        self.balance += amount

    def commit(self):
        with open(self.filename, 'w') as file:
            file.write(str(self.balance))


class Checking(Account):  # inherits all the methods of Account (base class) and we add special methods here
    """This class generates checking account objects"""  # docstring

    type = "checking account"  # class variable

    def __init__(self, filepath, fee):
        Account.__init__(self, filepath)
        self.fee = fee

    def transfer(self, amount):
        self.balance = self.balance - amount - self.fee

jack_checking = Checking('jack_balance.txt', fee=1)
jack_checking.transfer(110)
print(jack_checking.balance)
jack_checking.commit()
print(jack_checking.type)

john_checking = Checking('john_balance.txt', fee=1)
john_checking.transfer(110)
print(john_checking.balance)
john_checking.commit()
print(john_checking.type)

print(jack_checking.__doc__) # prints the docstring

class CurrenciesDoNotMatchError(Exception):
    # defining custom error as class - must inherit from Exception class
    def __init__(self, message):
        super().__init__(message)


class Currency:
    def __init__(self, currency, amount):
        self.currency = currency
        self.amount = amount

    def __repr__(self):
        return repr((self.currency, self.amount))

    def __add__(self, other):
        # this is to use "+" operator on values, so currency string
        # will not be "added", only the amount

        # raising a custom exception if the currencies are not the same:
        if self.currency != other.currency:
            raise CurrenciesDoNotMatchError(self.currency + ' ' + other.currency)

        total_amount = self.amount + other.amount
        return Currency(self.currency, total_amount)


value1 = Currency('USD', 20)
value2 = Currency('INR', 30)

print(value1 + value2)
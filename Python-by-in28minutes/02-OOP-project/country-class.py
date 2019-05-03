from operator import attrgetter


class Country:
    def __init__(self, name, population, area):
        self.name = name
        self.population = population
        self.area = area

    # representation method - when "print(countries)" it will show the data in "return" part
    def __repr__(self):
        return repr((self.name, self.population, self.area))  # (( )) for TUPLE


countries = [Country('India', 1200, 100),
             Country('China', 1400, 200),
             Country('USA', 120, 300)]

countries.append(Country('Russia', 80, 600))

print(countries)

countries.sort(key = attrgetter('population'))
print(countries)

print(max(countries, key=attrgetter('population')))
print(max(countries, key=attrgetter('area')))
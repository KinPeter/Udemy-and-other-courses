class LandAnimal:
    def __init__(self):
        super().__init__()
        self.walking_speed = 5


class WaterAnimal:
    def __init__(self):
        super().__init__()
        self.swimming_speed = 10

    def increase_swimming_speed(self, how_much):
        self.swimming_speed += how_much


class Amphibian(WaterAnimal, LandAnimal):     # multiple inheritance
    def __init__(self):
        super().__init__()


amphibian = Amphibian()
print(amphibian.walking_speed)
print(amphibian.swimming_speed)
amphibian.increase_swimming_speed(50)
print(amphibian.swimming_speed)
# Amphibian class inherited both properties and behavior from LandAnimal and WaterAnimal



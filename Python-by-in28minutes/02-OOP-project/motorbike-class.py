class MotorBike:
    # special method: constructor:
    def __init__(self, speed):
        self.speed = speed      # creates the attribute

    # first behavior method:
    def increase_speed(self, how_much):
        self.speed += how_much

    def decrease_speed(self, how_much):
        if self.speed - how_much > 0:
            self.speed -= how_much
        else:
            print('get a life!')


honda = MotorBike(50)
ducati = MotorBike(250)

honda.increase_speed(150)
ducati.increase_speed(25)

print(honda.speed)
print(ducati.speed)

honda.decrease_speed(150)
ducati.decrease_speed(25)

print(honda.speed)
print(ducati.speed)
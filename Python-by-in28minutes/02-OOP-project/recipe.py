from abc import ABC, abstractmethod


class AbstractRecipe(ABC):
    # template method - details will be defined in the other classes
    def execute(self):
        self.prepare()
        self.recipe()
        self.cleanup()

    @abstractmethod
    def prepare(self):
        pass

    @abstractmethod
    def recipe(self):
        pass

    @abstractmethod
    def cleanup(self):
        pass


class Recipe1(AbstractRecipe):
    def prepare(self):
        print('do the dishes')
        print('get raw materials')

    def recipe(self):
        print('execute the steps')

    def cleanup(self):
        pass


Recipe1().execute()
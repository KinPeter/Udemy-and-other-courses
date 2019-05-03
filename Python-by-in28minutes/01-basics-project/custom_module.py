def method_1():
    print('method 1')


class ClassA:
    def class_method_1(self):
        print('class_method 1')


if __name__ == '__main__':     # prevents the code from being executed if using as imported module
    method_1()

    ClassA().class_method_1()


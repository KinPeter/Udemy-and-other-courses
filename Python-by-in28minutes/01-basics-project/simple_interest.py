def simple_interest(principle, interest, duration):
    return principle + interest * 0.01 * duration * principle


print(simple_interest(10000, 5, 5))
def sumNumbers(a,b):
    return a+b

# Generate a random list of numbers with length 10
# use constant for lenght and range of numbers
import random
LEN = 10
MIN_VALUE = 0
MAX_VALUE = 100
numbers = [random.randint(MIN_VALUE, MAX_VALUE) for _ in range(LEN)]

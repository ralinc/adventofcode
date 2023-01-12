from collections import deque, namedtuple
from functools import reduce

IndexedValue = namedtuple("IndexedValue", "index value")


def sum_grove_coordinates(input, key, mixes):
    mixed = deque(IndexedValue(i, n * key) for i, n in enumerate(input))

    for _ in range(mixes):
        for oi in range(len(mixed)):
            mi = next(i for i, m in enumerate(mixed) if m.index == oi)
            mixed.rotate(-mi)

            m = mixed.popleft()

            count = m.value % len(mixed)
            mixed.rotate(-count)

            mixed.append(m)

    zi = next(i for i, m in enumerate(mixed) if m.value == 0)

    return reduce(lambda a, c: a + mixed[(zi + c) % len(mixed)].value, (1000, 2000, 3000), 0)


with open("2022/20.input") as f:
    input = [int(x) for x in f.read().strip().split("\n")]

first = sum_grove_coordinates(input, 1, 1)
print(first)  # 19559

second = sum_grove_coordinates(input, 811589153, 10)
print(second)  # 912226207972

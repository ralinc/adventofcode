import re
from collections import namedtuple
from functools import cache

Valve = namedtuple("Valve", "id, rate, tunnels")


@cache
def find_max_pressure(valve, minutes, opened, others):
    if minutes == 0:
        if others:
            return find_max_pressure(valves["AA"], 26, opened, 0)
        else:
            return 0

    max_pressure = 0

    if valve.rate and valve.id not in opened:
        max_pressure = max(
            max_pressure,
            (minutes - 1) * valve.rate + find_max_pressure(valve, minutes - 1, frozenset((*opened, valve.id)), others),
        )

    for tunnel in valve.tunnels:
        max_pressure = max(max_pressure, find_max_pressure(valves[tunnel], minutes - 1, opened, others))

    return max_pressure


valves = dict()

with open("./2022/16.input") as file:
    pattern = re.compile(r"Valve ([A-Z]{2}) has flow rate=(\d+); tunnels? leads? to valves? ([A-Z, ]+)")

    for line in file.read().splitlines():
        id, rate, tunnels = pattern.findall(line)[0]
        valves[id] = Valve(id, int(rate), tuple(tunnels.split(", ")))


first = find_max_pressure(valves["AA"], 30, (), 0)
print(first)

second = find_max_pressure(valves["AA"], 26, (), 1)
print(second)

def solve1(rotations)
  count, =
    rotations.reduce [0, 50] do |(count, position), rotation|
      distance = (rotation[0] == 'L' ? -1 : 1) * rotation[1..].to_i
      position = (position + distance) % 100
      count += 1 if position.zero?
      [count, position]
    end

  count
end

def solve2(rotations)
  count, =
    rotations.reduce [0, 50] do |(count, position), rotation|
    previous = position

    distance = (rotation[0] == 'L' ? -1 : 1) * rotation[1..].to_i
    position += distance

    crossings, position = position.divmod 100
    crossings = crossings.abs

    crossings += 1 if position.zero? && !distance.positive?
    crossings -= 1 if previous.zero? && distance.negative?

    count += crossings

    [count, position]
  end

  count
end

rotations = File.read('./2025/01.input').split "\n"

p solve1(rotations)
p solve2(rotations)

f = open("../data/trial_misc_data.csv", "r")

tiles = dict()

total = 0

for line in list(f.readlines())[1:]:
    toptile = line.split(",")[0]
    if(toptile in tiles):
        tiles[toptile] += 1
    else:
        tiles[toptile] = 1
    total += 1

print("\t".join(tiles.keys()))
print("\t".join(map(str, list(tiles.values()))))

def percent(x):
    return str((x * 100 // total)) + "%"

print("\t".join(map(percent, list(tiles.values()))))

print("of " + str(total) + " trials")

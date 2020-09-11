import json

datafile = open('../data/main_data.json', 'r')
data = json.loads(datafile.read())["data"]
datafile.close()

ms = 0

for i, example in enumerate(data):
    for move in example:
        data = list(map(str, move.values()))
        ms += int(data[1])
    def percent(x):
        return str((x * 10000 // len(example)) / 100)
    print(i)

print("Total:\t" + str(ms) + "ms");
print("Or:\t" + str(ms / 1000) + "s");

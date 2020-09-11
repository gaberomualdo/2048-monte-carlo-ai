# NOTE: this program is not runnable because the file structure and names of data files have been changed since this was written

import json

datafile = open('first50.txt', 'r')
data = json.loads(datafile.read())["data"]
datafile.close()

f = open("amount_of_moves.csv", "w")

colheaders = ["Left","Right","Up", "Down", "Left Percent","Right Percent","Up Percent", "Down Percent"]


csvcontent = ",".join(colheaders)

for i, example in enumerate(data):
    left = 0
    right = 0
    up = 0
    down = 0

    for move in example:
        data = list(map(str, move.values()))
        if(data[0] == "left"):
            left += 1
        if(data[0] == "right"):
            right += 1
        if(data[0] == "up"):
            up += 1
        if(data[0] == "down"):
            down += 1
    def percent(x):
        return str((x * 10000 // len(example)) / 100)
    print(i)
    csvcontent += "\n" + ",".join(list(map(str, [left, right, up, down])) + list(map(percent, [left, right, up, down])))

f.write(csvcontent)
f.close()
print("done")

# NOTE: this program is not runnable because the file structure and names of data files have been changed since this was written

import json

datafile = open('first50.txt', 'r')
data = json.loads(datafile.read())["data"]
datafile.close()

f = open("extra_data.csv", "w")

colheaders = ["Best Tile in Board","Game Score","Game Total Moves"]

csvcontent = ",".join(colheaders)

for i, example in enumerate(data):
    data = list(map(str, example[len(example) - 1].values()))
    csvcontent += "\n" + ",".join([data[2], data[5], str(len(example))])

f.write(csvcontent)
f.close()
print("done")

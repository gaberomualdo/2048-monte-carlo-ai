# NOTE: there is an extra trial #51 which is not valid. The data there was from a game that never actually finished.

import json

datafile = open('../data/main_data.json', 'r')
data = json.loads(datafile.read())["data"]
datafile.close()

colheaders = ["Best Move","MS To Calculate Best Move","Best Tile in Board","Average Score of Simulations","Average Move Count of Simulations","Current Game Score"]

for i, example in enumerate(data):
    f = open("../data/trials/" + str(i + 1) + ".csv", "w")

    csvcontent = ",".join(colheaders)

    for move in example:
        csvcontent += "\n" + ",".join(list(map(str, move.values())))

    f.write(csvcontent)
    f.close()
    print("Finished generating " + "data/example" + str(i + 1) + ".csv")

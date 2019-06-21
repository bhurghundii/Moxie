import os

def removeChatLogs(directory):
    directoryFiles =  os.listdir(directory)

    for file in directoryFiles:
        if (len(file[:-4]) == 16 and file[-4:] == '.txt'):
            os.remove(directory +'/' + file)

removeChatLogs('../torchat')

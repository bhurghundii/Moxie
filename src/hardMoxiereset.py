import os
import shutil

#Reset TorCHAT and Moxie
def removeChatLogs(directory):
    directoryFiles =  os.listdir(directory)
    for file in directoryFiles:
        if (len(file[:-4]) == 16 and file[-4:] == '.txt'):
            os.remove(directory +'/' + file)
        if "_offline.txt" in file:
            os.remove(directory +'/' + file)


print 'Cleaning MOXIE'
if os.path.isfile("me.info"):
    os.remove("me.info")
if os.path.isfile("sendBuffer.txt"):
    os.remove("sendBuffer.txt")

if os.path.isfile("moxielogout.txt"):
    os.remove("moxielogout.txt")

print 'Cleaning BUMP'
if os.path.isfile("historyaddresses.txt"):
    os.remove("historyaddresses.txt")
    open("historyaddresses.txt", 'a').close()

print 'Cleaning REVOLVER'
if os.path.isfile("torchat/torchat.ini"):
    os.remove("torchat/torchat.ini")

if os.path.isfile("torchat/buddy-chatProperties.txt"):
    os.remove("torchat/buddy-chatProperties.txt")

if os.path.isfile("torchat/buddy-list.txt"):
    os.remove("torchat/buddy-list.txt")

if os.path.isfile("torchat/currentSession.txt"):
    os.remove("torchat/currentSession.txt")

if os.path.isfile("torchat/Tor/tor.pid"):
    os.remove("torchat/Tor/tor.pid")

if os.path.isfile("torchat/pid-torchat.txt"):
    os.remove("torchat/pid-torchat.txt")

removeChatLogs('torchat')
try:
    shutil.rmtree("torchat/Tor/hidden_service")
except:
    pass

try:
    shutil.rmtree("torchat/Tor/tor_data")
except:
    pass

if os.path.isfile("torchat/statusUpdates.txt"):
    os.remove("torchat/statusUpdates.txt")
    open("torchat/statusUpdates.txt", 'a').close()

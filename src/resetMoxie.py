import os
#Reset TorCHAT and Moxie

print 'Cleaning MOXIE'
if os.path.isfile("me.info"):
    os.remove("me.info")
if os.path.isfile("sendBuffer.txt"):
    os.remove("sendBuffer.txt")

print 'Cleaning BUMP'
if os.path.isfile("historyaddresses.txt"):
    os.remove("historyaddresses.txt")
    open("historyaddresses.txt", 'a').close()

print 'Cleaning TorChat'
if os.path.isfile("torchat/torchat.ini"):
    os.remove("torchat/torchat.ini")

if os.path.isfile("torchat/buddy-list.txt"):
    os.remove("torchat/buddy-list.txt")

if os.path.isfile("torchat/Tor/hidden_service/hostname"):
    os.remove("torchat/Tor/hidden_service/hostname")

if os.path.isfile("torchat/Tor/hidden_service/private_key"):
    os.remove("torchat/Tor/hidden_service/private_key")

if os.path.isfile("torchat/statusUpdates.txt"):
    os.remove("torchat/statusUpdates.txt")
    open("torchat/statusUpdates.txt", 'a').close()

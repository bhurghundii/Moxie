import os

def cleanup():
    file = open('Tor/tor.pid', 'r')
    torpid = file.read();
    os.system('kill -9 '  + torpid)

    os.system('fuser -k 11009/tcp')

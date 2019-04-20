from bluetooth import *
from bt_proximity import BluetoothRSSI
import time, threading, sys, math, time, random, bluetooth
from threading import Thread
from random import randint
import re, uuid
import datetime


#====================================
#BumpCycle manages all the threads and does checks
#====================================
class bumpCycle():
    def run(self):
        try:
            W = WRCycle()
            S = ScanCycle()
            W.daemon = True
            S.daemon = True

            W.start()
            S.start()

            W.join()
            S.join()

        except:
            print "[" + __file__ + "] "+ "Your Bluetooth Device is not on!"


#============================================
# SCAN FUNCTIONS
#============================================
class ScanCycle(threading.Thread):
    def run(self):
        while 1:
            try:
                self.ScanMain()
            except KeyboardInterrupt:
                print "[" + __file__ + "] "+ 'BUMP.Api detects a keyboard cancel. Ending ScanCycle safely'
                break


    def ScanMain(self):
        print "[" + __file__ + "] "+ 'BUMP.Api is scanning for Devices'
        nearby_devices = discover_devices(duration=5, lookup_names = True)
        print "[" + __file__ + "] "+ "Detecting %d devices" % len(nearby_devices)
        if len(nearby_devices) == 0:
            print "[" + __file__ + "] " + "BUMP.Api: 0 devices so restarting scan"

        else:
            for name, addr in nearby_devices:
                print "[" + __file__ + "] " + "We found devices. Adding to list"
                print " %s - %s" % (addr, name)
                with open("historyaddresses.txt", "a") as historyAddress:
                    historyAddress.write("%s - %s \n" % (name, addr))
                addr_list.append(name)


class WRCycle(threading.Thread):
    def run(self):
        while 1:
            try:
                print "[" + __file__ + "] "+ 'BUMP.Api is beginning its BT Read / Write cycle'
                lines = tuple(open('historyaddresses.txt', 'r'))
                for x in range(0, len(lines)):
                    ADDR_OP = lines[x].split(' ')[0]
                    self.bluetoothSocketWriteRead(ADDR_OP)
            except KeyboardInterrupt:
                print "[" + __file__ + "] "+ 'BUMP.Api detects a keyboard cancel. Ending W-RCycle safely'
                break

    def bluetoothSocketWriteRead(self, ADDR_OP):
        addr = ADDR_OP
        num = NUM_LOOP
        btrssi = BluetoothRSSI(addr=addr)

        n=1   #Path loss exponent(n) = 1.5
        c = 10   #Environment constant(C) = 10
        A0 = 2   #Average RSSI value at d0
        actual_dist = 10   #Static distance between transmitter and Receiver in cm
        sum_error = 0
        count = 0

        mac_int = int(addr.translate(None, ":.- "), 16)
        for i in range(1, num):
            if (btrssi.get_rssi()):
                rssi_bt = abs(float(btrssi.get_rssi()))
                print "[" + __file__ + "] "+ "SIGNAL STRENGTH: " + str(rssi_bt)

                if(rssi_bt!=0 and i>0):
                    count=count+1
                    x = float((rssi_bt-A0)/(-10*n))
                    distance = (math.pow(10,x) * 10) + c
                    error = abs(actual_dist - distance)
                    sum_error = sum_error + error
                    avg_error = sum_error/count
                    FLAG = 0
                    global DISTANCE

                    if (rssi_bt < 40):
                        print "[" + __file__ + "] "+ " is exchanging data with " + addr

                        while 1:
                            if mac_int > LOCAL_BT_ADDR:
                                print "[" + __file__ + "] "+ 'Writing to ' + addr
                                self.WriteSocket(addr, SEND_TEXT)
                                FLAG = 1
                            if mac_int < LOCAL_BT_ADDR:
                                print "[" + __file__ + "] "+ 'Reading to ' + addr
                                self.ReadSocket()
                                FLAG = 2
                            if FLAG == 1:
                                self.ReadSocket()
                                print "[" + __file__ + "] "+ " data exchange has completed with " + addr
                                break
                            if FLAG == 2:
                                self.WriteSocket(addr, SEND_TEXT)
                                print "[" + __file__ + "] " + " data exchange has completed " + addr
                                break

    #============================================
    # WRITE AND READ FUNCTIONS
    #============================================
    def WriteSocket(self, address, text):
        print "[" + __file__ + "] "+ "has started writing to the address's reading socket"
        writeTimeout = 0
        while 1:
            try:
                port = 1
                sock=bluetooth.BluetoothSocket( bluetooth.RFCOMM )
                sock.connect((str(address), port))
                sock.send(text)
                sock.close()
                print "[" + __file__ + "] "+ "has finished writing!"
                break
            except:
                pass
            writeTimeout += 1
            if writeTimeout > TIMEOUT:
                print "[" + __file__ + "] "+ "Tried to write but no read was available"

                f = open("status.txt", "w")
                f.write("Unknown device")
                f.close()

                break

    def ReadSocket(self):
        print "[" + __file__ + "] "+ "has started reading. Waiting for writing."
        server_sock=bluetooth.BluetoothSocket( bluetooth.RFCOMM )
        try:
            port = 1
            server_sock.settimeout(1)
            server_sock.bind(("",port))
            server_sock.listen(1)
            client_sock,address = server_sock.accept()
            print "[" + __file__ + "] "+ " has accepted connection from ",address
            data = client_sock.recv(1024)
            print "[" + __file__ + "] "+ "received [%s]" % data
            outputFile(data)
            f = open("status.txt", "w")
            f.write("Added " + data)
            f.close()
            client_sock.close()
        except:
            print "[" + __file__ + "] "+ "Tried to read but no write was available"
        server_sock.close()

#============================================

#============================================



#------------------------------------
#Config settings
#------------------------------------
LOCAL_BT_ADDR = uuid.getnode()
BT_ADDR = ""
NUM_LOOP = 30
DISTANCE = 20
SEND_TEXT = "Default Test from GodParticle"
DEBUG = 'FALSE'
STATUSFLAG = 0
addr_list = []
TIMEOUT = 50
#------------------------------------

def setSEND_TEXT(textArgs):
    global SEND_TEXT
    SEND_TEXT = textArgs

def setDEBUG(tmpDEBUG):
    global DEBUG
    DEBUG = tmpDEBUG

def setDISTANCE(tmpDISTANCE):
    global DISTANCE
    DISTANCE = tmpDISTANCE

def checkLogIfAlreadyWritten(TextToWrite):
    lastLine = ""
    with open('bfclog.txt') as myfile:
        if myfile.read() != "":
            lastLine = (list(myfile)[:-1])

    if lastLine == TextToWrite:
        return True
    else:
        return False

def getSEND_TEXT(textArgs):
  return SEND_TEXT

def setNUM_LOOP(numArgs):
  global NUM_LOOP
  NUM_LOOP = numArgs

def getNUM_LOOP(numArgs):
  return numArgs

def readConfigSettings(numArgs):
  return numArgs

def outputFile(Args):
  f=open("torchat/buddy-list.txt", "a+")
  f.write(Args + "\r\n")


def BFCDefaultFunc(DEBUG, DISTANCE, OUTPUTFILE, INPUTTEXTFILE, CHECKHISTORY, WRITEHISTORY, STATUSFILE):
    setDEBUG(DEBUG.strip())
    setDISTANCE(DISTANCE)

    now = datetime.datetime.now()
    print "--- BUMP BEGINS AT " + str(now.year) + ":" + str(now.month) + ":" + str(now.day) + ":" + str(now.hour) + ":" + str(now.minute) + ":" + str(now.second) + "---"

    g=open("status.txt", "w")
    g.write("Touch your phones")
    g.close()

    if INPUTTEXTFILE:
        setSEND_TEXT(open(INPUTTEXTFILE, "r").read())

    print "[" + __file__ + "] "+ "Beginning BUMP.Api"
    s = bumpCycle()
    s.run()

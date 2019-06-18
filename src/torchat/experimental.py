import ast, os

class BuddyHashProperties:
    def __init__(self):
        if (self.is_non_zero_file('buddy-chatProperties.txt') == False):
            print 'Working'
            self.initPropertiesHash()

    def is_non_zero_file(self, fpath):
        return os.path.isfile(fpath) and os.path.getsize(fpath) > 0

    def initPropertiesHash(self):
        data = dict()
        file = open('buddy-list.txt', "r")
        buffer = file.read()
        #d['mynewkey'] = 'mynewvalue'
        for i in range(0, len(buffer.split('\n')) - 1):
            data[buffer.split('\n')[i].split(' ')[0]] = 0
        file = open('buddy-chatProperties.txt', "w")
        file.write(str(data))

    def updateHashBuddies(self):
        newdata = dict()
        file = open('buddy-list.txt', "r")
        buffer = file.read()
        b_len = 0
        for i in range(0, len(buffer.split('\n')) - 1):
            newdata[buffer.split('\n')[i].split(' ')[0]] = 0
            b_len = i
        print newdata

        olddata = self.getHash()
        print olddata

        for key in newdata:
            print key
            if key in olddata:
                print 'It is in'
            else:
                print 'Nope'
                olddata[key] = 0
                print olddata

        file = open('buddy-chatProperties.txt', "w")
        file.write(str(olddata))

    def incHash(self, id):
        data = dict()
        file = open('buddy-chatProperties.txt', "r")
        data = ast.literal_eval(file.read())
        data[id] = data[id] + 1
        file = open('buddy-chatProperties.txt', "w")
        file.write(str(data))

    def getHash(self):
        data = dict()
        file = open('buddy-chatProperties.txt', "r")
        data = ast.literal_eval(file.read())
        return data

    def getHashID(self, id):
        data = dict()
        file = open('buddy-chatProperties.txt', "r")
        data = ast.literal_eval(file.read())
        return data[id]


#Update functions
import json
text = '{"sender":"c5bi537lv2oypooy","reciever":"c5bi537lv2oypooy","textValue":"gucci","textType":"SimpleMessage","chatID":" 7"}'

#try:
d = json.loads(text)
if (d['textType'] == 'SimpleMessage'):
    x = BuddyHashProperties()
    print d['textType']
    print int(d['chatID'])
    print x.getHashID(d['reciever'])
    if (int(d['chatID']) >= x.getHashID(d['reciever'])):
        try:
            print "(2) out-connection sending buffer"
        except:
            print "(2) out-connection send error"

#except:
#    print 'SENDING PING'

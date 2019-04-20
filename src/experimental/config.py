class config():
    def __init__(self):
        try:
            with open("config.txt","r") as fi:
                id = []
                for ln in fi:
                    if ln.startswith("[o]"):
                        id.append(ln[3:-1])
            self.DEBUG = id[0].split("=")[1]
            self.DISTANCE = id[1].split("=")[1]
            self.OUTPUTFILE = id[2].split("=")[1]
            self.INPUTTEXTFILE = id[3].split("=")[1]
            self.CHECKHISTORY = id[4].split("=")[1]
            self.WRITEHISTORY = id[5].split("=")[1]
            self.STATUSFILE = id[6].split("=")[1]
        except:
            self.DEBUG = 'FALSE'
            self.DISTANCE = '20'
            self.OUTPUTFILE = 'output.txt'
            self.INPUTTEXTFILE = 'input.txt'
            self.CHECKHISTORY = 'FALSE'
            self.WRITEHISTORY = 'FALSE'
            self.STATUSFILE = 'FALSE'

                        try:
                            d = json.loads(text.split('message ')[1])
                            if (d['textType'] == 'SimpleMessage' or d['textType'] == 'Status'):
                                currentsession = tuple(open('currentSession.txt', 'r'))
                                print currentsession
                                if text not in currentsession:
                                    try:
                                        print 'Comparision done, sending'
                                        print "(2) %s out-connection sending buffer" % self.address
                                        self.socket.send(text)
                                        file = open('currentSession.txt', "a")
                                        file.write(text)
                                    except:
                                        print "(2) out-connection send error"
                                        self.bl.onErrorOut(self)
                                        self.close()
                        except Exception as e:
                            print 'SENDING3: ' + text + ' to ' + self.address
                            global PINGSOUTGOING
                            PINGSOUTGOING = PINGSOUTGOING + 1
                            if PINGSOUTGOING >= MAXPINGS:
                                print 'Clearing!'
                                dash = open('currentPings.txt', "w")
                                dash.write('')
                                PINGSOUTGOING = 0

                            line = text
                            if line.split(' ')[0] == 'ping':
                                pingfrom = line.split(' ')[1]
                                currentPings = open('currentPings.txt', "r")
                                l = currentPings.read()
                                currentPings.close()
                                print l
                                if pingfrom not in l:
                                    dash = open('currentPings.txt', "a")
                                    dash.write(pingfrom + "\n")
                                    try:
                                        print "(2) %s out-connection sending buffer" % self.address
                                        self.socket.send(text)
                                        print 'Sent the ping'
                                    except:
                                        print "(2) out-connection send error"
                                        self.bl.onErrorOut(self)
                                        self.close()
                                else:
                                    pass

                    except Exception as e:
                        try:
                            print "(2) %s out-connection sending buffer" % self.address
                            self.socket.send(text)
                        except:
                            print "(2) out-connection send error"
                            self.bl.onErrorOut(self)
                            self.close()

                        print 'Done sending'

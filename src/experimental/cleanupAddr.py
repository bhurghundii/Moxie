
class CleanADDR:
    def lateClean():
        cleanedUpLog = ""
        f = open('historyaddresses.txt', 'r')
        #We aren't too concerned with order to be frank
        cleanedUpLog = list(set(f.readlines()))
        f.close()

        print cleanedUpLog

        with open('historyaddresses.txt', 'w') as f:
         for item in cleanedUpLog:
                f.write("%s" % item)

    def ontimeClean(ADDR):
        list(set(ADDR))

        print cleanedUpLog

        with open('historyaddresses.txt', 'w') as f:
         for item in cleanedUpLog:
                f.write("%s" % item)

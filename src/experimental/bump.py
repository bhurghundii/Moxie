import bump_experiment
import config

if __name__ == '__main__':

    l = config.config()
    print l.DEBUG, l.DISTANCE, l.OUTPUTFILE, l.INPUTTEXTFILE, l.CHECKHISTORY, l.WRITEHISTORY, l.STATUSFILE
    #bump_experiment.BFCDefaultFunc(l.DEBUG, l.DISTANCE, l.OUTPUTFILE, l.INPUTTEXTFILE, l.CHECKHISTORY, l.WRITEHISTORY, l.STATUSFILE)

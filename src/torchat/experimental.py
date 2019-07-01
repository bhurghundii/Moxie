line = 'ping c34fhyw2fz33iqft 101879117728266560207218866833999398359899467618003856140581111745272199517420'
if line.split(' ')[0] == 'ping':
    pingfrom = line.split(' ')[1]
    addbuffer = open('AddBuffer.txt', "r")
    l = addbuffer.read().split('\n')
    toRemove = []
    for text in l:
        if pingfrom not in text and text != '':
            toRemove.append(text)
    print toRemove

    addbuffer = open('AddBuffer.txt', "w")
    for line in toRemove:
        addbuffer.write(line + "\n")

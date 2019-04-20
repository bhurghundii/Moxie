from selfModDES import des
import os

os.chdir("..")



f = open('historyaddresses.txt','r')
string = ""
while 1:
    line = f.readline()
    if not line:break
    string += line

f.close()


print string



key = "secret_k"
text= string
d = des()
ciphered = d.encrypt(key,text)
plain = d.decrypt(key,ciphered)
print "Ciphered: %r" % ciphered
print "Deciphered: ", plain

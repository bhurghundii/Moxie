import tc_client

addressParam = 'TESTTESTTESTTEST'
address = addressParam
if len(address) != 16:
    l = len(address)
    return

for c in address:
    if c not in "234567abcdefghijklmnopqrstuvwxyz":
        return

if self.buddy is None:
    buddy = tc_client.Buddy(address,
                  self.bl,
                  self.txt_name.GetValue())
    res = self.bl.addBuddy(buddy)
    if res == False:
        print 'They are here'
    else:
        if self.txt_intro.GetValue() <> "":
            buddy.storeOfflineChatMessage('TEST')
else:
    address_old = self.buddy.address
    offline_file_name_old = self.buddy.getOfflineFileName()
    self.buddy.address = address
    offline_file_name_new = self.buddy.getOfflineFileName()
    self.buddy.name = self.txt_name.GetValue()
    self.bl.save()
    if address != address_old:
        self.buddy.disconnect()
        try:
            os.rename(offline_file_name_old, offline_file_name_new)
        except:
            pass

# -*- coding: UTF-8 -*-

##############################################################################
#                                                                            #
# Copyright (c) 2007-2010 Bernd Kreuss <prof7bit@gmail.com>                  #
#                                                                            #
# This program is licensed under the GNU General Public License V3,          #
# the full source code is included in the binary distribution.               #
#                                                                            #
# Included in the distribution are files from other open source projects:    #
# - TOR Onion Router (c) The Tor Project, 3-clause-BSD                       #
# - SocksiPy (c) Dan Haim, BSD Style License                                 #
# - Gajim buddy status icons (c) The Gajim Team, GNU GPL                     #
#                                                                            #
##############################################################################

# this is a graphical User interface for the TorChat client library.

import config
import tc_client
import sys
import os
import shutil
import time
import subprocess
import textwrap
import version
import translations

lang = translations.lang_en
tb = config.tb
tb1 = config.tb1

ICON_NAMES = {tc_client.STATUS_OFFLINE : "offline.png",
              tc_client.STATUS_ONLINE : "online.png",
              tc_client.STATUS_HANDSHAKE : "connecting.png",
              tc_client.STATUS_AWAY : "away.png",
              tc_client.STATUS_XA : "xa.png"}

_icon_images = {} #this is a cache for getStatusBitmap()


class MainWindow():
    def __init__(self, socket=None):

        self.conns = []
        self.chat_windows = []
        self.buddy_list = tc_client.BuddyList(self.callbackMessage, socket)

        print "TorChat: %s" % config.getProfileLongName()


        #Turns out the GUI is actually kinda useful so we'll just keep it hidden. May be good for debug

        #if not config.getint("gui", "open_main_window_hidden"):
            #self.Show()

    def setStatus(self, status):
        self.buddy_list.setStatus(status)
        self.taskbar_icon.showStatus(status)

    def callbackMessage(self, callback_type, callback_data):
        #we must always use wx.CallAfter() to interact with
        #the GUI-Thread because this method will be called
        #in the context of one of the connection threads

        if callback_type == tc_client.CB_TYPE_CHAT:
            buddy, message = callback_data
            for window in self.chat_windows:
                if window.buddy == buddy:
                    return
            #no window found, so we create a new one

            #we let this thread block until the window
            #shows up in our chat window list
            found = False
            while not found:
                time.sleep(1)
                for window in self.chat_windows:
                    if window.buddy == buddy:
                        found = True
                        break

        if callback_type == tc_client.CB_TYPE_OFFLINE_SENT:
            buddy = callback_data
            for window in self.chat_windows:
                if window.buddy == buddy:
                    return

            hidden = config.getint("gui", "open_chat_window_hidden")

        if callback_type == tc_client.CB_TYPE_FILE:
            #this happens when an incoming file transfer was initialized
            #we must now create a FileTransferWindow and return its
            #event handler method to the caller
            receiver = callback_data
            buddy = receiver.buddy
            file_name = receiver.file_name





    def onClose(self, evt):
        self.Show(False)

    def exitProgram(self):
        w,h = self.GetSize()
        config.set("gui", "main_window_width", w)
        config.set("gui", "main_window_height", h)
        found_unread = False
        for window in self.chat_windows:
            if not window.IsShown() or window.unread:
                found_unread = True
                break

        if found_unread:
            answer = wx.MessageBox(lang.D_WARN_UNREAD_MESSAGE,
                                   lang.D_WARN_UNREAD_TITLE,
                                   wx.YES_NO|wx.NO_DEFAULT)

            if answer == wx.NO:
                return

        self.taskbar_icon.RemoveIcon()
        self.buddy_list.stopClient() #this will also stop portable Tor

        # All my threads wouldn't join properly. Don't know why.
        # sys.exit() would spew lots of tracebacks *sometimes*,
        # so let's do it the easy way and just kill ourself:
        config.killProcess(os.getpid())

#!/bin/sh

trap 'kill -15 `cat tor.pid`' 15

export PATH=$PATH:/usr/sbin

echo '|torsh|'$$ >> '../pid-torchat.txt'

tor -f torrc.txt --PidFile tor.pid &

wait

#!/bin/bash
cd ..
echo "You are creating a executable build for Linux WITH building Python files"
echo "We will be wiping and resetting MOXIE "
read -p 'Proceed? Type [y]: ' proceedVar

if [ "$proceedVar" == 'y' ]; then

  echo "Resetting MOXIE. Reset Python script won't be built but will use JS version instead"
  python resetMoxie.py

  echo "Packaging Node modules and MOXIE"
  npm run package-linux

  echo "Building Python"
  pyinstaller bump.py

  sed -i 's/0/1/g' MoxieFlags.config
  cp MoxieFlags.config ../release-builds/Moxie-App-linux-x64/MoxieFlags.config
  sed -i 's/1/0/g' MoxieFlags.config

  cp config.txt dist/config.txt

  cp -R build ../release-builds/Moxie-App-linux-x64/build
  cp -R dist ../release-builds/Moxie-App-linux-x64/dist
  rm -rf build
  rm -rf dist

  echo "Building Torchat"
  cd torchat
  pyinstaller torchat.py
  cp changelog.txt dist/torchat/changelog.txt
  cp LICENSE dist/torchat/LICENSE
  cp portable.txt dist/torchat/portable.txt
  cp torchat.spec dist/torchat/torchat.spec
  cp torchat_linux.spec dist/torchat/torchat_linux.spec
  cp torchatready.txt dist/torchat/torchatready.txt
  cp torchat_windows.spec dist/torchat/torchat_windows.spec
  cp -R Tor dist/torchat/Tor
  cp -R translations dist/torchat/translations
  cp -R doc dist/torchat/doc
  cp -R icons dist/torchat/icons
  cp -R bin dist/torchat/bin
  cp -R SocksiPy dist/torchat/SocksiPy

  mkdir -p ../../release-builds/Moxie-App-linux-x64/torchat
  cp -R dist ../../release-builds/Moxie-App-linux-x64/torchat/dist
  cp -R build ../../release-builds/Moxie-App-linux-x64/torchat/build
  rm -rf build
  rm -rf dist

fi

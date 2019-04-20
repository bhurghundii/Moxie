#!/bin/bash
cd ..
echo "You are creating a executable build for Windows WITH building Python files"
echo "We will be wiping and resetting MOXIE "
read -p 'Proceed? Type [y]: ' proceedVar
if [ "$proceedVar" == 'y' ]; then

  echo "Resetting MOXIE. Reset Python script won't be built but will use JS version instead"
  python resetMoxie.py

  echo "Packaging Node modules and MOXIE"
  npm run package-win

  echo "Building Python"

  wine ~/.wine/drive_c/Python27/Scripts/pyinstaller.exe --onefile bump.py
  cp config.txt dist/config.txt

  sed -i 's/0/2/g' MoxieFlags.config
  cp MoxieFlags.config ../release-builds/Moxie-App-win32-ia32/MoxieFlags.config
  sed -i 's/2/0/g' MoxieFlags.config


  cp -R build ../release-builds/Moxie-App-win32-ia32/build
  cp -R dist ../release-builds/Moxie-App-win32-ia32/dist

  rm -rf build
  rm -rf dist

  cd torchat
  wine ~/.wine/drive_c/Python27/Scripts/pyinstaller.exe --onefile torchat.py

  cp portable.txt dist/portable.txt
  cp -R bin/Tor dist/Tor

  mkdir -p ../../release-builds/Moxie-App-win32-ia32/torchat
  cp -R dist ../../release-builds/Moxie-App-win32-ia32/torchat/dist
  cp -R build ../../release-builds/Moxie-App-win32-ia32/torchat/build
  rm -rf build
  rm -rf dist


fi

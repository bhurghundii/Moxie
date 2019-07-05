cd ..

Write-Host "You are creating a executable build for Windows WITH building Python files"
Write-Host "We will be wiping and resetting MOXIE "

$Proceed = Read-Host -Prompt "Proceed? [y/n]"

if($Proceed -eq "y")
{
  Write-Host "Resetting MOXIE. Reset Python script won't be built but will use JS version instead"
  python resetMoxie.py

  Write-Host "Packaging Node modules and MOXIE"
  npm run package-win

  Write-Host "Building Python"

  (Get-Content MoxieFlags.config).replace('0', '2') | Set-Content MoxieFlags.config
  Copy-Item -Path MoxieFlags.config -Destination ../release-builds/Moxie-App-win32-ia32/MoxieFlags.config

  cd torchat
  pyinstaller --onefile torchat.py

  Copy-Item -Path portable.txt -Destination dist/portable.txt
  Copy-Item -Path bin/Tor -Destination dist/Tor

  New-Item -Path ../../release-builds/Moxie-App-win32-ia32/torchat -ItemType Directory
  
  cp -R dist ../../release-builds/Moxie-App-win32-ia32/torchat/dist
  cp -R build ../../release-builds/Moxie-App-win32-ia32/torchat/build
  
}
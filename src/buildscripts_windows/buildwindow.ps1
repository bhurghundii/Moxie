
# Check Installations
$python_version = py --version;
$npm_version = npm --version;
"
    -------------------------------------------------
	                      MOXIE
	(https://github.com/BurgundyIsAPublicEnemy/Moxie)
	-------------------------------------------------

	[Python] $python_version
	[npm]    $npm_version

	-------------------------------------------------
"
sleep 1
"
	              **READ THIS CAREFULLY**
	You are creating a executable build for Windows
	WITH building Python files. We will be wiping and
	resetting MOXIE.
	
	Are you sure you would like to reset MOXIE?
	Type ""MOXIE"" to continue.
"
$flag_reset_moxie = Read-Host ::
if($flag_reset_moxie -eq "MOXIE")
{
	"
	Clearing MOXIE.
	Reset Python script won't be built but will use
	JS version instead.
	"
	py ../resetMoxie.py
	"
	Packaging Node modules and MOXIE
	"
	npm run ../package-win
	"
	Building Python
	"

	(Get-Content ../MoxieFlags.config).replace('0', '2') | Set-Content ../MoxieFlags.config
	Copy-Item -Path ../MoxieFlags.config -Destination ../../release-builds/Moxie-App-win32-ia32/MoxieFlags.config

	pyinstaller --onefile ../torchat/torchat.py

	Copy-Item -Path ../torchat/portable.txt -Destination dist/portable.txt
	Copy-Item -Path ../torchat/bin/Tor -Destination ../torchat/dist/Tor

	New-Item -Path ../../release-builds/Moxie-App-win32-ia32/torchat -ItemType Directory
  
	cp -R dist ../../release-builds/Moxie-App-win32-ia32/torchat/dist
	cp -R build ../../release-builds/Moxie-App-win32-ia32/torchat/build
  
}
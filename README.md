# Moxie
The Anti-Social Network 

## License for Moxie and Torchat
GPLv3 GNU General Public License
For more information: https://www.gnu.org/licenses/gpl-3.0.en.html

## Installation
1) Either download the project as .zip or
```
git clone https://github.com/BurgundyIsAPublicEnemy/Moxie/edit/master/README.md
```

### Step 2 is for Linux users
2) Download Tor

```
sudo apt-get install tor
```

There are plans to change this, or to package a Linux binary in the package like the Windows version does and this may change if this is done.

3) To start the development build, open command prompt / terminal and CD into the src directory of Moxie and run

```
npm start
```

### Please note: this ONLY works for Linux right now. 

To develop on Windows, make sure your system supports Bash (Cygwin for example) and use:

```
npm run package-win
```

Which will create a Windows build for you to test your changes on. This will be fixed later and is a workaround.


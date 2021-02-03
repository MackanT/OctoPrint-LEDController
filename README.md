# OctoPrint-Ledcontroller

Allows for controll of a regular 12V RGB-LED Strip through the Octoprint interface.

See setup for additional configuration (SW+HW) needed to use this package!

## Setup

Install via the bundled [Plugin Manager](https://docs.octoprint.org/en/master/bundledplugins/pluginmanager.html)
or manually using this URL:

    https://github.com/MackanT/OctoPrint-Ledcontroller/archive/main.zip

# Software

This package requires the PIGPIO package -- https://pypi.org/project/pigpio/ -- use: "pip install pigpio" and to also add it to the list of auto-runnables on the RPI. This can for example be done through the code: 

sudo nano /etc/rc.local

And then on the last line (just above "exit 0") add "sudo pigpiod", now just save and exit. If you do not want to restart your Pi to have it initiate pigpio automatically, just type "sudo pigpiod".

# Hardware


**TODO:** Describe how to install your plugin, if more needs to be done than just installing it via pip or through
the plugin manager.

## Configuration

Lets user to via software set which GPIO-PINS are used for the controll of the Reg, Green and Blue respective data lines.

**TODO:** Add option for user to add efects to indicate printer events

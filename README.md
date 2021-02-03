# OctoPrint-Ledcontroller

Allows for controll of a regular 12V RGB-LED Strip through the Octoprint interface.

See setup for additional configuration (SW+HW) needed to use this package!

## Setup

Install via the bundled [Plugin Manager](https://docs.octoprint.org/en/master/bundledplugins/pluginmanager.html)
or manually using this URL:

    https://github.com/MackanT/OctoPrint-Ledcontroller/archive/main.zip

### Software

This package requires the PIGPIO package -- https://pypi.org/project/pigpio/ -- 
Use: "pip install pigpio" and to also add it to the list of auto-runnables on the RPI. 

This can for example be done through SSH into the RPI and then typing the command: 

> sudo nano /etc/rc.local

![RC Local](https://github.com/MackanT/OctoPrint-LEDController/blob/main/guide/rc_local.png?raw=true)

On the last line (just above "exit 0") add "sudo pigpiod" than save and exit, see above image. 
If you do not want to restart your Pi to have it initiate pigpio manually just this first time through typing `<sudo pigpiod>` into the terminal

### Hardware

** Disclaimer **
I am in no way shape or form an electro engineer, nor do I have any qualifications within electronics more than your average Joe that can use google to find solutions to my electronics needs - proceed on your own risk.

Needed Hardware -

* 3 N-Channel Mosfets (I believe almost all *regular* N-Channels will suffice, but I am no Electro Engineer, so I am not fullt sure)
* 12V DC Supply (I personally rigged it to my 12V Printers Power Supply) 
* 12V RGB LED-STRIP
* Wires
* Perfboard/Equivalent
* (Optional) 1x4 Pin-Header Male/Female

In the image the R, G and B cables that connect to the RPI can be connected to almost any PIN, as this is later configurable in software. However, I used GPIO17, 27, 22 as they are all next to each other and they are also next to a ground pin, thus it is rather easy to get a 1x4-Pin-Header to connect R, G, B and Ground pins to the RPI.

![Wiring Schematic](https://github.com/MackanT/OctoPrint-LEDController/blob/main/guide/rPi_schematic.png?raw=true)

As can be seen in the image, the connectors from the RPI go into the *Source* pin of the Mosfet, and common ground from you power supply goes into the *Drain*. Connect the *Gate* pin to your LED-Strips respective R, G and B pin. Also connect your 12V DC directly to the LED-Strips 12V pin.

## Configuration

GPIO-PINS utilized for the Red, Green and Blue data lines can be configured within software.

**TODO:** Add option for user to add efects to indicate printer events

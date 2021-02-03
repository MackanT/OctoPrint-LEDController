# OctoPrint-Ledcontroller

Allows for controll of a regular 12V RGB-LED Strip through the Octoprint interface.

See setup for additional configuration (SW+HW) needed to use this package!

## Setup

Install via the bundled [Plugin Manager](https://docs.octoprint.org/en/master/bundledplugins/pluginmanager.html)
or manually using this URL:

    https://github.com/MackanT/OctoPrint-Ledcontroller/archive/main.zip

### Software

This package requires the PIGPIO package -- https://pypi.org/project/pigpio/ -- 
> pip install pigpio
 
After installing Pigpio, add it to your Pi's auto-boot sequence. For example by SSH into your Pi and typing the command: 

> sudo nano /etc/rc.local

On the last line (just above "exit 0") add `<sudo pigpiod>` then save and exit, see below image. 
If you do not want to restart your Pi at this time you can start pigpiod manually by typing `<sudo pigpiod>` into the terminal.

![RC Local](https://github.com/MackanT/OctoPrint-LEDController/blob/main/guide/rc_local.png?raw=true)

### Hardware

**Disclaimer:**
I am in no way shape or form an electro engineer, nor do I have any qualifications within electronics more than your average Joe that can use google to find solutions to my electronics needs - proceed at your own risk.

__Utilized Hardware -__ 

* 3 N-Channel Mosfets (I believe all *regular* N-Channels will suffice, but I am no Electro Engineer, so I am not sure)
* 12V DC Supply (I personally connected it to my 12V Printers Power Supply) 
* 12V RGB LED-STRIP
* Wires
* Perfboard/Equivalent
* (Optional) 1x4 Pin-Header Male/Female

In the image the R, G and B cables that connect to the RPI can be connected to almost any GPIO PIN, as this is later configurable in software. 

I personally used GPIO17, GPIO27 and GPIO22 as they are all located next to a ground pin, thus it is rather easy to get a 1x4-Pin-Header to connect R, G, B and Ground pins to the RPI. The R, G and B in the image represent the respective, *R*ed, *G*reen and *B*lue data lines that go through the Mosfet and into the LED-Strip.

![Wiring Schematic](https://github.com/MackanT/OctoPrint-LEDController/blob/main/guide/rPi_schematic.png?raw=true)

**TODO:** Add more representive wiring diagram.

The connectors from the RPI go into the *Source* pin of the Mosfet, and the common ground from you power supply goes into the *Drain*, lastly the *Gate* pin connects to your LED-Strips respective R, G and B pads. Also connect your 12V DC directly to the LED-Strips 12V pad.

## Configuration

GPIO-PINS utilized for the Red, Green and Blue data lines can be configured within software.

**TODO:** Add option for user to add efects to indicate printer events

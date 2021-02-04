# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

import octoprint.plugin

import pigpio
import flask
pi = pigpio.pi()

class LEDControllerPlugin(octoprint.plugin.StartupPlugin, 
                          octoprint.plugin.TemplatePlugin,
                          octoprint.plugin.SettingsPlugin,
                          octoprint.plugin.AssetPlugin,
                          octoprint.plugin.SimpleApiPlugin):

    
    def get_settings_defaults(self):
        return dict(
            red_pin = 27,
            green_pin = 17,
            blue_pin = 22,
            red_strength = 255,
            green_strength = 255,
            blue_strength = 255,
            light_on = True
        )

    def get_template_configs(self):
        return [
            dict(type='settings', custom_bindings=False),
            dict(type='navbar', custom_bindings=False),
            dict(type='tab', custom_bindings=False)
        ]

    def on_after_startup(self):

        self._logger.info('--------------------------------------------------')
        self._logger.info('LEDController Initiated, Awaiting User Inputs')
        self._logger.info('Red Pin: {}, Green Pin: {}, Blue Pin: {}'.format(
                                            self._settings.get(['red_pin']), 
                                            self._settings.get(['green_pin']), 
                                            self._settings.get(['blue_pin'])))
        self._logger.info('--------------------------------------------------')
        self.set_colors()

    def set_colors(self):
        if self._settings.get(['light_on']):
            # pi.set_PWM_dutycycle(int(self._settings.get(['red_pin'])), 
            #                      int(self._settings.get(['red_strength'])))
            # pi.set_PWM_dutycycle(int(self._settings.get(['green_pin'])), 
            #                      int(self._settings.get(['green_strength'])))
            # pi.set_PWM_dutycycle(int(self._settings.get(['blue_pin'])), 
            #                      int(self._settings.get(['blue_strength'])))
            self._logger.info('Colors Set To: {} {} {}'.format(
                                    self._settings.get(['red_strength']), 
                                    self._settings.get(['green_strength']), 
                                    self._settings.get(['blue_strength'])
        ))
        else:
            # pi.set_PWM_dutycycle(int(self._settings.get(['red_pin'])), 0)
            # pi.set_PWM_dutycycle(int(self._settings.get(['green_pin'])), 0)
            # pi.set_PWM_dutycycle(int(self._settings.get(['blue_pin'])), 0)
            self._logger.info('Lights Disabled')

    def get_api_commands(self):
        return dict(
            color_set=[]
        )

    # Toggle Button, On/Off
    def on_api_get(self, request):
        new_state = not(self._settings.get(['light_on']))
        self._settings.set(['light_on'], new_state)
        self.set_colors()

    def on_api_command(self, command, data):
        
        if command == "color_set":
            self._settings.set(['red_strength'], data.get('red'))
            self._settings.set(['green_strength'], data.get('green'))
            self._settings.set(['blue_strength'], data.get('blue'))
            self._settings.set(['light_on'], data.get('state'))
            self.set_colors()


    def get_assets(self):
        return dict(
            js=['js/LEDController.js'],
            css=['css/LEDController.css']
        )

__plugin_name__ = 'LED Controller'
__plugin_pythoncompat__ = '>=2.7,<4'
__plugin_implementation__ = LEDControllerPlugin()
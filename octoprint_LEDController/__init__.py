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

    def on_after_startup(self):

        self._logger.info('--------------------------------------------------')
        self._logger.info('LEDController Initiated, Awaiting User Inputs')
        self._logger.info('Red Pin: {}, Green Pin: {}, Blue Pin: {}'.format(
                                            self._settings.get(['red_pin']), 
                                            self._settings.get(['green_pin']), 
                                            self._settings.get(['blue_pin'])))
        self._logger.info('--------------------------------------------------')

        # Initializing Pin States to On
        if bool(self._settings.get(['light_on'])):
            self.set_colors()

    def get_settings_defaults(self):
        return dict(
            red_pin = 17,
            green_pin = 27,
            blue_pin = 22,
            red_strength = 255,
            green_strength = 255,
            blue_strength = 255,
            light_on = True
        )

    def get_template_configs(self):
        return [
            dict(type='settings', custom_bindings=False),
            dict(type='navbar', custom_bindings=False)
            # dict(type='tab', custom_bindings=False) # Return in a future iteration?
        ]

    def set_colors(self):
        if self._settings.get(['light_on']):
            # pi.set_PWM_dutycycle(self._settings.get(['red_pin']), 
            #                      self._settings.get(['red_strength']))
            # pi.set_PWM_dutycycle(self._settings.get(['green_pin']), 
            #                      self._settings.get(['green_strength']))
            # pi.set_PWM_dutycycle(self._settings.get(['blue_pin']), 
            #                      self._settings.get(['blue_strength']))
            self._logger.info('Colors Set To: {} {} {}'.format(
                                    self._settings.get(['red_strength']), 
                                    self._settings.get(['green_strength']), 
                                    self._settings.get(['blue_strength'])
        ))
        else:
            # pi.set_PWM_dutycycle(self._settings.get(['red_pin']), 0)
            # pi.set_PWM_dutycycle(self._settings.get(['green_pin']), 0)
            # pi.set_PWM_dutycycle(self._settings.get(['blue_pin']), 0)
            self._logger.info('Lights Disabled')

    def on_api_get(self, request):
            self.set_colors()

    def get_assets(self):
        return dict(
            js=['js/LEDController.js'],
            css=['css/LEDController.css']
            #less=['less/LEDController.less']
        )

__plugin_name__ = 'LED Controller'
__plugin_pythoncompat__ = '>=2.7,<4'
__plugin_implementation__ = LEDControllerPlugin()
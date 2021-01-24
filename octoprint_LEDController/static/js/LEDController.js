$(function() {
    function LEDControllerViewModel(parameters) {
        var self = this;

        var colorInput = document.getElementById("clrPicker");
        var rInput = document.getElementById("red_str");
        var gInput = document.getElementById("green_str");
        var bInput = document.getElementById("blue_str");

        colorInput.addEventListener("input", updateColorNum);
        rInput.addEventListener("change", updateColorWheel);
        gInput.addEventListener("change", updateColorWheel);
        bInput.addEventListener("change", updateColorWheel);

        self.settings = parameters[0];

        // this will hold the values currently displayed
        self.r_val = ko.observable();
        self.g_val = ko.observable();
        self.b_val = ko.observable();

        function updateColorNum() {
            hex = colorInput.value;
            self.r_val = hexToRgb(hex).r;
            self.g_val = hexToRgb(hex).g;
            self.b_val = hexToRgb(hex).b;
            self.setColor();
        }
        
        function updateColorWheel() {
            self.r_val = Number(rInput.value);
            if (self.r_val > 255){self.r_val = 255}
            if (self.r_val < 0){self.r_val = 0}
            self.g_val = Number(gInput.value);
            if (self.g_val > 255){self.g_val = 255}
            if (self.g_val < 0){self.g_val = 0}
            self.b_val = Number(bInput.value);
            if (self.b_val > 255){self.b_val = 255}
            if (self.b_val < 0){self.b_val = 0}
            self.setColor();
        }

        // this will be called when the user clicks the "Set Color" button
        self.setColor = function() {

            document.getElementById('red_str').value = self.r_val;
            document.getElementById('green_str').value = self.g_val;
            document.getElementById('blue_str').value = self.b_val;
            document.getElementById('clrPicker').value = rgbToHex(self.r_val, self.g_val, self.b_val);

        };

        function rgbToHex(r, g, b) {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
          }

        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }  

        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            } : null;
          }          

        // This will get called before the HelloWorldViewModel gets bound to the DOM, but after its
        // dependencies have already been initialized. It is especially guaranteed that this method
        // gets called _after_ the settings have been retrieved from the OctoPrint backend and thus
        // the SettingsViewModel been properly populated.
        self.onBeforeBinding = function() {
            self.r_val = self.settings.settings.plugins.LEDController.red_strength();
            self.g_val = self.settings.settings.plugins.LEDController.green_strength();
            self.b_val = self.settings.settings.plugins.LEDController.blue_strength();
            self.setColor();
        }
    }

    // This is how our plugin registers itself with the application, by adding some configuration
    // information to the global variable OCTOPRINT_VIEWMODELS
    OCTOPRINT_VIEWMODELS.push([
        // This is the constructor to call for instantiating the plugin
        LEDControllerViewModel,

        // This is a list of dependencies to inject into the plugin, the order which you request
        // here is the order in which the dependencies will be injected into your view model upon
        // instantiation via the parameters argument
        ['settingsViewModel'],

        // Finally, this is the list of selectors for all elements we want this view model to be bound to.
        // ['#tab_plugin_LEDController']
        [document.getElementById("tab_plugin_LEDController")]
    ]);
});
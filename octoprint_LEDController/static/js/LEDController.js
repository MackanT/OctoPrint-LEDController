$(function() {
    function LEDControllerViewModel(parameters) {
        var self = this;

        // listeners to detect changes in the inputted values.
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

        // Updates numbs when color wheel has been used
        function updateColorNum() {
            hex = colorInput.value;
            self.r_val = hexToRgb(hex).r;
            self.g_val = hexToRgb(hex).g;
            self.b_val = hexToRgb(hex).b;
            self.setColor();
        }
        
        // Updates colorwheel when numbs have been used
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

        // converts r,g,b to hex value
        function rgbToHex(r, g, b) {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
          }
        
        // converts individual 0-255 to hex
        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }  

        // converts hex to rgb values, call with hexToRgb.? / ? = r,g,b
        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            } : null;
          }          
        
        // Initiate setting values with current values
        self.onBeforeBinding = function() {
            self.r_val = self.settings.settings.plugins.LEDController.red_strength();
            self.g_val = self.settings.settings.plugins.LEDController.green_strength();
            self.b_val = self.settings.settings.plugins.LEDController.blue_strength();
            self.setColor();
        }
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: LEDControllerViewModel,
        dependencies: ['settingsViewModel'],
        elements: ["#settings_plugin_LEDController"],
    });
});
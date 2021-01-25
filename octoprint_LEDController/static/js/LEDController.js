$(function() {
    function LEDControllerViewModel(parameters) {
        var self = this;

        // listeners to detect changes in the inputted values.
        var color_input = document.getElementById("hex_str");
        var r_input = document.getElementById("red_str");
        var g_input = document.getElementById("green_str");
        var b_input = document.getElementById("blue_str");

        color_input.addEventListener("input", update_color_num_input);
        r_input.addEventListener("change", update_color_wheel_input);
        g_input.addEventListener("change", update_color_wheel_input);
        b_input.addEventListener("change", update_color_wheel_input);

        self.settings = parameters[0];

        // this will hold the values currently displayed
        self.r_val = ko.observable();
        self.g_val = ko.observable();
        self.b_val = ko.observable();

        // Updates numbs when color wheel has been used
        function update_color_num_input() {
            hex = color_input.value;
            self.r_val = hex_to_rgb(hex).r;
            self.g_val = hex_to_rgb(hex).g;
            self.b_val = hex_to_rgb(hex).b;
            self.set_color();
        }
        
        // Updates colorwheel when numbs have been used
        function update_color_wheel_input() {
            self.r_val = parseInt(r_input.value, 10);
            if (self.r_val > 255){self.r_val = 255}
            if (self.r_val < 0){self.r_val = 0}
            
            self.g_val = parseInt(g_input.value, 10);
            if (self.g_val > 255){self.g_val = 255}
            if (self.g_val < 0){self.g_val = 0}
            
            self.b_val = parseInt(b_input.value, 10);
            if (self.b_val > 255){self.b_val = 255}
            if (self.b_val < 0){self.b_val = 0}

            self.set_color();
        }

        // called when the user clicks the "Set Color" button
        self.set_color = function() {
            document.getElementById('red_str').value = self.r_val;
            document.getElementById('green_str').value = self.g_val;
            document.getElementById('blue_str').value = self.b_val;
            document.getElementById('hex_str').value = rgb_to_hex(self.r_val, self.g_val, self.b_val);
        };

        // converts r,g,b to hex value
        function rgb_to_hex(r, g, b) {
            return "#" + component_to_hex(r) + component_to_hex(g) + component_to_hex(b);
          }
        
        // converts individual 0-255 to hex
        function component_to_hex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }  

        // converts hex to rgb values, call with hex_to_rgb.? // ? = r,g,b
        function hex_to_rgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            } : null;
          }          
        
        // Initiate setting values with current values
        self.onBeforeBinding = function() {
            self.r_val = Number(self.settings.settings.plugins.LEDController.red_strength());
            self.g_val = Number(self.settings.settings.plugins.LEDController.green_strength());
            self.b_val = Number(self.settings.settings.plugins.LEDController.blue_strength());
            self.set_color();
        }
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: LEDControllerViewModel,
        dependencies: ['settingsViewModel'],
        elements: ["settings_plugin_LEDController"],
    });
});
$(function() {
    function LEDControllerViewModel(parameters) {
        var self = this;

        self.settings = parameters[0];

        // this will hold the values currently displayed
        self.r = ko.observable();
        self.g = ko.observable();
        self.b = ko.observable();
        
        // displaybox to demonstrate color choice
        var display = document.getElementById("colored_box");

        // listeners to detect changes in the inputted values.
        var r_input = document.getElementById("red_str");
        var g_input = document.getElementById("green_str");
        var b_input = document.getElementById("blue_str");

        // Updates numbers for color sliders
        var r_slider = document.getElementById("red_slider");
        var g_slider = document.getElementById("green_slider");
        var b_slider = document.getElementById("blue_slider");

        r_slider.oninput = function() { update_col(this.value, 'red'); }
        g_slider.oninput = function() { update_col(this.value, 'green'); }
        b_slider.oninput = function() { update_col(this.value, 'blue'); }

        r_input.oninput = function() { update_col(this.value, 'red'); }
        g_input.oninput = function() { update_col(this.value, 'green'); }
        b_input.oninput = function() { update_col(this.value, 'blue'); }

        function update_col(value, col) {

            if (value > 255){value = 255}
            if (value < 0){value = 0}
            value = Number(value)
            if (col == 'red') { self.r = value; } 
            else if (col == 'green') { self.g = value; } 
            else if (col == 'blue') { self.b = value; }
            self.set_color();
        }

        // called when the user clicks the "Set Color" button
        self.set_color = function() {
            r_slider.value = self.r;
            r_input.value = self.r;
            g_slider.value = self.g;
            g_input.value = self.g;
            b_slider.value = self.b;
            b_input.value = self.b;
            display.style.backgroundColor = rgb_to_hex(self.r, self.g, self.b);
        };

        // testfunction for getting button to work
        self.testFun = function() {
            OctoPrint.simpleApiCommand("LEDController", "color_set", {"red": self.r, "green": self.g, "blue": self.b, "state": 1})
        };

        // converts r,g,b to hex value
        function rgb_to_hex(r, g, b) {
            return "#" + component_to_hex(r) + component_to_hex(g) + component_to_hex(b);
        }
        
        // converts individual 0-255 to hex
        function component_to_hex(c) {
            let hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }          
        
        // Initiate setting values with current values
        self.onBeforeBinding = function() {
            self.r = Number(self.settings.settings.plugins.LEDController.red_strength());
            self.g = Number(self.settings.settings.plugins.LEDController.green_strength());
            self.b = Number(self.settings.settings.plugins.LEDController.blue_strength());
            self.set_color();
        }
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: LEDControllerViewModel,
        dependencies: ['settingsViewModel'],
        elements: [document.getElementById("tab_plugin_LEDController")],
    });
});
var spi = require('spi');

function LightStrips(device, num_pixels) {
    this.num_pixels = num_pixels;
    this.pixel_buffer = new Buffer(num_pixels*3);
    this.off_buffer = new Buffer(num_pixels*3);
    this.device = new spi.Spi(device, {
                                        //"mode": spi.MODE['MODE_0'],
                                        //"chipSelect": spi.CS['none'],
                                        //"maxSpeed": 1000000,
                                        //"bitOrder":spi.ORDER.msb
                                    });
    this.device.open();
    this.pixel_buffer.fill(0);
    this.off_buffer.fill(0x80 | 0);
    this.off();
    this.animate = null;
};

LightStrips.prototype.off = function() {
    this.all(0, 0, 0);
    this.sync();
};

LightStrips.prototype.sync = function() {
    this.device.write(this.pixel_buffer);
    this.device.write(new Buffer([0x00,0x00,0x00]));
    
};

LightStrips.prototype.all = function(r,g,b) {
    for(var i = 0; i < this.num_pixels; i++) {
        this.set(i, 0x80 | g, 0x80 | r, 0x80 | b);
    }
}

LightStrips.prototype.clear = function() {
    this.pixel_buffer.fill(0);
}

LightStrips.prototype.set = function(pixel, r, g, b) {
    this.pixel_buffer[pixel*3] = r;
    this.pixel_buffer[pixel*3+1] = g;
    this.pixel_buffer[pixel*3+2] = b;
}

/*
LightStrips.prototype.throb = function(pixels, start_color, end_color, duration, options) {
    this.stop();
    this.animate = new Throb(this, pixels, start_color, end_color, duration, options);
    this.animate.start();
}*/

LightStrips.prototype.stop = function() {
    if (this.animate !== null) {
        this.animate.stop();
        this.animate = null;
    }
}

module.exports.LightStrips = LightStrips;
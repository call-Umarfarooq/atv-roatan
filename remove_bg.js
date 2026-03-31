const Jimp = require('jimp');

Jimp.read('public/images/footer-side.png')
  .then(image => {
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      var red = this.bitmap.data[idx + 0];
      var green = this.bitmap.data[idx + 1];
      var blue = this.bitmap.data[idx + 2];
      
      // If the pixel is close to white, make it transparent
      if (red > 240 && green > 240 && blue > 240) {
        this.bitmap.data[idx + 3] = 0; // Set alpha to 0
      }
    });

    image.write('public/images/footer-side-transparent.png');
    console.log("Background removed and saved as footer-side-transparent.png");
  })
  .catch(err => {
    console.error(err);
  });

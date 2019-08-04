var Jimp = require("jimp");

var fileName = '1.jpg';
var imageCaption = 'привет как  дела awdaw';
var loadedImage;

Jimp.read(fileName)
  .then(function (image) {
    loadedImage = image;
    return Jimp.loadFont('./fonts/font.fnt');
  })

  .then(function (font) {
    console.log(font)
    loadedImage.print(font, 50, 50, imageCaption)
      .write('result.jpg')

  })
  .catch(function (err) {
    console.error(err);
  });
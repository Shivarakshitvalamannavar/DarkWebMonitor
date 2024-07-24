const fs = require('fs');
const exifParser = require('exif-parser');

function readImageFromFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function extractExifFromBuffer(buffer) {
  try {
    const parser = exifParser.create(buffer);
    const exifData = parser.parse();
    return exifData;
  } catch (error) {
    console.error('Error extracting EXIF data:', error);
    return null;
  }
}

(async () => {
  const filePath = 'C:/Users/shiva/Darkweb/hills.jpg'; // Change this to the path of your image file
  try {
    const imageBuffer = await readImageFromFile(filePath);
    const exifData = extractExifFromBuffer(imageBuffer);
    console.log(exifData);
  } catch (error) {
    console.error('Error:', error);
  }
})();

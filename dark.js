const tr = require('tor-request');
const exifParser = require('exif-parser');

async function fetchImageBuffer(url) {
  return new Promise((resolve, reject) => {
    tr.request(url, { encoding: null }, (err, res, body) => {
      if (err) {
        reject(err);
      } else if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch image. Status code: ${res.statusCode}`));
      } else {
        resolve(body);
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
  const url = 'http://hyjgsnkanan2wsrksd53na4xigtxhlz57estwqtptzhpa53rxz53pqad.onion/products/cat/200/image.jpg';
  try {
    tr.setTorAddress('localhost', 9150); // Ensure Tor is running on this address and port
    const imageBuffer = await fetchImageBuffer(url);
    const exifData = extractExifFromBuffer(imageBuffer);
    console.log(exifData);
  } catch (error) {
    console.error('Error:', error);
  }
})();

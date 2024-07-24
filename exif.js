import fetch from 'node-fetch';
import { SocksProxyAgent } from 'socks-proxy-agent';
import ExifReader from 'exifreader';

async function fetchImageBuffer(url) 
{
  const agent = new SocksProxyAgent('socks5h://127.0.0.1:9050'); // Assuming Tor is running on this port
  const response = await fetch(url, {agent});
  if (!response.ok)
    throw new Error(`Failed to fetch image ${url}:\n${response.statusText}`);
  return await response.arrayBuffer();
}

async function parseExif(buffer) 
{
  const tags = ExifReader.load(buffer);
  return tags;
}

async function getExif(url) 
{
  // const imageUrl = 'http://libraryfyuybp7oyidyya3ah5xvwgyx6weauoini7zyz555litmmumad.onion/archives/art/Guns/1003kcj%20I%20like%20me%20some%20AKs%20and%20Glocks.jpg'; // Replace with your .onion image URL

  try 
  {
    const buffer = await fetchImageBuffer(url);
    const exifData = await parseExif(buffer);
    console.log('EXIF Data for image - ', url, ':\n', exifData);
  }
  catch (err) 
  {
    console.log("Can't extract exif data of base 64 encoded images")
    console.error('Error:', err.message);
  }
}

// getExif(url);

// module.exports = exif;
export default getExif;
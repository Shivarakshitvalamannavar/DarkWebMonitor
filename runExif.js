import fs from 'fs/promises';
import getExif from './exif.js';

async function runExif(filePath) 
{
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const urls = data.split('\n').filter(url => url.trim() != '');

        if (urls.length) 
        {
            for (const url of urls) 
            {
                try {
                    await getExif(url);
                    console.log('----------------------------------------------------------------------------------------------------------------------------------');
                } catch (err) {
                    console.error("Something went wrong while getting exif data for url\n", err);
                }
            }
        }
        else
            console.log("No images present in that website to extract EXIF data from");
    }
    catch (err) {
        console.error("Something went wrong while reading file\n", err);
    }
}

export default runExif;

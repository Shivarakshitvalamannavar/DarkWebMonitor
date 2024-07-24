import cheerio from 'cheerio';
import fs from 'fs';
import urlModule from 'url';

async function scrapeImages(base, filePath) 
{
    try 
    {
        const data = await fs.promises.readFile(filePath, 'utf8');
        const $ = cheerio.load(data);

        const urls = [];
        $('img').each((index, val) => {
            const src = $(val).attr('src');
            if (src) 
            {
                const url = urlModule.resolve(base, src);
                urls.push(url);
            }
        });

        const imgURLs = urls.join('\n');

        try 
        {
            await fs.promises.writeFile('Image_URLs.txt', imgURLs);
            console.log("Images from the HTML file have been scraped and their URLs have been written into the required file");
        } catch (err) {
            console.error("Something went wrong while writing the file\n", err);
        }
    } catch (err) {
        console.error("Something went wrong while reading the file\n", err);
    }
}

export default scrapeImages;

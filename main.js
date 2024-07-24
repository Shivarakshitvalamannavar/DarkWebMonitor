// const scrapeProd = require('./scraper.js');
// const scrapeImages = require('./image_extract.js');
import scrapeProd from './scraper.js';
import scrapeImages from './image_extract.js';
import exif from './runExif.js';

async function scraping(url) 
{
    const scraped = await scrapeProd(url);
    if(scraped)
    {
        await scrapeImages(url,"Scraped_HTML.html");
        await exif("Image_URLs.txt");
    }
}

// const url = "https://www.pesuacademy.com/Academy/s/studentProfilePESU"
const url = "http://p53lf57qovyuvwsc6xnrppyply3vtqm7l6pcobkmyqsiofyeznfu5uqd.onion/"
scraping(url);
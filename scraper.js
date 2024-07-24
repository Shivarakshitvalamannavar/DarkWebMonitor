import puppeteer from 'puppeteer';
import fs from 'fs/promises';

async function scrapeProd(url) 
{
    console.log("Starting Puppeteer...");

    // const browser  = await puppeteer.launch();          //for clearnet
    const browser = await puppeteer.launch({               //for darkweb
        headless: true,
        args: [
            '--proxy-server=socks5://127.0.0.1:9050',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    });

    const page = await browser.newPage();

    await page.authenticate({ username: '', password: '' }); //omit if no authentication is required 

    let response;
    const maxTries = 5;
    let attempts = 0;

    while (attempts < maxTries) 
    {
        try {
            console.log(`Attempt ${attempts + 1} to access ${url}...`);
            response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 900000 }); // Increased timeout to 1.5 minutes
            if (response && response.ok()) {
                console.log("Page loaded successfully.");
                break;
            } else {
                console.error(`Attempt ${attempts + 1} failed with status: ${response ? response.status() : 'no response'}`);
            }
        } catch (error) {
            console.error(`Attempt ${attempts + 1} failed: ${error.message}`);
        }
        attempts += 1;
        if (attempts < maxTries) 
            await new Promise(resolve => setTimeout(resolve, 7000)); // Wait 7 seconds before retrying
    }

    if (response && response.ok()) {
        try {
            const content = await page.content();
            await fs.writeFile('Scraped_HTML.html', content);
            console.log("HTML data has been scraped into the required file");
            await browser.close();
            return true;
        } catch (err) {
            console.error("Error extracting content: ", err);
            await browser.close();
            return false;
        }
    } 
    else 
    {
        console.error("Failed to load the page after multiple attempts.");
        await browser.close();
        return false;
    }
}

export default scrapeProd;
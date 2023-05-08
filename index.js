import express from 'express';
import puppeteer from "puppeteer"
import axios from 'axios';

const app = express();
//the stored x-signed-token
let token = ''

setInterval(async () => {
  // find path to crhomium

const browser = await puppeteer.launch({
  headless: false,
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});
const pages = await browser.pages(); // Get an array of all open pages
const page = pages[0]; // Get the current active page (first in the array)


  page.on('request', request => {

    if (request.url() === 'https://ora.ai/api/conversation') {
      async function getHeader(){
        token = request.headers()['x-signed-token'];
        axios.post('https://token-store.eslam3011.repl.co/store', { token: token })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
        console.log(token);
        
      }
      getHeader()
    }

  });


  // navigate to the website's login page 
  await page.goto('https://ora.sh/electoral-blush-qjp9/awful-indigo-c5lx');
  await page.waitForSelector('[placeholder="Type your message here..."]');
  await page.type('[placeholder="Type your message here..."]', 'hello');
  await page.keyboard.press('Enter');
  await browser.close()

}, 40000); 



app.get('/', (req, res) => {
  res.send(token);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});





const puppeteer = require('puppeteer');

// Leitura obrigatória
//https://github.com/puppeteer/examples

// https://github.com/transitive-bullshit/awesome-puppeteer#rendering-and-web-scraping

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Allows you to intercept a request; must appear before
    // your first page.goto()
    await page.setRequestInterception(true);

    // Request intercept handler... will be triggered with 
    // each page.goto() statement
    page.on('request', interceptedRequest => {

        // Here, is where you change the request method and 
        // add your post data
        var options = {
            'method': 'POST',
            'url': 'http://pesquisa.in.gov.br/imprensa/core/jornalList.action',
            'headers': {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
              'tipo-pesquisa': '0',
              'sitema-busca': '2',
              'termo-pesquisado': '0',
              'jornal': 'do1',
              'edicao.dtInicio': '15/04',
              'edicao.dtFim': '15/04',
              'edicao.ano': '2020'
            }
          };

        // Request modified... finish sending! 
        interceptedRequest.continue(options);
        // Immediately disable setRequestInterception, or all other requests will hang
        page.setRequestInterception(false);        
    });

    // Navigate, trigger the intercept, and resolve the response
    const response = await page.goto('http://pesquisa.in.gov.br/imprensa/core/jornalList.action');     
    await page.screenshot({path: 'dou.png'});
    const responseBody = await response.text();
    console.log(responseBody);

    // Close the browser - done! 
    await browser.close();
})();
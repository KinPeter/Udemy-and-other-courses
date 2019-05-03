const fs = require('fs'); //import filesystem module
const http = require('http'); //import http module
const url = require('url'); //import url module

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');

const laptopData = JSON.parse(json);

//console.log(__dirname);
//console.log(laptopData);

const server = http.createServer((request, response) => {
    //console.log('Someone did access the server!');
    
    const pathName = url.parse(request.url, true).pathname;
    const id = url.parse(request.url, true).query.id;
    
    // PRODUCTS PAGE
    if (pathName === '/products' || pathName === '/') {
        response.writeHead(200, {'Content-type' : 'text/html'}); //200 code for OK
        fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
            let overviewOutput = data;
            
            fs.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, data) => {
            
                const cardsOutput = laptopData.map(el => replaceTemplate(data, el)).join('');
                overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput);
                
                response.end(overviewOutput);
            });
        });
        
        //response.end('This is the PRODUCTS page!');
    } 
    
    // LAPTOP DETAILS
    else if (pathName === '/laptop' && id < laptopData.length) {
        response.writeHead(200, {'Content-type' : 'text/html'}); //200 code for OK
        //response.end(`This is the LAPTOP page for laptop ${id}!`);
        
        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
            const laptop = laptopData[id];
            const output = replaceTemplate(data, laptop);
            response.end(output);
        });
        
        
    }
    
    // IMAGES
    else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {
        fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
            response.writeHead(200, {'Content-type' : 'image/jpg'});
            response.end(data);
        })
    }
    
    // URL NOT FOUND
    else {
        response.writeHead(404, {'Content-type' : 'text/html'}); //404 code for not found
        response.end('URL was not found on the server!');
    }
});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for requests now');
});

function replaceTemplate(originalHtml, laptop) {
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);
    return output;
}

import express from 'express';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import fs from 'fs';
import https from 'https';

const app = express();
const path = './files/divisas.json';
let read = fs.readFileSync(path);

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

https.get(`https://mindicador.cl/api`, function (res) {
    res.setEncoding('utf-8');
    let data = '';

    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        let dailyIndicators = JSON.parse(data); // JSON to JavaScript object
        //const conversion = pesos / dailyIndicators.serie[0].valor;       
        const dolar = dailyIndicators.dolar.valor;
        const euro = dailyIndicators.euro.valor;
        const uf = dailyIndicators.uf.valor;
        const utm = dailyIndicators.utm.valor;
        read = `Dolar: ${dolar}\n Euro: ${euro}\n UF: ${uf}\n UTM: ${utm}\n`;
        //console.log(read);
        //fs.writeFileSync(path, read, 'utf-8');
        
        
    });
    
}).on('error', function (err) {
    console.log('Error al consumir la API!');
});
//fs.writeFileSync(path, read, 'utf-8');
//console.log(fs.readFileSync(path).toString());
console.log(read.toString());
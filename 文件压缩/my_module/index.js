
const express = require('express');
const app= express();

const fs = require('fs');
const zlib = require('zlib');
const gzip = zlib.createGzip();
const outStream = fs.createWriteStream('out.js.gz');
fs.createReadStream('./node-stream.js')
   .pipe(gzip)
   .pipe(outStream)
;
const port = process.env.PORT || 3000;
app.get('/',(req,res)=>{
    res.send('hello,world');
});

app.listen(port,()=>{
    console.log(`webapp at  localhost:${port}`);
});
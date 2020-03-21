
const express = require('express');
const app= express();

const testing_currency = require('./test_currency')

const port = process.env.PORT || 3000;
app.get('/',(req,res)=>{
    res.send('hello,world');
})
app.listen(port,()=>{
    console.log(`webapp at  localhost:${port}`);
});

testing_currency.consoleLogTesting();
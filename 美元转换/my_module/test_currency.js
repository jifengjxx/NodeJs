const currency = require('../lib/currency');

console.log('50 Canadian dollars equals this amount of US dollar:'+ currency.canadianToUS(50));
console.log('30 US dollars equals this amount of Canadian dollars:'+ currency.USTOCanadian(30))
function consoleLogTesting(){
    console.log('50 Canadian dollars equals this amount of US dollar:'+ currency.canadianToUS(50));
    console.log('30 US dollars equals this amount of Canadian dollars:'+ currency.USTOCanadian(30))
}

exports.consoleLogTesting = ()=>{  console.log('50 Canadian dollars equals this amount of US dollar:'+ currency.canadianToUS(50));
console.log('30 US dollars equals this amount of Canadian dollars:'+ currency.USTOCanadian(30))}
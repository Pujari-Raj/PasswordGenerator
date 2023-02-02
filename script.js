// Gathering all html elements using Id

const resultEl = document.getElementById('result');

const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');

// buttons
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

// object(key:values)
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

// code for copying generated password to textarea
clipboardEl.addEventListener('click', () => {
    let copiedpassword = document.createElement("input");
    const genearatedpassword = resultEl.innerText;

    if (genearatedpassword == true) {
        //console.log('inside if!!');
        return '';
    }
    copiedpassword.value = genearatedpassword;
    document.body.appendChild(copiedpassword);
    alert('Password copied to Clipboard successfully!!!!');
    console.log(copiedpassword.value);
    copiedpassword.remove();
})

// code for generating password on button click
generateEl.addEventListener('click', () => {
    const length = lengthEl.value;
    const passhaslower = lowercaseEl.checked;
    const passhasupper = uppercaseEl.checked;
    const passhasnum = numbersEl.checked;
    const passhassymbols = symbolsEl.checked;

    //console.log('called!!');
    resultEl.innerText = generatePassword(passhaslower, passhasupper, passhasnum, passhassymbols, length);
})

//
function generatePassword(lower, upper, number, symbol, length) {
    //console.log('generatePassword called!!');
    let generatepass = "";
    const types = lower + upper + number + symbol;
    
    //console.log(types);

    const passwordArraytype  = [{lower}, {upper}, {number}, 
                                {symbol}].filter((item) => Object.values(item)[0]);
    
    //console.log(Object.values(item)[0]);

    // prompting user if none of boxes is selected
    if(types === 0){
        alert('Please select atleast one box');
    }

    for (let i = 0; i < length; i= i+types) {
        passwordArraytype.forEach(e => {
            const functionname = Object.keys(e)[0];
            //console.log('inside for!!',e);
            generatepass += randomFunc[functionname]();
        });
    }

    const finalpassword = generatepass.slice(0, length);
    //console.log(finalpassword);
    return finalpassword;
}

function getRandomLower() {
    return  String.fromCharCode(Math.floor(Math.random()*26) +97);
}

function getRandomUpper() {
    return  String.fromCharCode(Math.floor(Math.random()*26) +65);
}

function getRandomNumber() {
    return  String.fromCharCode(Math.floor(Math.random()*10) +48);
}

function getRandomSymbol() {
    let symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
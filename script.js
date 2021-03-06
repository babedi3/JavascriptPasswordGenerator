
//DOM elements
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Copy to clipboard
clipboard.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = resultEl.innerText;

    if(!password){
        return;
    }

    textarea.value=password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password Copied to Clipboard");
});



// Generate event listen
generate.addEventListener("click", () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        length
    );
});



// Password Generator
function generatePassword(lower, upper, number, symbol, length) {
    //
    let generatedPassword = "";
    //
    const typesCount = lower + upper + number + symbol;
    //
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter
    (item => Object.values(item)[0]);
    //
    if(typesCount === 0) {
        return "";
    }
    //
    for(let i = 0; i < length; i  += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];

            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}



// Math.floor rounds decimals of math.random within fromCharCode function that invokes  ASCII table containing available characters. 26 is for 26 letters in alphabet, +97 because lowercase letters start at 97.
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random()*26) + 97);
}

// Math.floor rounds decimals of math.random within fromCharCode function that invokes  ASCII table containing available characters. 26 is for 26 letters in alphabet, +65 because uppercase letters start at 65.
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random()*26) + 65);
}
// Same idea here for numbers.
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random()*10) + 48);
}


function getRandomSymbol() {
    const symbols ="!#$%&()*+,-.'/:;<=>?@[\]^_`{|}~";
    return symbols[Math.floor(Math.random()*symbols.length)];
}


// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

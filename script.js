// Fetching all the elements we created using querySelector

const inputSlider = document.querySelector("[data-lengthSlider]");                                  //we put our custom attribute in [];
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay= document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = ' `~!@#$%^&*()_-+={};:",<>./ ' 



// Checking initital state

let password = "";
let passwordLength = 10;
let checkCount = 0;

handleSlider();

//set strength circle color to grey



//set password length

function handleSlider() {                                            //all this function does is it reflects the length of password on the UI

    inputSlider.value = passwordLength;
    
    lengthDisplay.innerText = passwordLength;

}



function setIndicator(color) {
    
    indicator.style.backgroundColor = color;
    
    // indicator.style.shadow = 

}



function getRndInteger(min, max) {
    
    return Math.floor(Math.random() * (max - min)) + min;             //math.random gives a number between 0 to 1 and math.floor gives nearest integer

}



function generateRandomNumber () {
    
    return getRndInteger(0, 9);

}

function generateLowerCase () {

    return String.fromCharCode(getRndInteger(97, 123));     //string.fromcharcode converts simple integer into ASCII values

}

function generateUpperCase () {

    return String.fromCharCode(getRndInteger(65, 91));

}

//Now we dont know the ASCII value of all the symbols so we create a string of symbols and later on we select random symbols from that string

function generateSymbols () {
    
    const randNum = getRndInteger(0, symbols.length);

    return symbols.charAt(randNum);                                         //charAt() returns the symbol on the index that we got in randNum

}



// To make the color of the circle appear green, grey or red as per the strength of the password

function calcStrength() {

    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasUpper = true;
    if(numbersCheck.checked) hasUpper = true;
    if(symbolsCheck.checked) hasUpper = true;

    if ( hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8 ) {
        
        setIndicator("#0f0");
    
    } 
    
    else if ( (hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6 ) {
        
        setIndicator("#ff0");
    
    } 
    
    else {
        
        setIndicator("#f00");
    
    }

}



async function copyContent () {

    try {

        await navigator.clipboard.writeText(passwordDisplay.value);                       //We can use await keyword in an async function only
                                                                                              
        copyMsg.innerText = "copied";

    }

    catch (e) {

        copyMsg.innerText = "Failed";

    }

    //To make copy wala span visible

    copyMsg.classList.add("active");                          //We will create a active class in CSS and that we will add here thats why we added it here

    setTimeout( () => {

        copyMsg.classList.remove("active");                // after 2 seconds we will remove the active class that we added from CSS

    }, 2000);

}


function shufflePassword (array) {

    // Fisher Yates Method to shuffle the password

    for (let i = array.length -1; i > 0; i --) {

        const j = Math.floor(Math.random() * (i + 1));

        const temp = array[i];

        array[i] = array[j];

        array[j] = temp;

    }

    let str = "";

    array.forEach( (el) => (str += el) );

    return str;

}



function handleCheckBoxChange () {

    checkCount= 0;

    allCheckBox.forEach( (checkbox) => {

        if(checkbox.checked) {

            checkCount++;

        }

    });

    //special condition

    if (passwordLength < checkCount) {

        passwordLength = checkCount;

        handleSlider();

    }

}


//Adding event listeners where ever necessary

allCheckBox.forEach( (checkbox) => {

    checkbox.addEventListener('change', handleCheckBoxChange);

})



inputSlider.addEventListener('input', (e) => {

    passwordLength = e.target.value;

    handleSlider();

})



copyBtn.addEventListener('click', () => {

    if(passwordDisplay.value) {

        copyContent();                                               //We can copy only if the textfield is non empty thats why we use if condition

    }

})


generateBtn.addEventListener('click', () => {

    // none of the checkbox are selected

    if (checkCount == 0) {

        return;

    }

    // if the length of passwords is less than the number of boxes checked

    if (passwordLength < checkCount) {

        passwordLength = checkCount;

        handleSlider();

    };

    // Let's start the journey to find new password

    console.log("Starting the Journey");

    //to find new password first remove old password

    password = "";

    // putting the characters mentioned in the checkboxes

    // if (uppercaseCheck.checked) {

    //     password += generateUpperCase();

    // }

    // if (lowercaseCheck.checked) {

    //     password += generateLowerCase();

    // }

    // if (numbersCheck.checked) {

    //     password += generateRandomNumber();

    // }

    // if (symbolsCheck.checked) {

    //     password += generateSymbols();

    // }


    //alternate way of doing what we did from line 268 to 292

    let funcArr = [];

    if(uppercaseCheck.checked) {

        funcArr.push(generateUpperCase);

    }

    if(lowercaseCheck.checked) {

        funcArr.push(generateLowerCase);

    }

    if(numbersCheck.checked) {

        funcArr.push(generateRandomNumber);

    }

    if(symbolsCheck.checked) {

        funcArr.push(generateSymbols);

    }


    //compulsory addition

    for (let i = 0; i < funcArr.length; i++) {

        password += funcArr[i] ();

    }

    console.log("Compulsory Addition Done");

    //remaining addition

    for (let i = 0; i < passwordLength - funcArr.length; i++) {
 
        let randIndex = getRndInteger( 0, funcArr.length);


        console.log("randIndex" + randIndex);               


        password += funcArr[randIndex] ();

    }

    console.log("Remaining addition done");

    // right now the pattern of password is obvious so now we shuffle the characters we have already generated in random order

    password = shufflePassword(Array.from(password));       // here we sent the password in the form of an array

    console.log("Shuffling Done");

    // show the password in UI

    passwordDisplay.value = password;

    console.log("Showed the password in the UI");

    // now we need to see the strength of the function from the indicator that changes color so we call that function here

    calcStrength();

})



// All the console.log statements are for our perusal to check if the code is working properly
//it has nothing to do with the logic of the code we have written
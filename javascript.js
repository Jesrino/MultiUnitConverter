// Conversion Functions
function convertKilometersToMiles(kilometers) {
    return kilometers * 0.62;
}

function convertMilesToKilometers(miles) {
    return miles * 1.61;
}

function convertCelsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function convertFahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function convertUSDollarsToPhilippinePesos(usDollars) {
    return usDollars * 56.21;
}

function convertPhilippinePesosToUSDollars(philippinePesos) {
    return philippinePesos / 56.21;
}

// Conversion Types Configuration
const conversions = {
    kmToMiles: {
        title: "Kilometers to Miles",
        inputUnit: "Kilometers",
        outputUnit: "Miles",
        convert: convertKilometersToMiles
    },
    milesToKm: {
        title: "Miles to Kilometers",
        inputUnit: "Miles",
        outputUnit: "Kilometers",
        convert: convertMilesToKilometers
    },
    celsiusToFahrenheit: {
        title: "Celsius to Fahrenheit",
        inputUnit: "Celsius",
        outputUnit: "Fahrenheit",
        convert: convertCelsiusToFahrenheit
    },
    fahrenheitToCelsius: {
        title: "Fahrenheit to Celsius",
        inputUnit: "Fahrenheit",
        outputUnit: "Celsius",
        convert: convertFahrenheitToCelsius
    },
    usdToPesos: {
        title: "USD to Philippine Pesos",
        inputUnit: "USD",
        outputUnit: "Philippine Pesos",
        convert: convertUSDollarsToPhilippinePesos
    },
    pesosToUsd: {
        title: "Philippine Pesos to USD",
        inputUnit: "Philippine Pesos",
        outputUnit: "USD",
        convert: convertPhilippinePesosToUSDollars
    }
};

// Current conversion type
let currentConversion = "kmToMiles";

// DOM Elements
const converterBtns = document.querySelectorAll(".converter-btn");
const conversionTitle = document.getElementById("conversion-title");
const inputValue = document.getElementById("input-value");
const inputUnit = document.getElementById("input-unit");
const convertBtn = document.getElementById("convert-btn");
const resultText = document.getElementById("result-text");

// Event Listeners
converterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Update active button
        converterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        // Update current conversion
        currentConversion = btn.dataset.conversion;
        
        // Update UI
        conversionTitle.textContent = conversions[currentConversion].title;
        inputUnit.textContent = conversions[currentConversion].inputUnit;
        
        // Clear result
        resultText.textContent = "Result will appear here";
        inputValue.value = "";
    });
});

convertBtn.addEventListener("click", () => {
    const value = parseFloat(inputValue.value);
    
    if (isNaN(value)) {
        resultText.textContent = "Please enter a valid number";
        return;
    }
    
    const conversion = conversions[currentConversion];
    const result = conversion.convert(value);
    const formattedResult = Number.isInteger(result) ? result : result.toFixed(2);
    
    resultText.textContent = `${value} ${conversion.inputUnit} = ${formattedResult} ${conversion.outputUnit}`;
});

// Initialize
conversionTitle.textContent = conversions[currentConversion].title;
inputUnit.textContent = conversions[currentConversion].inputUnit;

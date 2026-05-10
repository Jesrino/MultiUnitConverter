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
const converterPanel = document.querySelector(".converter-panel");

// Add entrance animations
function animateEntrance() {
    // Animate container
    const container = document.querySelector(".container");
    container.style.animation = "none";
    container.offsetHeight; // Trigger reflow
    container.style.animation = "containerFadeIn 0.8s ease-out forwards";
}

// Button click animation
function animateButton(btn) {
    btn.style.transform = "scale(0.95)";
    setTimeout(() => {
        btn.style.transform = "";
    }, 150);
}

// Event Listeners
converterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        animateButton(btn);
        
        // Update active button
        converterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        // Update current conversion
        currentConversion = btn.dataset.conversion;
        
        // Animate panel
        converterPanel.style.animation = "none";
        converterPanel.offsetHeight;
        converterPanel.style.animation = "panelSlideIn 0.5s ease-out forwards";
        
        // Update UI
        conversionTitle.textContent = conversions[currentConversion].title;
        inputUnit.textContent = conversions[currentConversion].inputUnit;
        
        // Clear result
        resultText.textContent = "Result will appear here";
        resultText.classList.remove("converting");
        inputValue.value = "";
        inputValue.focus();
    });
});

convertBtn.addEventListener("click", () => {
    // Button press animation
    animateButton(convertBtn);
    
    const value = parseFloat(inputValue.value);
    
    if (isNaN(value)) {
        resultText.textContent = "Please enter a valid number";
        resultText.classList.add("error-shake");
        setTimeout(() => resultText.classList.remove("error-shake"), 500);
        return;
    }
    
    const conversion = conversions[currentConversion];
    const result = conversion.convert(value);
    const formattedResult = Number.isInteger(result) ? result : result.toFixed(2);
    
    // Animate result appearance
    resultText.classList.remove("converting");
    setTimeout(() => resultText.classList.add("converting"), 10);
    
    resultText.textContent = `${value} ${conversion.inputUnit} = ${formattedResult} ${conversion.outputUnit}`;
});

// Allow Enter key to trigger conversion
inputValue.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        convertBtn.click();
    }
});

// Initialize - trigger entrance animations after page load
window.addEventListener("load", () => {
    animateEntrance();
    
    // Set initial values
    conversionTitle.textContent = conversions[currentConversion].title;
    inputUnit.textContent = conversions[currentConversion].inputUnit;
    
    // Focus input for better UX
    setTimeout(() => inputValue.focus(), 800);
});

// Add error shake animation dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes errorShake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-10px); }
        40%, 80% { transform: translateX(10px); }
    }
    
    #result-text.error-shake {
        animation: errorShake 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);

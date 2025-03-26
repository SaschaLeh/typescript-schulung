// Temperature Converter Example
// Converts between Celsius and Fahrenheit

// Type alias for temperature units
type TemperatureUnit = "Celsius" | "Fahrenheit";

// Function to convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius: number): number {
    return (celsius * 9/5) + 32;
}

// Function to convert Fahrenheit to Celsius
function fahrenheitToCelsius(fahrenheit: number): number {
    return (fahrenheit - 32) * 5/9;
}

// General conversion function
function convertTemperature(
    temperature: number, 
    fromUnit: TemperatureUnit, 
    toUnit: TemperatureUnit
): number {
    // Same unit, no conversion needed
    if (fromUnit === toUnit) {
        return temperature;
    }
    
    // Convert based on the direction
    if (fromUnit === "Celsius" && toUnit === "Fahrenheit") {
        return celsiusToFahrenheit(temperature);
    } else {
        return fahrenheitToCelsius(temperature);
    }
}

// Examples
const celsiusTemp: number = 25;
const fahrenheitTemp: number = 77;

// Formatting helper with type annotation
function formatResult(
    value: number, 
    fromUnit: TemperatureUnit, 
    toUnit: TemperatureUnit,
    convertedValue: number
): string {
    return `${value}° ${fromUnit} is ${convertedValue.toFixed(2)}° ${toUnit}`;
}

// Demonstrating conversion
const celsiusToFahrenheitResult = convertTemperature(celsiusTemp, "Celsius", "Fahrenheit");
console.log(formatResult(celsiusTemp, "Celsius", "Fahrenheit", celsiusToFahrenheitResult));

const fahrenheitToCelsiusResult = convertTemperature(fahrenheitTemp, "Fahrenheit", "Celsius");
console.log(formatResult(fahrenheitTemp, "Fahrenheit", "Celsius", fahrenheitToCelsiusResult));

// Testing edge cases
const freezingCelsius = 0;
const freezingFahrenheit = convertTemperature(freezingCelsius, "Celsius", "Fahrenheit");
console.log(formatResult(freezingCelsius, "Celsius", "Fahrenheit", freezingFahrenheit));

const boilingCelsius = 100;
const boilingFahrenheit = convertTemperature(boilingCelsius, "Celsius", "Fahrenheit");
console.log(formatResult(boilingCelsius, "Celsius", "Fahrenheit", boilingFahrenheit)); 
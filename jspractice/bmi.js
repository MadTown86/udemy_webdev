function bmiCalculator (weight, height) {
    var bmi = weight / (height**2);
    return Math.round(bmi);
}

console.log("Your BMI: " + bmiCalculator(65, 1.8))
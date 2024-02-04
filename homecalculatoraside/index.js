function calcAdd(num1, num2) {
    return num1 + num2
}

function calcSub(num1, num2) {
    return num1 - num2
}

function calcMult(num1, num2) {
    return num1 * num2
}

function calcDiv(num1, num2) {
    return num1 / num2
}

function calcHome(text) {
    var result = 0;
    var operandBin = [];
    var operatorBin = [];
    var operatorSearch = ["+", "-", "*", "/"];
    var i = 0;
    l = text.length;
    while (i < l) {
        if (text[i] != "+" && text[i] != "-" && text[i] != "*" && text[i] != "/" && i != l-1) {
            i++;
        } else if (i == l-1) {
            operandBin.push(parseFloat(text.substring(0, i+1)));
            i++;
        } else {
            operatorBin.push(text[i]);
            operandBin.push(parseFloat(text.substring(0, i)));
            text = text.substring(i+1, l);
            i++;
        }
    }
    
    for (var i = 0; i < operandBin.length; i++) {
        alert(operandBin[i]);
    }

    for (var i = 0; i < operatorBin.length; i++) {
        alert(operatorBin[i]);
    }
    
    result = operandBin.shift();
    while (operandBin.length > 0) {
        currOperator = operatorBin.shift();
        currOperand = operandBin.shift();
        switch (currOperator) {
            case "+":
                result = calcAdd(result, currOperand);
                break;
            case "-":
                result = calcSub(result, currOperand);
                break;
            case "*":
                result = calcMult(result, currOperand);
                break;
            case "/":
                result = calcDiv(result, currOperand);
                break;
            default:
        }
        
    } return result;

}

var textlog = document.getElementById("screen")
var textForInnerHTML = ""
var buttonNames = ["onebtn", "twobtn", "threebtn", "divisionbtn", "fourbtn", "fivebtn", "sixbtn", "sevenbtn", "eightbtn", "ninebtn", "multiplicationbtn", "addbtn", "subtractbtn"]

var numberOfButtons = document.querySelectorAll("button").length;

for (var i = 0; i < numberOfButtons; i++) {

    document.querySelectorAll("button")[i].addEventListener("click", function() {
        var buttonInnerHTML = this.innerHTML;

        switch (buttonInnerHTML) {
            case "1":
                textForInnerHTML += "1";
                textlog.innerHTML = textForInnerHTML;
                break
            case "2":
                textForInnerHTML += "2";
                textlog.innerHTML = textForInnerHTML;
                break
            case "3":
                textForInnerHTML += "3";
                textlog.innerHTML = textForInnerHTML;
                break
            case "4":
                textForInnerHTML += "4";
                textlog.innerHTML = textForInnerHTML;
                break
            case "5":
                textForInnerHTML += "5";
                textlog.innerHTML = textForInnerHTML;
                break
            case "6":
                textForInnerHTML += "6";
                textlog.innerHTML = textForInnerHTML;
                break
            case "7":
                textForInnerHTML += "7";
                textlog.innerHTML = textForInnerHTML;
                break
            case "8":
                textForInnerHTML += "8";
                textlog.innerHTML = textForInnerHTML;
                break
            case "9":
                textForInnerHTML += "9";
                textlog.innerHTML = textForInnerHTML;
                break
            case "+":
                textForInnerHTML += "+";
                textlog.innerHTML = textForInnerHTML;
                break
            case "-":
                textForInnerHTML += "-";
                textlog.innerHTML = textForInnerHTML;
                break
            case "*":
                textForInnerHTML += "*";
                textlog.innerHTML = textForInnerHTML;
                break
            case "/":
                textForInnerHTML += "/";
                textlog.innerHTML = textForInnerHTML;
                break
            case "0":
                textForInnerHTML += "0";
                textlog.innerHTML = textForInnerHTML;
                break
            case "Clear":
                textForInnerHTML = "";
                textlog.innerHTML = textForInnerHTML;
                break
            case "=":
                textlog.innerHTML = calcHome(textForInnerHTML);
                textForInnerHTML = textlog.innerHTML;
                break
            default:
        }
    });
}
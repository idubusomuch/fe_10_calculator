const button = document.querySelectorAll(".calculate-btn-box>button");
const displayInput = document.querySelector(".num-input");

let displayNum = "0";
let firstOperand = null;
let secondOperand = null;
let operator = null;

// 계산 직후 / 또는 연산자 입력 직후 상태인지 나타내는 플래그
let isCalculated = false;
displayInput.innerText = displayNum;

function calculate(firstNum, operator, secondNum) {
  firstNum = parseFloat(firstNum);
  secondNum = parseFloat(secondNum);
  let result = 0;

  console.log(
    `firstNum, operator, secondNum : ${firstNum}, ${operator}, ${secondNum}`
  );

  switch (operator) {
    case "+":
      result = firstNum + secondNum;
      break;
    case "-":
      result = firstNum - secondNum;
      break;
    case "*":
      result = firstNum * secondNum;
      break;
    case "/":
      result = firstNum / secondNum;
      break;
    case "%":
      result = firstNum % secondNum;
      break;
    default:
      console.log("error");
      break;
  }
  return String(result);
}

button.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let clickedBtn = e.target.textContent;
    // 숫자 버튼 클릭
    if (btn.classList.contains("number")) {
      if (clickedBtn === "." && displayNum.includes(".")) {
        return;
      }
      if(isCalculated) {
        displayNum = clickedBtn === "." ? "0." : clickedBtn;
        isCalculated = false;
      } else {
        displayNum = displayNum === "0" ? clickedBtn : displayNum + clickedBtn;
      }
      displayInput.textContent = displayNum;
    }

    // 연산자 버튼 클릭
    if (btn.classList.contains("operator")) {
      console.log("operator : " + clickedBtn);
      // 첫번째 숫자를 받고 연산자를 입력받았을 때
      if (firstOperand === null) {
        firstOperand = displayNum;
      } else if (operator && !isCalculated) {
        secondOperand = displayNum;
        displayNum = calculate(firstOperand, operator, secondOperand);
        firstOperand = displayNum;
        secondOperand = null;
        displayInput.textContent = displayNum;
      }

      operator = clickedBtn;
      isCalculated = true; // 새로운 피연산자 입력을 기다림
      
      // = 버튼 클릭 시
      if (btn.id === "equal") {
        if (firstOperand !== null && operator !== null && !isCalculated) {
          secondOperand = displayNum;
          displayNum = calculate(firstOperand, operator, secondOperand);
          firstOperand = displayNum;
          secondOperand = null;
          operator = null;
          displayInput.textContent = displayNum;
        }
      }// 다른 연산자 버튼 클릭시
      else {
        operator = clickedBtn;
        displayNum = "0";
      }
    }

    // 그 외 함수버튼 클릭
    if (btn.classList.contains("function")) {
      if (btn.id === "clear") {
        displayNum = "0";
        firstOperand = null;
        secondOperand = null;
        operator = null;
        displayInput.textContent = displayNum;
      }
      if (btn.id === "plus-minus") {
        displayNum = parseFloat(displayNum) * -1;
        displayNum = String(displayNum);
        displayInput.textContent = displayNum;
      }
    }
  });
});
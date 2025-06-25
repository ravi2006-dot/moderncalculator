function appendValue(val) {
  document.getElementById("display").value += val;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function deleteLast() {
  let display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

function appendFunction(func) {
  const display = document.getElementById("display");
  if (func === 'sqrt') {
    display.value += '√(';
  } else if (func === 'square') {
    display.value += '^2';
  } else {
    display.value += func + '(';
  }
}

function calculate() {
  let display = document.getElementById("display");
  let expression = display.value;

  try {
    // Replace user-friendly math expressions with JS Math methods
    expression = expression
      .replace(/√\(/g, 'Math.sqrt(')
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/cos\(/g, 'Math.cos(')
      .replace(/tan\(/g, 'Math.tan(')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/(\d+)\^2/g, 'Math.pow($1,2)');

    const result = eval(expression);
    addToHistory(display.value + " = " + result);
    display.value = result;
  } catch (error) {
    display.value = "Error";
  }
}

function addToHistory(entry) {
  const historyList = document.getElementById("historyList");
  const li = document.createElement("li");
  li.textContent = entry;
  li.onclick = () => {
    document.getElementById("display").value = entry.split('=')[0].trim();
  };
  historyList.prepend(li);
}

import { createCalculator } from './calculator.js';

const calc = createCalculator();
const displayEl = document.getElementById('display');

function render() {
  displayEl.textContent = calc.display();
}

// ---------- Button clicks (FR2) ----------
document.querySelector('.keys').addEventListener('click', (event) => {
  const btn = event.target.closest('button');
  if (!btn) return;

  if (btn.dataset.digit !== undefined) {
    calc.inputDigit(btn.dataset.digit);
  } else if (btn.dataset.op !== undefined) {
    calc.inputOperator(btn.dataset.op);
  } else if (btn.dataset.action === 'decimal') {
    calc.inputDecimal();
  } else if (btn.dataset.action === 'equals') {
    calc.calculate();
  } else if (btn.dataset.action === 'clear') {
    calc.clear();
  } else if (btn.dataset.action === 'backspace') {
    calc.backspace();
  }
  render();
});

// ---------- Keyboard input (FR3) ----------
document.addEventListener('keydown', (event) => {
  const key = event.key;
  let handled = true;

  if (key >= '0' && key <= '9') calc.inputDigit(key);
  else if (key === '.') calc.inputDecimal();
  else if (['+', '-', '*', '/'].includes(key)) calc.inputOperator(key);
  else if (key === 'Enter' || key === '=') calc.calculate();
  else if (key === 'Backspace') calc.backspace();
  else if (key === 'Escape') calc.clear();
  else handled = false;

  if (handled) {
    event.preventDefault(); // stops Enter from also clicking a focused button
    render();
  }
});

render();
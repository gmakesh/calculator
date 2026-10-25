export function createCalculator() {
  let current = '0';      // the number being typed (a string)
  let previous = null;    // the stored left-hand number
  let operator = null;    // '+', '-', '*', '/'
  let justEvaluated = false; // true right after = or an Error
  let error = false;

  function compute(a, b, op) {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b === 0 ? null : a / b;
      default:  return b;
    }
  }

  function format(n) {
    return String(Number(n.toPrecision(12)));
  }

  function resetIfNeeded() {
    if (error) {
      current = '0';
      previous = null;
      operator = null;
      error = false;
      justEvaluated = false;
    }
  }

  return {
    inputDigit(d) {
      resetIfNeeded();
      if (justEvaluated) {
        current = '0';
        justEvaluated = false;
      }
      current = current === '0' ? d : current + d;
    },

    inputDecimal() {
      resetIfNeeded();
      if (justEvaluated) {
        current = '0';
        justEvaluated = false;
      }
      if (!current.includes('.')) current += '.';
    },

    inputOperator(op) {
      resetIfNeeded();
      // EC3: operator pressed twice replaces the first one
      if (operator && previous !== null && justEvaluated === 'operator') {
        operator = op;
        return;
      }
      // FR4: evaluate any pending operation first
      if (operator && previous !== null) {
        const result = compute(Number(previous), Number(current), operator);
        if (result === null) {
          error = true;
          current = 'Error';
          previous = null;
          operator = null;
          return;
        }
        current = format(result);
      }
      previous = current;
      operator = op;
      justEvaluated = 'operator';
    },

    calculate() {
      resetIfNeeded();
      if (!operator || previous === null) return;
      const result = compute(Number(previous), Number(current), operator);
      if (result === null) {
        error = true;
        current = 'Error';
      } else {
        current = format(result);
        justEvaluated = true;
      }
      previous = null;
      operator = null;
    },

    clear() {
      current = '0';
      previous = null;
      operator = null;
      justEvaluated = false;
      error = false;
    },

    backspace() {
      resetIfNeeded();
      if (justEvaluated === true || justEvaluated === 'operator') return;
      current = current.length > 1 ? current.slice(0, -1) : '0';
    },

    display() {
      return current;
    },
  };
}
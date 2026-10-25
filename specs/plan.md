# Calculator Technical Plan

## Stack
Plain HTML, CSS, and JavaScript (ES modules). No frameworks, no build step.
Tests use Node's built-in test runner.

## File Structure
- index.html          → page layout and buttons
- style.css           → styling and responsive layout (NFR1)
- calculator.js       → pure logic, no DOM access
- ui.js               → connects buttons and keyboard to the logic
- tests/calculator.test.js → unit tests for the logic

## Key Design Decision
Separate logic from UI. calculator.js knows nothing about the browser,
so it can be tested in Node without opening a page.

## Calculator API (calculator.js)
createCalculator() returns an object with:
- inputDigit(d)       → append a digit (FR2)
- inputDecimal()      → add a decimal point, once per number (EC2)
- inputOperator(op)   → set +, -, *, / ; replaces a previous operator (EC3);
                        evaluates any pending operation first (FR4)
- calculate()         → compute the result (FR1)
- clear()             → reset everything
- backspace()         → remove the last character; shows "0" if empty
- display()           → returns the string to show on screen

## Implementation Notes
- Store the current input as a string to preserve things like "0." and "1.50".
- Never use eval() (NFR2). Use a simple switch on the operator.
- Round results with Number(result.toPrecision(12)) (EC4).
- If dividing by 0, set display to "Error" (EC1). The next key press resets it.

## Spec Coverage
- FR1, FR4, EC1–EC4, AC1–AC4 → calculator.js + tests
- FR2, FR3                   → index.html + ui.js
- NFR1                       → style.css
- NFR2                       → whole project

## Deployment
Static hosting (GitHub Pages or Netlify). No server needed.
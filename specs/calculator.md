# Calculator Spec

## Purpose
A browser-based calculator for basic arithmetic.

## Functional Requirements
- FR1: Supports +, −, ×, ÷ on decimal numbers
- FR2: Buttons for digits 0–9, decimal point, operators, equals, clear (C), backspace (⌫)
- FR3: Keyboard input works (digits, + - * /, Enter, Backspace, Escape)
- FR4: Chained operations evaluate left to right (2 + 3 × 4 = 20)

## Edge Cases
- EC1: Division by zero shows "Error", never "Infinity"
- EC2: Only one decimal point per number
- EC3: Pressing an operator twice replaces the first one
- EC4: Floating-point results are rounded (0.1 + 0.2 = 0.3)

## Non-Functional Requirements
- NFR1: Works on screens as narrow as 320px
- NFR2: No external dependencies, no use of eval()

## Acceptance Criteria
- AC1: Press 7, +, 5, = → display shows "12"
- AC2: Press 5, ÷, 0, = → display shows "Error"
- AC3: Press 0, ., 1, +, 0, ., 2, = → display shows "0.3"
- AC4: Press 9, ⌫ → display shows "0"

## Out of Scope
Scientific functions, history, memory buttons, themes.
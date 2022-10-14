let activeOperator, firstInput, secondInput, result, isFirstInput = true
const handleEvent = (value, e) => {
  switch(value) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '0':
    case '.': return handleNumber(value)
    case '+':
    case '-':
    case '*':
    case '÷':
    case 'x':
    case '/': return handleOperator(e, value)
    case '=': return handleEquals()
    case 'AC': return handleClear()
    case '%': return handlePercentage()
    case '+/-': return reverseNumberSign()
    case 'Enter': return handleEquals()
    default: return
  }
}
const handleNumber = n => {
  const display = document.querySelector('#display-bottom')
  if(display.innerText.includes('.') && n === '.') return
  if(!isFirstInput && !secondInput || result) {
    display.innerText = 0
    result = null
  }
  let text = display.innerText === '0' && n !== '.' ? n : display.innerText + n
  isFirstInput ? firstInput = text : secondInput = text
  updateDisplay(text)
  clearHighlights()
}
const handleOperator = (e, o) => {
  clearHighlights()
  handleEquals()
  if(result) firstInput = result
  activeOperator = o
  isFirstInput = false
  e?.target.classList.add('active')
}
const clearHighlights = () => document.querySelectorAll('.btn').forEach(button => button.classList.remove('active'))
const handleEquals = () => {
  if(!firstInput || !secondInput) return
  result = eval(firstInput, secondInput)
  updateDisplay(result.toString().slice(0, 11))
  clearHighlights()
  activeOperator = null
  firstInput = ''
  secondInput = ''
  isFirstInput = true
}
const eval = (firstInput, secondInput) => {
  switch(activeOperator) {
    case '+': return Number(firstInput) + Number(secondInput)
    case '-': return Number(firstInput) - Number(secondInput)
    case '*':
    case 'x': return Number(firstInput) * Number(secondInput)
    case '/':
    case '÷': return Number(firstInput) / Number(secondInput)
    default: return
  }
}
const handleClear = () => {
  activeOperator = null
  firstInput = null
  secondInput = null
  result = null
  isFirstInput = true
  clearHighlights()
  updateDisplay(0)
}
const handlePercentage = () => {
  if(isFirstInput) {
    firstInput = Number(firstInput) / 100
    updateDisplay(firstInput )
  } else {
    secondInput = Number(secondInput) / 100
    updateDisplay(secondInput )
  }
}
const reverseNumberSign = () => {
  if (isFirstInput) {
    firstInput = firstInput > 0 ? Number(firstInput) * -1 : Math.abs(Number(firstInput))
    updateDisplay(firstInput)
  } else {
    secondInput = secondInput > 0 ? Number(secondInput) * -1 : Math.abs(Number(secondInput))
    updateDisplay(secondInput)
  }
}
const updateDisplay = val => document.querySelector('#display-bottom').innerText = val
document.querySelectorAll('.btn').forEach(btn => btn.addEventListener('click', e => handleEvent(e.target.innerText, e)))
document.addEventListener('keydown', e => handleEvent(e.key))
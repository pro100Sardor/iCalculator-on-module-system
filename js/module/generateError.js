export default function(errorType, errorIndicatingElement) {
  let elErrorMessage = document.createElement('p');
  elErrorMessage.classList.add('alert', 'alert-danger', 'my-3');

  switch(errorType) {
    case 'operandsAreNotIncluded':
      elErrorMessage.textContent = 'enter a number in the fields to perform the calculation';
      break;

    case 'divideByZero':
      elErrorMessage.textContent = `The number ${elFirstOperandInput.value} cannot be divided by 0`;
      break;

    default:
      elErrorMessage.textContent = '';
  }

  errorIndicatingElement.appendChild(elErrorMessage);
}
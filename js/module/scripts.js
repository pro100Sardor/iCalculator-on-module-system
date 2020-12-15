import { Calculation } from './calculation.js'

import {prototypeElement as calculationPrototype} from './prototypeElement.js';

calculationPrototype(Calculation);

let elSiteMain = document.querySelector('#siteMain');

let elCalculatorForm = elSiteMain.querySelector('#calculatorForm');
let elFirstOperandInput = elCalculatorForm.querySelector('#firstOperandInput');
let elSecondOperandInput = elCalculatorForm.querySelector('#secondOperandInput');
let elOperatorSelector = elCalculatorForm.querySelector('#operatorSelector');

let elErrorBox = document.querySelector('#errorBox');

let elCalculationResult = elSiteMain.querySelector('#calculationResult');

// foydalanuvchi sahifadan chiqib yana qaytib kirsa ham uning oxirgi ishlagan hisob kitobi turgan bo'lishi uchun yozilgan script
if(
  localStorage.getItem('firstOperandInput') != null
  &&
  localStorage.getItem('secondOperandInput') != null
) {
  elFirstOperandInput.value = localStorage.getItem('firstOperandInput');
  elSecondOperandInput.value = localStorage.getItem('secondOperandInput');
}

import { default as generatingError } from './generateError.js';

function calculationOfValues(evt) {
  evt.preventDefault();

  elErrorBox.innerHTML = '';

  // ikkita inputga ham ma'lumot kiritilmaslik, yoki ma'lumotlar local storageda bo'lsayu uni inputlardan ongli ravishda o'chirib ishlatish holati uchun foydalanuvchiga habar yuborish sharti
  if(elFirstOperandInput.value.trim() === '' && elSecondOperandInput.value.trim() === '') {
    generatingError('operandsAreNotIncluded', elErrorBox);
    elCalculationResult.innerHTML = '<span class="text-muted">Result</span>';
    return;
  }

  const firstOperandInput = elFirstOperandInput.value.trim() || localStorage.getItem('firstOperandInput');
  const secondOperandInput = elSecondOperandInput.value.trim() || localStorage.getItem('secondOperandInput');

  // ikkala inputga qiymat kiritilmay qolish holati tekshirildi
  if (firstOperandInput === '' || secondOperandInput === '' || firstOperandInput == null || secondOperandInput == null) {
    generatingError('operandsAreNotIncluded', elErrorBox);
    return;
  }

  // mahraj 0 bo'lib qolish holat bo'lmasligi uchun tekshiruv qo'yildi
  if (secondOperandInput === '0' && elOperatorSelector.value === 'division') {
    generatingError('divideByZero', elErrorBox);
    return;
  }

  localStorage.setItem('firstOperandInput', firstOperandInput);
  localStorage.setItem('secondOperandInput', secondOperandInput);

  const operatorSelector = elOperatorSelector.value;
  let calculationResult = 0;
  let operatorType = '';

  const calculator = new Calculation(Number(firstOperandInput), Number(secondOperandInput));

  switch(operatorSelector) {
    case 'division':
      calculationResult = calculator.division();
      operatorType = '/';
      break;

    case 'multiplication':
      calculationResult = calculator.multiplication();
      operatorType = '*';
      break;

    case 'subtraction':
      calculationResult = calculator.subtraction();
      operatorType = '-';
      break;

    case 'addition':
      calculationResult = calculator.addition();
      operatorType = '+';
      break;

    case 'modulus':
      calculationResult = calculator.modulus();
      operatorType = '%';
      break;

    case 'exponentiation':
      calculationResult = calculator.exponentiation();
      operatorType = '**';
      break;

    default:
      elErrorMessage.textContent = 'non-existent operator selected, please select an existing operator in the list';
      return;
  }

  elCalculationResult.innerHTML =
  `
    <span>${firstOperandInput} ${operatorType} ${secondOperandInput} =</span>
    <span class="display-4 pr-3">${calculationResult.toFixed(2)}</span>
  `;

  elFirstOperandInput.value = localStorage.getItem('firstOperandInput');
  elSecondOperandInput.value = localStorage.getItem('secondOperandInput');

  elFirstOperandInput.focus();
}

elCalculatorForm.addEventListener('submit', calculationOfValues);
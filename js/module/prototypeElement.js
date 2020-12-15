export function prototypeElement(prototypeObject) {
  prototypeObject.prototype.division = function() {return this.firstOperand / this.secondOperand;}
  prototypeObject.prototype.multiplication = function() {return this.firstOperand * this.secondOperand;}
  prototypeObject.prototype.subtraction = function() {return this.firstOperand - this.secondOperand;}
  prototypeObject.prototype.addition = function() {return this.firstOperand + this.secondOperand;}
  prototypeObject.prototype.modulus = function() {return this.firstOperand % this.secondOperand;}
  prototypeObject.prototype.exponentiation = function() {return this.firstOperand ** this.secondOperand;}
}
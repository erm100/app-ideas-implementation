import {decorate, observable, action} from 'mobx';
import mathString from 'math-string';

class State {

  constructor(state={}) {
    this.input = state.input || "0";
  }

  clear() {
    this.input = '0';
  }

  type(data) {
    if (this.input === '0') {
      this.input = data;
    } else {
      this.input += data;
    }
  }

  priority() {
    const selector = this.input.match(/[\(\)]/g);

    if (!selector || selector.pop() === ')') {
      data = '(';
    } else {
      data = ')';
    }

    this.type(data);
  }

  backspace() {
    if (
      this.input === 'Infinity' ||
      this.input === '-Infinity' ||
      this.input === 'NaN' ||
      this.input === 'undefined'
    ) {
      this.clear();
    } else {
      this.input = this.input.slice(0, -1);
    }

    if (!this.input) {
      this.clear();
    }
  }

  calculate() {
    try {
      const calc = mathString;
      this.input = "" + calc(this.input);
    } catch (ignore) {
      this.clear();
    }
  }

  invert() {

    if (this.input === '0') {
      return;
    }

    let lastOperator = this.input.match(/[0-9\.]+$/);

    if (lastOperator) {
      lastOperator = lastOperator[0];
      const length = this.input.length;

      const operator = this.input[length - lastOperator.length - 1];
      
      let tmp;
      if (operator === '-') {
        tmp = this.input.slice(0, length - lastOperator.length - 1);
        this.input = `${tmp}+${lastOperator}`;
      } else if (operator === '+') {
        tmp = this.input.slice(0, length - lastOperator.length - 1);
        this.input = `${tmp}-${lastOperator}`;
      } else {
        this.input = this.input.replace(lastOperator, `-${lastOperator}`);
      }

    }
  }
}

decorate(State, {
  input: observable,
  clear: action,
  type: action,
  backspace: action,
  calculate: action,
  invert: action,
});

export const state = new State();

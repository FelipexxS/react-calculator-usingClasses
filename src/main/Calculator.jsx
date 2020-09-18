import React, { Component } from 'react';
import './Calculator.css';

import Button from '../Components/Button';
import Display from '../Components/Display';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {
    constructor() {
        super();
        this.state = { ...initialState };
    }

    clearMemory = () => {
        this.setState({ ...initialState })
    }

    setOperation = (operation) => {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true });
        }
         else {
            let finishOp = operation === '=';
            const currentOp = this.state.operation;
            
            const values = [ ...this.state.values ];
            
            switch (currentOp) {
                case '+':
                    values[0] += values[1];
                    break;
                case '-':
                    values[0] -= values[1];
                    break;
                case 'X':
                    values[0] *= values[1];
                    break;
                case '÷':
                    values[0] /= values[1];
                    values[0] = parseFloat(values[0].toFixed(3));
                    break;
                case '%':
                    values[0] *= values[1] / 100;
                    break;
                default:
                    break;
            }

            this.setState({
                displayValue: values[0].toString(),
                operation: finishOp ? null : operation,
                clearDisplay: !finishOp,
                current: finishOp ? 0 : 1,
                values,
            })
        }
    }

    addDigit = (n) => {
        // Verifica se o numero ja possui um ponto
        if (n === '.' && this.state.displayValue.includes('.')) return;

        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + n;
        this.setState({ displayValue, clearDisplay: false });

        const i = this.state.current;
        const newValue = parseFloat(displayValue);
        const values = [ ...this.state.values ];
        if (n !== '.') {
            // Armazena no i o indice do array value
            values[i] = newValue;
            this.setState({ values });
            console.log(values);
        }
        if (n === '±') {
            values[i] *= -1;
            this.setState({displayValue: values[i].toString(), values });
        }
    }

    render() {
        const { displayValue } = this.state;
        return (
            <div className="calculator">
                <Display className="calculator" value={displayValue} />
                <Button label="AC" click={this.clearMemory} 
                />
                <Button label="±" click={this.addDigit} 
                />
                <Button label="%" click={this.setOperation} 
                />
                <Button label="÷" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="X" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />

            </div>
        )
    };
}


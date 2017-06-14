import React, { Component } from 'react';
import Result from './Result';

class Calculator extends Component {
    constructor() {
        super();
        this.state = {
            currency: 'gbp',
            initialAmount: 900,
            interestRate: 5,
            calculatedFor: 4,
            timeSpan: 'months',
            show: false,
            interest: [],
            balance: [],
            total: 1060,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setCurrency = this.setCurrency.bind(this);
    }

    setCurrency(e) {
        this.setState({ currency: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        let intr = this.state.interest;
        let initialAmount = this.state.initialAmount;

        //let isYearly = false;
        let perYear = false;

        let interest = [];
        let balance = [];
        //
        /*
        switch (this.state.calculated) {
            case 'yearly':
                isYearly = true
                console.log('yearly');
                break;
            case 'monthly':
                console.log('monthly');
                break;
            default:
                console.log('You have to choose how the interest is calculated');
        }
        */

        switch (this.state.timeSpan) {
            case 'years':
                perYear = true;
                console.log(this.state.calculatedFor + ' months');
                break;
            case 'months':
                console.log(this.state.calculatedFor + ' months');
                break;
            default:
                console.log('No timeSpan');
        }

        if (perYear) {
            for (let i = 0; i < this.state.calculatedFor * 12; i++) {

                interest.push(parseFloat(initialAmount) * 5 / 100);

                initialAmount = initialAmount + interest;
                balance.push(initialAmount);
            }
        } else {
            for (let i = 0; i < this.state.calculatedFor; i++) {
                let temp = parseFloat(initialAmount) * 5 / 100;
                interest.push(temp);

                initialAmount = initialAmount + temp;
                balance.push(initialAmount);
            }
        }
        //
        console.log(interest);
        console.log(balance);
        this.setState({
            show: 1,
            total: initialAmount,
            interest: interest,
            balance: balance,
        })
    }

    render() {
        return (
            <div className="object-wrapper padding">
                <form onSubmit={this.handleSubmit}>
                    <div className="column">
                        <label>Currency</label>
                        <select
                            type="dropdown"
                            ref="currency"
                            placeholder="Choose currency"
                            onChange={this.setCurrency}>
                            <option value="gbp">Pound</option>
                            <option value="usd">Dollar</option>
                            <option value="eur">Euro</option>
                        </select>

                        <label>Initial Amount</label>
                        <input type="number"
                            step="0.01"
                            ref="initialAmount" />

                        <label>Interest rate<span style={{ color: 'lightgrey' }}>%</span></label>
                        <input type="number"
                            step="0.01"
                            ref="interestRate" />
                        
                        <div className="row">
                            <div className="column">
                                <label>Calculated For</label>
                                <input type="calculatedFor"
                                       step="0.01"
                                       ref="numberOf" />
                            </div>
                            <select type="dropdown"
                                    ref="timeSpan">
                                <option value="months">Months</option>
                                <option value="years">Years</option>
                            </select>
                        </div>

                        <input
                            type="submit"
                            value="Calculate"
                            className="btn"/>

                        {this.state.show ? <Result currency={this.state.currency}
                            interest={this.state.interest}
                            balance={this.state.balance}
                            total={this.state.total} /> : null}
                    </div>
                </form>
            </div>
        );
    }
}

export default Calculator;
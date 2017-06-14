import React, { Component } from 'react';
import Result from './Result';

class Calculator extends Component {
    constructor() {
        super();
        this.state = {
            currency: 'gbp',//'gbp',
            initialAmount: 0,//900,
            interestRate: 5,
            calculatedFor: 2,
            timeSpan: 'years',
            show: false,
            interest: [],
            balance: [],
            total: 1060,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setCurrency = this.setCurrency.bind(this);
    }

    render() {
        return (
            <div className="object-wrapper padding">
                <form onSubmit={this.handleSubmit}>
                    <div className="column">
                        <label>Currency</label>

                        <select 
                            onChange={this.setCurrency}
                            defaultValue="gbp" >
                            <option selected value="gbp">Pound</option>
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
                                <input type="number"
                                    step="0.01"
                                    ref="calculatedFor" />
                            </div>
                            <select
                                defaultValue="months" 
                                type="dropdown"
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
    setCurrency(e) {
        this.setState({ currency: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        let intr = parseInt(this.refs.interestRate.value);//this.state.interest;
        let initialAmount = parseInt(this.refs.initialAmount.value);//parseFloat(this.state.initialAmount.toFixed(2));

        let interests = [];
        let balance = [];

        if (this.refs.timeSpan.value.match('years')) {
            for (let i = 0; i < this.refs.calculatedFor.value * 12; i++) {
                let interest = (initialAmount * intr) / 100;
                interests.push(interest);
                initialAmount += interest;
                balance.push(initialAmount);
            }
        } else {
            console.log("months");
            for (let i = 0; i < this.refs.calculatedFor.value; i++) {
                let interest = (initialAmount * intr) / 100;
                interests.push(interest);
                initialAmount += interest;
                balance.push(initialAmount);
            }
        }
        this.setState({
            show: 1,
            total: initialAmount - this.refs.initialAmount.value,
            interest: interests,
            balance: balance,
        })
    }
}

export default Calculator;
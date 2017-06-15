import React, { Component } from 'react';
import Result from './Result';

class Calculator extends Component {
    constructor() {
        super();
        this.state = {
            currency: 'gbp',
            initialAmount: 0,
            interestRate: 0,
            calculatedFor: 0,
            timeSpan: '',
            show: false,
            interest: [],
            balanceList: [],
            total: 1060,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setCurrency = this.setCurrency.bind(this);
    }

    render() {
        return (
            <div className="object-wrapper padding">
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="one-third column">
                            <label>Currency</label>
                            <select
                                onChange={this.setCurrency}
                                defaultValue="gbp" required>
                                <option value="gbp">Pound</option>
                                <option value="usd">Dollar</option>
                                <option value="eur">Euro</option>
                            </select>

                            <label>Interest rate<span style={{ color: 'lightgrey' }}>%</span></label>
                            <input type="number"
                                step="0.01"
                                ref="interestRate"  required/>
                            <input
                                type="submit"
                                value="Calculate"
                                className="btn"/>
                        </div>
                        <div className="two-thirds column">
                            <label>Initial Amount</label>
                            <input type="number"
                                step="0.01"
                                ref="initialAmount"  required/>
                            <label>Calculated for</label>
                            <div className="row">
                                <input type="number"
                                    step="0.01"
                                    ref="calculatedFor"  required/>
                                <select
                                    defaultValue="months"
                                    type="dropdown"
                                    ref="timeSpan" required>
                                    <option value="months">Months</option>
                                    <option value="years">Years</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
                {this.state.show ? <Result currency={this.state.currency}
                    interest={this.state.interest}
                    balance={this.state.balanceList}
                    total={this.state.total} /> : null}
            </div>
        );
    }
    setCurrency(e) {
        this.setState({ currency: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        let intr = parseInt(this.refs.interestRate.value, 10);
        let initialAmount = parseInt(this.refs.initialAmount.value, 10);
        let months = this.refs.calculatedFor.value;

        let monthlyInterest = [];
        let balanceList = [];

        if (this.refs.timeSpan.value.match('years')) {
            months *= 12;
        }

        for (let i = 0; i < months; i++) {
            let interest = (initialAmount * intr) / 100;
            monthlyInterest.push(interest);
            initialAmount += interest;
            balanceList.push(initialAmount);
        }

        this.setState({
            show: 1,
            total: initialAmount - this.refs.initialAmount.value,
            interest: monthlyInterest,
            balanceList: balanceList,
        })
    }
}

export default Calculator;
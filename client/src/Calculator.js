import React, { Component } from 'react';
import Result from './Result';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
        currency: '', //['dollar', 'pound'],
        initialAmount: 0,
        interestRate: 0,
        calculatedFor: {
            no: 0,
            timeSpan: ''//['year', 'month']
        },
        calculated: '',//['monthly', 'yearly'],
        show: false,
        data: ['1', '2', '3'],
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
      this.setState({show: true})
  } 
  
  render() {
    return (
        <div className="object-wrapper padding">
            <form onSubmit={this.handleSubmit}>
                <div className="column">
                    <label>Currency</label>
                    <select type="dropdown" 
                            ref="currency">
                        <option value="dollar">Pound</option>
                        <option value="pound">Dollar</option>
                    </select>
                    
                    <label>Initial Amount</label>
                    <input type="number" step="0.01" 
                        ref="initialAmount" />

                    <label>Interest rate</label>
                    <input type="number" step="0.01" 
                        ref="interestRate" />
                    <p style={{color: 'lightgrey'}}>%</p>

                    <label>Calculated</label>
                    <select type="dropdown" 
                            ref="calculated" >
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                    <div className="row">
                        <label>Calculated For</label>
                        <input type="number" step="0.01" 
                            ref="calc" />
                        <select type="dropdown" ref="span">
                            <option value="months">Months</option>
                            <option value="years">Years</option>
                        </select>
                    </div>

                    <input
                    type="submit"
                    value="Calculate"
                    className="btn"/>

                    {this.state.show ? <Result data={this.state.data} /> : null}
                    <Result data={this.state.data} />
                </div>
            </form>
        </div>
    );
  }
}

export default Calculator;
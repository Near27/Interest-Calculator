import React, { Component } from 'react';
import axios from 'axios';

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: ['gbp', 'usd', 'eur'],
            rates: [],
            total: 0,
            totalConverted: 0,
            convertedCurrency: '',
        }
        this.fetchRates = this.fetchRates.bind(this);
        this.exchange = this.exchange.bind(this);
        this.fetchRates();
    }

    render() {
        return (
            <div className="object-wrapper padding">
            <label>Change currency</label>
                <div className="row-c-space">
                    <h1>{this.state.total.toFixed(2)}{this.getLabel(this.props.currency)}</h1>
                    <select 
                            onChange={this.exchange}
                            type="dropdown"
                            ref="currency">
                            {this.state.currencies.map((c, index) => <option key={index} value={c}>{c}</option>)}
                    </select>
                    <h1>{this.state.totalConverted.toFixed(2)}</h1>
                </div>
                <table className="result">
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Interest</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td>Total interest: </td>
                            <td>{this.state.total.toFixed(2)}{this.getLabel(this.props.currency)}</td>
                        </tr>
                    </tfoot>
                    <TableRows interest={this.props.interest} balance={this.props.balance} />
                </table>
            </div>
        );
    }

    componentDidMount(){
        let total = this.props.balance[this.props.balance.length - 1];
        this.setState({
            total: total,
            totalConverted: total,
            currencies: this.state.currencies.filter(c => c !== this.props.currency),
        })
    }

    exchange(e) {
        this.setState({totalConverted: this.state.total * this.state.rates[this.state.currencies.indexOf(e.target.value)],
            convertedCurrency: e.target.value,

                        })
    }
    
    fetchRates(e) {
        let url = 'http://localhost:3001/calculate/' + this.props.currency;

        axios.get(url)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    rates: res.data,
                })
            })
            .catch((err) => {
                console.log('Error');
            })
    }

    getLabel(input) {
        switch (this.props.currency) {
            case 'gbp':
                return <label>&#163;</label>
                break;
            case 'usd':
                return <label>&#36;</label>
                break;
            case 'eur':
                return <label>&#8364;</label>
                break;
            default:
                break;
        }
    }
}

const TableRows = (props) => (
    <tbody>
        { props.interest.map((row, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.toFixed(2)}</td>
                    <td>{props.balance[index].toFixed(2)}</td>
                </tr>
            )
          })
        }
    </tbody>
)

export default Result;
import React, { Component } from 'react';
import axios from 'axios';

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: ['gbp', 'usd', 'eur'],
            rates: [],
        }
        this.fetchRates = this.fetchRates.bind(this);
        this.exchange = this.exchange.bind(this);
    }

    fetchRates(e) {
        let url = 'http://localhost:3001/calculate/' + this.props.currency;
        console.log(url);
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

    exchange(e) {
        console.log(e.target.value);
        this.fetchRates();
        this.setState({total: parseFloat(this.state.total) * this.state.rates[0]})
    }

    render() {
        return (
            <div className="object-wrapper padding">
                <label>Result</label>
                <p>{this.state.rates}</p>
                <p>{this.props.currency}</p>
                <table className="result">
                    <thead>
                        <tr>
                            <th>Y/M</th>
                            <th>Interest</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <td>
                                <select 
                                    onChange={this.fetchRates}
                                    type="dropdown"
                                    ref="currency"
                                    placeholder="Choose currency">
                                    <option value="gbp">Pound</option>
                                    <option value="usd">Dollar</option>
                                    <option value="eur">Euro</option>
                                </select>
                            </td>
                            <td>Total interest: </td><td>{this.props.total}</td>
                        </tr>
                    </tfoot>
                    <TableRows interest={this.props.interest} balance={this.props.balance} />
                </table>
            </div>
        );
    }
}

const TableRows = (props) => (
    <tbody>
        { props.interest.map((row, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row}</td>
                    <td>{props.balance[index]}</td>
                </tr>
            )
        })
        }
    </tbody>
)

export default Result;
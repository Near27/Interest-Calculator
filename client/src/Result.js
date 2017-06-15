import React, { Component } from 'react';
import axios from 'axios';

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: ['gbp', 'usd', 'eur'],
            rates: [],
            totalConverted: 0,
        }
        this.fetchRates = this.fetchRates.bind(this);
        this.exchange = this.exchange.bind(this);
        this.fetchRates();

    }

    render() {
        return (
            <div className="object-wrapper padding">
                <div className="row-c-space">
                    <h1>{this.props.total.toFixed(2)}</h1>
                    <select 
                            onChange={this.exchange}
                            type="dropdown"
                            ref="currency">
                            {this.state.currencies.map(c => <option value={c}>{c}</option>)}
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
                            <td>
                            Total interest: </td><td>{this.props.total.toFixed(2)} <Currency currency={this.props.currency} />
                            </td>
                        </tr>
                    </tfoot>
                    <TableRows interest={this.props.interest} balance={this.props.balance} />
                </table>
            </div>
        );
    }

    componentDidMount(){
        this.setState({
            totalConverted: this.props.total,
            currencies: this.state.currencies.filter(c => c !== this.props.currency),
        })
    }

    exchange(e) {
        this.setState({totalConverted: this.props.total * this.state.rates[this.state.currencies.indexOf(e.target.value)]})
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

const Currency = (props) => (
    <div>
    {
        /*
    switch (props.currency) {
        case 'gbp':
            return <span>&pound</span>
            break;
        case 'dollar':
            return <span>&dollar</span>
            break;
        case 'euro':
            return <span>&euro</span>
            break;
        default:
            break;
    }
    */
    }
    </div>
)

export default Result;
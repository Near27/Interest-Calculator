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

    componentDidMount(){
        this.setState({
            totalConverted: this.props.total,
            currencies: this.state.currencies.filter(c => c !== this.props.currency),
        })
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
        this.setState({totalConverted: this.props.total * this.state.rates[this.state.currencies.indexOf(e.target.value)]})
    }

    render() {
        return (
            <div className="object-wrapper padding">
                <label>Result</label>
                <p>{this.state.rates}</p>
                <p>{this.props.currency}</p>
                <div className="row">
                    <p>{this.props.total.toFixed(2)}</p>
                    <select 
                                    onChange={this.exchange}
                                    type="dropdown"
                                    ref="currency"
                                    placeholder="Choose currency">
                                    {this.state.currencies.map(c => <option value={c}>{c}</option>)}
                                </select>
                    <p>{this.state.totalConverted.toFixed(2)}</p>
                </div>
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
                                
                            </td>
                            <td>Total interest: </td><td>{this.props.total.toFixed(2)}</td>
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
                    <td>{row.toFixed(2)}</td>
                    <td>{props.balance[index].toFixed(2)}</td>
                </tr>
            )
          })
        }
    </tbody>
)

export default Result;
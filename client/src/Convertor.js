import React, { Component } from 'react';
import axios from 'axios';

class Convertor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: ['gbp', 'usd', 'eur'],
            rates: [],
            total: 0,
            totalCurrency: '',
            totalConverted: 0,
            convertedCurrency: '',
        }
        this.fetchRates = this.fetchRates.bind(this);
        this.exchange = this.exchange.bind(this);
        this.fetchRates();
    }

    render() {
        return (
            <div className="row-c-space">
                <h1>Total: {this.props.total.toFixed(2) }{this.props.getLabel(this.props.currency) }</h1>
                <hr className="convertorDivider" />
                <h1>{ this.state.totalConverted.toFixed(2) }</h1>
                <select
                    onChange={this.exchange}
                    type="dropdown"
                    ref="currency">
                    {this.state.currencies.map((c, index) => <option key={index} value={c}>{c}</option>) }
                </select>
            </div>
        );
    }

    componentDidMount() {
        this.setState({
            totalCurrency: this.props.currency,
            currencies: this.state.currencies.filter(c => c !== this.props.currency),
        })
    }

    exchange(e) {
        this.fetchRates();
        this.setState({
            totalConverted: this.props.total * this.state.rates[this.state.currencies.indexOf(e.target.value)],
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
}

export default Convertor;
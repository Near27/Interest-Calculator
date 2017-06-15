import React, { Component } from 'react';
import Convertor from './Convertor';

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: ['gbp', 'usd', 'eur'],
            total: 0,
        }
    }

    render() {
        return (
            <div className="object-wrapper padding">
                <label>Change currency</label>
                <Convertor getLabel={this.getLabel} currency={this.props.currency} total={this.state.total} />
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
                            <td>{this.state.total.toFixed(2) }{this.getLabel(this.props.currency) }</td>
                        </tr>
                    </tfoot>
                    <TableRows interest={this.props.interest} balance={this.props.balance} />
                </table>
            </div>
        );
    }

    componentDidMount() {
        let total = this.props.balance[this.props.balance.length - 1];
        this.setState({total: total})
    }

    getLabel(input) {
        switch (input) {
            case 'gbp':
                return <label>&#163; </label>
            case 'usd':
                return <label>&#36; </label>
            case 'eur':
                return <label>&#8364; </label>
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
                    <td>{row.toFixed(2) }</td>
                    <td>{props.balance[index].toFixed(2) }</td>
                </tr>
            )
        })
        }
    </tbody>
)

export default Result;
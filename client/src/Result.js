import React, { Component } from 'react';

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
  }
  
  render() {
    return (
        <div className="object-wrapper padding">
            <label>Result</label>
            <p>{this.state.data}</p>
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
                    <td></td>
                    <td>Total:</td><td>0</td>
                    </tr>
                </tfoot>
                <TableRows data={this.state.data} />
            </table>
        </div>
    );
  }
}

const TableRows = (props) => (
    <tbody>
    { props.data.map((row) => {
            return (
                <tr>
                    <td></td>
                    <td>{row}</td>
                    <td>{row}</td>
                </tr>
                )
        })
    } 
    </tbody>
)

export default Result;
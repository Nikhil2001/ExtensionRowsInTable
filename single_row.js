import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

//Grouping Transactions together

var bankTransaction = require("./transaction_revolut1.json");
var paypalTransactions = [
  require("./transaction_paypal1.json"),
  require("./transaction_paypal2.json"),
  require("./transaction_paypal3.json"),
  require("./transaction_paypal4.json")
];

function makeRow(bankTransaction, paypalTransactions) {
  return {
    bankTransaction: bankTransaction,
    paypalTransactions: paypalTransactions
  };
}

var rowInTable = makeRow(bankTransaction, paypalTransactions);

class TransactionTable extends React.Component {
  constructor() {
    super();
    this.state = { showExpanded: false };
    this.clickRow = this.clickRow.bind(this);
  }

  clickRow() {
    if (this.state.showExpanded) {
      this.setState({ showExpanded: false });
    } else {
      this.setState({ showExpanded: true });
    }
  }

  render() {
    var bankTransactionRow = [
      <tr onClick={this.clickRow}>
        <td>{this.props.row.bankTransaction.description}</td>
        <td>{this.props.row.bankTransaction.category}</td>
        <td>{this.props.row.bankTransaction.amount}</td>
        <td>{this.props.row.bankTransaction.made_on}</td>
      </tr>
    ];

    var paypalTransactions = [];
    if (this.state.showExpanded) {
      for (var i = 0; i < this.props.row.paypalTransactions.length; i++) {
        var paypalTransaction = (
          <tr>
            <td>{this.props.row.paypalTransactions[i].description}</td>
            <td>{this.props.row.paypalTransactions[i].category}</td>
            <td>{this.props.row.paypalTransactions[i].amount}</td>
            <td>{this.props.row.paypalTransactions[i].made_on}</td>
          </tr>
        );
        paypalTransactions.push(paypalTransaction);
      }
    }

    return (
      <table id="TransactionTable">
        <tr>
          <th>SOURCE</th>
          <th>CATEGORY</th>
          <th>AMOUNT</th>
          <th>DATE</th>
        </tr>
        {bankTransactionRow.concat(paypalTransactions)}
      </table>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <TransactionTable row={rowInTable} />
  </React.StrictMode>,
  rootElement
);

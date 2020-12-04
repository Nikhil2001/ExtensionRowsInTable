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

var rowInTable = [
  makeRow(bankTransaction, paypalTransactions),
  makeRow(bankTransaction, paypalTransactions)
];

class TransactionTable extends React.Component {
  constructor() {
    super();
    this.state = { expandedRowIds: [] };
  }

  clickRow(id) {
    var expandedRowIds = this.state.expandedRowIds;
    var isRowExpanded = expandedRowIds.includes(id);
    if (!isRowExpanded) {
      this.setState({
        expandedRowIds: expandedRowIds.concat(id)
      });
    } else {
      this.setState({
        expandedRowIds: expandedRowIds.filter(
          (expandedRowIds) => expandedRowIds !== id
        )
      });
    }
  }

  bankTransactionRow(rowId) {
    const clickRow = () => this.clickRow(rowId);
    var bankTransaction = (
      <tr onClick={clickRow}>
        <td>{this.props.rows[rowId].bankTransaction.description}</td>
        <td>{this.props.rows[rowId].bankTransaction.category}</td>
        <td>{this.props.rows[rowId].bankTransaction.amount}</td>
        <td>{this.props.rows[rowId].bankTransaction.made_on}</td>
      </tr>
    );
    return bankTransaction;
  }

  paypalTransactions(rowId) {
    var paypalTransactions = [];
    for (var i = 0; i < this.props.rows[rowId].paypalTransactions.length; i++) {
      var paypalTransaction = (
        <tr>
          <td>{this.props.rows[rowId].paypalTransactions[i].description}</td>
          <td>{this.props.rows[rowId].paypalTransactions[i].category}</td>
          <td>{this.props.rows[rowId].paypalTransactions[i].amount}</td>
          <td>{this.props.rows[rowId].paypalTransactions[i].made_on}</td>
        </tr>
      );

      paypalTransactions.push(paypalTransaction);
    }

    return paypalTransactions;
  }

  render() {
    var allrows = [];
    for (var i = 0; i < this.props.rows.length; i++) {
      allrows.push(this.bankTransactionRow(i));
      //show or hide paypal transactions
      if (this.state.expandedRowIds.includes(i)) {
        const paypalTransactionsForRow = this.paypalTransactions(i);
        for (var j = 0; j < paypalTransactionsForRow.length; j++) {
          allrows.push(paypalTransactionsForRow[j]);
        }
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
        {allrows};
      </table>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<TransactionTable rows={rowInTable} />, rootElement);

import React from 'react';
import './Wallet.css';

function Wallet() {
  const transactions = [
    { id: 1, description: 'Transaction 1', amount: 5000 },
    { id: 2, description: 'Transaction 2', amount: 3000 },
    { id: 3, description: 'Transaction 3', amount: 2000 },
    { id: 4, description: 'Transaction 4', amount: -1000 },
  ];

  const totalAmount = transactions.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="box wallet-box">
      <h1 className="box-title">Wallet</h1>
      <div className="box-content">
        <div className="wallet-details">
          <span className="total-amount">Total Amount: PKR {totalAmount}</span>
          <button className="account-statement-btn">Account Statement</button>
        </div>
        <button className="withdraw-balance-btn">Withdraw Balance</button>
        <div className="dummy-transactions">
          <h3>Dummy Transactions:</h3>
          {transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <span>{transaction.description}</span>
              <span>{transaction.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wallet;
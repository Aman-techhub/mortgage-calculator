import React, { useState } from "react";
import "./styles.css";

// Indian Rupee formatter
const formatINR = (number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(number);
};

function App() {
  const [price, setPrice] = useState(4500000);       // ₹45,00,000
  const [downPayment, setDownPayment] = useState(1350000); // ₹13,50,000
  const [years, setYears] = useState(25);
  const [interest, setInterest] = useState(3);

  const loanAmount = price - downPayment;
  const monthlyInterest = interest / 100 / 12;
  const numberOfPayments = years * 12;

  const monthlyPayment =
    loanAmount > 0
      ? (
          (loanAmount *
            monthlyInterest *
            Math.pow(1 + monthlyInterest, numberOfPayments)) /
          (Math.pow(1 + monthlyInterest, numberOfPayments) - 1)
        ).toFixed(0)
      : 0;

  return (
    <div className="container">
      <h2>Mortgage Calculator</h2>

      <label>Purchase Price: {formatINR(price)}</label>
      <input
        type="range"
        min="500000"
        max="20000000"
        step="50000"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />

      <label>Down Payment: {formatINR(downPayment)}</label>
      <input
        type="range"
        min="0"
        max={price}
        step="50000"
        value={downPayment}
        onChange={(e) => setDownPayment(Number(e.target.value))}
      />

      <label>Repayment Time: {years} years</label>
      <input
        type="range"
        min="5"
        max="40"
        value={years}
        onChange={(e) => setYears(Number(e.target.value))}
      />

      <label>Interest Rate: {interest}%</label>
      <input
        type="range"
        min="1"
        max="10"
        step="0.1"
        value={interest}
        onChange={(e) => setInterest(Number(e.target.value))}
      />

      <div className="results">
        <p>
          Loan Amount: <strong>{formatINR(loanAmount)}</strong>
        </p>
        <p>
          Estimated Monthly EMI:{" "}
          <strong>{formatINR(monthlyPayment)}</strong>
        </p>
      </div>

      <button>Get a mortgage quote</button>
    </div>
  );
}

export default App;

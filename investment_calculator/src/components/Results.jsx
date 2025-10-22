import {calculateInvestmentResults, formatter} from '../util/investment.js';

export default function Results({input}){
    const dataResults = calculateInvestmentResults(input);
    const initialInvestment = dataResults[0].valueEndOfYear - dataResults[0].interest - input.annualInvestment;

    return (
       <table id="result">
        <thead>
            <tr>
                <th>Year</th>
                <th>Investment value</th>
                <th>Interest (Year)</th>
                <th>Total Interest</th>
                <th>Investment Capital</th>
            </tr>
        </thead>
        <tbody>
            {dataResults.map(yearData => {
                const totalInterest = yearData.valueEndOfYear - yearData.annualInvestment * yearData.year - initialInvestment;
                const totalAmountInvested = yearData.valueEndOfYear - totalInterest;
                return <tr key={yearData.year}>
                    <td>{yearData.year}</td>
                    <td>{formatter.format(yearData.valueEndOfYear)}</td>
                    <td>{formatter.format(yearData.interest)}</td>
                    <td>{formatter.format(totalInterest)}</td>
                    <td>{formatter.format(totalAmountInvested)}</td>
                </tr>
            })}
        </tbody>
       </table>
    );
}
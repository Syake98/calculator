import styles from './App.module.css';
import { useState } from 'react';
import { createElement } from 'react';

function App() {
	const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	const operators = ['+', '-', '=', 'C'];

	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');

	function handleOperand(event) {
		if (operator) {
			setOperand2((prev) => (prev += event.target.textContent));
		} else {
			setOperand1((prev) => (prev += event.target.textContent));
		}
	}

	function handleOperator(event) {
		if (event.target.textContent === 'C') {
			setOperand1('');
			setOperand2('');
			setOperator('');
		} else if (event.target.textContent === '=') {
			if (operator === '-') {
				setOperand1((operand1) => (operand1 = +operand1 - +operand2));
				setOperand2('');
				setOperator('');
			} else if (operator === '+') {
				setOperand1((operand1) => (operand1 = +operand1 + +operand2));
				setOperand2('');
				setOperator('');
			}
		} else if (event.target.textContent === '+' || event.target.textContent === '-') {
			setOperator(event.target.textContent);
		}
	}

	return (
		<div className={styles.container}>
			<input
				type="text"
				defaultValue={operand1 + operator + operand2}
				className={styles.input}
			/>
			<div>
				{numbers.map((num) => {
					return (
						<button
							className={styles.button}
							onClick={handleOperand}
							key={num}
						>
							{num}
						</button>
					);
				})}
				{operators.map((operator) => {
					return (
						<button
							className={styles.button}
							onClick={handleOperator}
							key={operator}
						>
							{operator}
						</button>
					);
				})}
			</div>
		</div>
	);
}

export default App;

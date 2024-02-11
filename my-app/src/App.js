import styles from './App.module.css';
import { useState } from 'react';

function App() {
	const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
	const operators = ['+', '-', 'C', '='];

	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [isResult, setIsResult] = useState(false);

	function handleOperand(event) {
		console.log('op1', operand1, 'op2', operand2, 'oper', operator);
		setIsResult((prev) => (prev = false));
		if (operator) {
			if (operand2.startsWith('0')) {
				setOperand2(event.target.textContent);
			} else {
				setOperand2((prev) => (prev += event.target.textContent));
			}
		} else {
			if (operand1.startsWith('0')) {
				setOperand1(event.target.textContent);
			} else {
				setOperand1((prev) => (prev += event.target.textContent));
			}
		}
	}

	function handleOperator(event) {
		setIsResult((prev) => (prev = false));
		if (operand1 && (event.target.textContent === "+" || event.target.textContent === "-")) {
			setOperator(event.target.textContent);
		}

		if (event.target.textContent === 'C') {
			setOperand1('');
			setOperand2('');
			setOperator('');
		}

		if (event.target.textContent === '=' && operand1 && operand2) {
			setIsResult(!isResult);
			if (operator === '-') {
				setOperand1((operand1) => `${(operand1 = +operand1 - +operand2)}`);
				setOperand2('');
				setOperator('');
			} else if (operator === '+') {
				setOperand1((operand1) => `${(operand1 = +operand1 + +operand2)}`);
				setOperand2('');
				setOperator('');
			}
		}
	}

	return (
		<div className={styles.container}>
			<input
				type="text"
				defaultValue={operand1 + operator + operand2}
				className={isResult ? styles.responsedInput : styles.standartInput}
				readonly="readonly"
			/>
			<div className={styles.buttons}>
				<div className={styles.numButtons}>
					{numbers.map((num) => {
						return (
							<button
								className={styles.numButton}
								onClick={handleOperand}
								key={num}
							>
								{num}
							</button>
						);
					})}
				</div>
				<div className={styles.operatorButtons}>
					{operators.map((operator) => {
						return (
							<button
								className={styles.operatorButton}
								onClick={handleOperator}
								key={operator}
							>
								{operator}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default App;

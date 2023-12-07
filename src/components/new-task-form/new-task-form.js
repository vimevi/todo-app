import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default function NewTaskForm({ onItemAdded }) {
	const [label, setLabel] = useState('');
	const [min, setMin] = useState('');
	const [sec, setSec] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
		if (label.trim() === '') {
			return;
		}
		onItemAdded(label, parseInt(min, 10) || 0, parseInt(sec, 10) || 0);

		setLabel('');
		setMin('');
		setSec('');
	};

	const onLabelChange = (e) => {
		setLabel(e.target.value);
	};

	const onMinChange = (e) => {
		setMin(e.target.value);
	};

	const onSecChange = (e) => {
		setSec(e.target.value);
	};

	return (
		<form className="new-todo-form" onSubmit={onSubmit}>
			<input
				value={label}
				onChange={onLabelChange}
				className="new-todo"
				placeholder="Task"
				autoFocus
				required
			></input>
			<input
				type="number"
				max={1438}
				min={1}
				className="new-todo-form__timer"
				onChange={onMinChange}
				placeholder="Min"
				value={min}
				pattern="[0-9]*"
				inputMode="numeric"
			></input>
			<input
				type="number"
				max={119}
				min={1}
				className="new-todo-form__timer"
				onChange={onSecChange}
				placeholder="Sec"
				value={sec}
				pattern="[0-9]*"
				inputMode="numeric"
			></input>
			<button type="submit"></button>
		</form>
	);
}

NewTaskForm.propTypes = {
	onItemAdded: PropTypes.func.isRequired,
};

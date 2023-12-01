import React from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends React.Component {
	state = {
		label: '',
		min: '',
		sec: '',
	};

	static propTypes = {
		onItemAdded: PropTypes.func.isRequired,
	};

	onSubmit = (e) => {
		e.preventDefault();
		if (this.state.label.trim() === '') {
			return;
		}
		this.props.onItemAdded(
			this.state.label,
			parseInt(this.state.min, 10) || 0,
			parseInt(this.state.sec, 10) || 0,
		);

		this.setState({
			label: '',
			min: '',
			sec: '',
		});
	};

	onLabelChange = (e) => {
		this.setState({
			label: e.target.value,
		});
	};

	onMinChange = (e) => {
		this.setState({
			min: e.target.value,
		});
	};

	onSecChange = (e) => {
		this.setState({
			sec: e.target.value,
		});
	};
	render() {
		return (
			<form className="new-todo-form" onSubmit={this.onSubmit}>
				<input
					value={this.state.label}
					onChange={this.onLabelChange}
					className="new-todo"
					placeholder="Task"
					autoFocus
					required
				></input>
				<input
					className="new-todo-form__timer"
					onChange={this.onMinChange}
					placeholder="Min"
					value={this.state.min}
					pattern="[0-9]*"
					inputMode="numeric"
				></input>
				<input
					className="new-todo-form__timer"
					onChange={this.onSecChange}
					placeholder="Sec"
					value={this.state.sec}
					pattern="[0-9]*"
					inputMode="numeric"
				></input>
				<button type="submit"></button>
			</form>
		);
	}
}

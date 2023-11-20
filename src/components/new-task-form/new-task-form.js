import React from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends React.Component {
	state = {
		label: '',
	};

	static propTypes = {
		onItemAdded: PropTypes.func.isRequired,
	};

	onSubmit = (e) => {
		e.preventDefault();
		if (this.state.label.trim() === '') {
			return; // Запретил добавление таски с одними пробелами.
		}
		this.props.onItemAdded(this.state.label);
		this.setState({
			label: '',
		});
	};

	obLabelChange = (e) => {
		this.setState({
			label: e.target.value,
		});
	};
	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<input
					value={this.state.label}
					onChange={this.obLabelChange}
					className="new-todo"
					placeholder="What needs to be done?"
					autoFocus
					required
				></input>
			</form>
		);
	}
}

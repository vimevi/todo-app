import React from 'react';
import './new-task-form.css';

export default class NewTaskForm extends React.Component {
	state = {
		label: '',
	};

	onSubmit = (e) => {
		e.preventDefault();
		if (this.state.label === '') {
			return; // Нашел такой способ запретить сабмит пустой формы
		}
		this.props.onItemAdded(this.state.label);
		this.setState({
			label: '',
		});
	};

	obLabelChange = (e) => {
		// console.log(e.target.value);
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
				></input>
			</form>
		);
	}
}

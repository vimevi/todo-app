import React from 'react';
import './new-task-form.css';

class NewTaskForm extends React.Component {
	obLabelChange = (e) => {
		// console.log(e.target.value);
	};
	render() {
		return (
			<input
				onChange={this.obLabelChange}
				className="new-todo"
				placeholder="What needs to be done?"
				autoFocus
			></input>
		);
	}
}

export default NewTaskForm;

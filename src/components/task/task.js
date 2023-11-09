import React, { Component } from 'react';
import { formatDistance, subDays } from 'date-fns';
import './task.css';

export default class Task extends Component {
	state = {
		done: false,
		// date: new Date(),
	};

	timeFromCreate = () => {
		const createdTime = new Date();
		return createdTime;
	};
	onLabelClick = () => {
		// console.log(`Done: ${this.props.label}`);
		this.setState((state) => ({
			done: !state.done,
		}));
	};
	onCheckboxChange = (e) => {
		this.setState({
			done: e.target.checked,
		});
	};
	destroyTask = () => {
		console.log(this.props.label, 'destroyed');
	};

	editTask = () => {
		console.log(this.props.label, 'is editing');
	};
	render() {
		const { label } = this.props;
		const { done } = this.state;
		let classNames = '';
		if (done) {
			classNames += 'completed';
		}

		return (
			<li className={classNames}>
				<div className="view">
					<input
						onClick={this.onLabelClick}
						className="toggle"
						type="checkbox"
						onChange={this.onCheckboxChange}
						checked={done}
					/>
					<label>
						<span className="description" onClick={this.onLabelClick}>
							{label}{' '}
						</span>
						<span className="created">created {0} seconds ago</span>
					</label>
					<button className="icon icon-edit" onClick={this.editTask} />
					<button className="icon icon-destroy" onClick={this.destroyTask} />
				</div>
				<input
					onClick={(e) => {
						if (e.keyCode === 13) {
							console.log('enter pressed');
						}
					}}
					type="text"
					className="edit"
					defaultValue="Editing task"
				/>
			</li>
		);
	}
}

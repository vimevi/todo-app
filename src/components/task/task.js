import { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

export default class Task extends Component {
	state = {
		editing: false,
		editText: this.props.label,
		labelValue: this.props.label,
		elapsedSeconds: 0,
		elapsedPaused: false,
	};

	static defaultProps = {
		label: 'no text',
		done: false,
		visible: true,
	};

	static propTypes = {
		onDeleted: PropTypes.func.isRequired,
		onToggleDone: PropTypes.func.isRequired,
		dateCreated: PropTypes.object.isRequired,
		label: PropTypes.string,
		done: PropTypes.bool,
		visible: PropTypes.bool,
		timeElapsed: PropTypes.string,
	};

	timeFromCreate = () => {
		const createdTime = new Date();
		return createdTime;
	};

	onCheckboxChange = (e) => {
		this.setState({
			done: e.target.checked,
		});
	};

	onLabelChange = () => {
		this.setState(
			(prevState) => ({
				editing: !prevState.editing,
				editText: !prevState.editing ? this.props.label : prevState.labelValue,
			}),
			() => {
				if (this.state.editing) {
					this.editInput.focus();
				}
			},
		);
	};

	handleEditInputChange = (e) => {
		const newText = e.target.value;
		this.setState((prevState) => ({
			labelValue: newText.trim() !== false ? newText : prevState.labelValue,

			editText: newText,
		}));
	};

	handleEditInputBlur = () => {
		this.setState({
			editing: false,
		});
	};

	handleEditInputKeyDown = (e) => {
		if (e.key === 'Enter') {
			this.setState({
				editing: false,
			});
		}
		if (e.key === 'Escape') {
			this.setState({
				editing: false,
			});
		}
	};
	componentDidMount() {
		this.timerInterval = setInterval(() => {
			if (!this.state.elapsedPaused) {
				this.setState((prevState) => ({
					elapsedSeconds: prevState.elapsedSeconds + 1,
				}));
			}
		}, 1000);
	}
	componentWillUnmount() {
		clearInterval(this.timerInterval);
	}

	render() {
		const { onDeleted, onToggleDone, done, dateCreated } = this.props;

		let classNames = '';
		classNames += done ? 'completed' : '';

		const createdTime = formatDistanceToNow(dateCreated, { addSuffix: true });
		const elapsedMinutes = Math.floor(this.state.elapsedSeconds / 60);
		const elapsedSeconds = this.state.elapsedSeconds % 60;

		return (
			<li className={classNames}>
				<div className="view">
					<input
						onClick={onToggleDone}
						className="toggle"
						type="checkbox"
						onChange={this.onCheckboxChange}
						checked={done}
					/>

					<label>
						<span
							className="description"
							onClick={() => {
								if (!this.state.editing) {
									onToggleDone();
								}
							}}
						>
							{this.state.editing ? (
								<input
									type="text"
									className="edit-input"
									onChange={this.handleEditInputChange}
									onBlur={this.handleEditInputBlur}
									onKeyDown={this.handleEditInputKeyDown}
									value={this.state.labelValue}
									ref={(input) => {
										this.editInput = input;
									}}
								/>
							) : (
								<>
									<span className="label">{this.state.labelValue}</span>
								</>
							)}
						</span>
						<span className="created">created {createdTime}</span>
					</label>

					<div className="timer-container">
						<span className="timer-buttons">
							{' '}
							<button
								className="icon icon-pause"
								onClick={() => {
									this.setState({ elapsedPaused: true });
								}}
							/>
							<button
								className="icon icon-play"
								onClick={() => {
									this.setState({ elapsedPaused: false });
								}}
							/>
						</span>
						<span className="timer">
							{elapsedMinutes}:
							{elapsedSeconds < 10 ? `0${elapsedSeconds}` : elapsedSeconds}
						</span>
					</div>

					<div className="actions">
						<button className="icon icon-edit" onClick={this.onLabelChange} />
						<button className="icon icon-destroy" onClick={onDeleted} />
					</div>
				</div>
			</li>
		);
	}
}

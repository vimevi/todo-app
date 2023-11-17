import { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './task.css'

export default class Task extends Component {
	state = {
		editing: false,
		editText: this.props.label,
		labelValue: this.props.label,
	}

	static defaultProps = {
		label: 'no text',
		done: false,
		visible: true,
	}

	static propTypes = {
		onDeleted: PropTypes.func.isRequired,
		onToggleDone: PropTypes.func.isRequired,
		dateCreated: PropTypes.object.isRequired,
		label: PropTypes.string,
		done: PropTypes.bool,
		visible: PropTypes.bool,
	}

	timeFromCreate = () => {
		const createdTime = new Date()
		return createdTime
	}

	onCheckboxChange = (e) => {
		this.setState({
			done: e.target.checked,
		})
	}

	onLabelChange = () => {
		this.setState(
			(prevState) => ({
				editing: !prevState.editing,
				editText: !prevState.editing ? this.props.label : prevState.labelValue,
			}),
			() => {
				if (this.state.editing) {
					this.editInput.focus()
				}
			},
		)
	}

	handleEditInputChange = (e) => {
		const newText = e.target.value
		this.setState((prevState) => ({
			labelValue: newText.trim() !== false ? newText : prevState.labelValue,

			editText: newText,
		}))
	}

	handleEditInputBlur = () => {
		this.setState({
			editing: false,
		})
	}

	handleEditInputKeyDown = (e) => {
		if (e.key === 'Enter') {
			this.setState({
				editing: false,
			})
		}
		if (e.key === 'Escape') {
			this.setState({
				editing: false,
			})
		}
	}

	render() {
		const { onDeleted, onToggleDone, done, visible, dateCreated } = this.props

		let classNames = ''

		classNames = visible ? '' : 'hidden '
		classNames += done ? 'completed' : ''

		const createdTime = formatDistanceToNow(dateCreated, { addSuffix: true })
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
									onToggleDone()
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
										this.editInput = input
									}}
								/>
							) : (
								<span>{this.state.labelValue} </span>
							)}
						</span>
						<span className="created">created {createdTime}</span>
					</label>
					<button className="icon icon-edit" onClick={this.onLabelChange} />
					<button className="icon icon-destroy" onClick={onDeleted} />
				</div>
			</li>
		)
	}
}

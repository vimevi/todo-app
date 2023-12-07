import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './task.css';
import MyTimer from '../timer';

export default function Task({
	onDeleted,
	onToggleDone,
	label,
	done,
	dateCreated,
	timeStamp,
}) {
	const [editing, setEditing] = useState(false);
	const [labelValue, setLabelValue] = useState(label);

	const editInputRef = useRef(null);

	const onCheckboxChange = () => {
		onToggleDone();
	};

	const onLabelChange = () => {
		setEditing((prevEditing) => !prevEditing);
	};

	const handleEditInputChange = (e) => {
		const newText = e.target.value;
		setLabelValue(newText);
	};

	const handleEditInputBlur = () => {
		setEditing(false);
	};

	const handleEditInputKeyDown = (e) => {
		if (e.key === 'Enter' || e.key === 'Escape') {
			setEditing(false);
		}
	};

	const classNames = done ? 'completed' : '';

	const createdTime = formatDistanceToNow(dateCreated, { addSuffix: true });

	return (
		<li className={classNames}>
			<div className="view">
				<input
					className="toggle"
					type="checkbox"
					onChange={onCheckboxChange}
					checked={done}
				/>

				<label>
					<span
						className="description"
						onClick={() => {
							if (!editing) {
								onToggleDone();
							}
						}}
					>
						{editing ? (
							<input
								type="text"
								className="edit-input"
								onChange={handleEditInputChange}
								onBlur={handleEditInputBlur}
								onKeyDown={handleEditInputKeyDown}
								value={labelValue}
								ref={editInputRef}
							/>
						) : (
							<>
								<span className="label">{labelValue}</span>
							</>
						)}
					</span>
					<span className="created">created {createdTime}</span>
				</label>

				<MyTimer expiryTimestamp={timeStamp} />

				<div className="actions">
					<button className="icon icon-edit" onClick={onLabelChange} />
					<button className="icon icon-destroy" onClick={onDeleted} />
				</div>
			</div>
		</li>
	);
}
Task.defaultProps = {
	label: 'no text',
	done: false,
	visible: true,
};

Task.propTypes = {
	onDeleted: PropTypes.func.isRequired,
	onToggleDone: PropTypes.func.isRequired,
	dateCreated: PropTypes.object.isRequired,
	label: PropTypes.string,
	done: PropTypes.bool,
	visible: PropTypes.bool,
	timeStamp: PropTypes.object.isRequired,
};

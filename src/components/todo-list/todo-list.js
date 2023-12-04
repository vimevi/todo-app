import PropTypes from 'prop-types';
import Task from '../task/task';

import './todo-list.css';

// eslint-disable-next-line react/prop-types
const TodoList = ({ todos, onDeleted, onToggleDone, minutes, seconds }) => {
	const elements = todos.map((item) => {
		const { id, ...itemProps } = item;
		if (item.visible) {
			return (
				<Task
					minutes={minutes}
					seconds={seconds}
					key={item.id}
					{...itemProps}
					todos={todos}
					onDeleted={() => onDeleted(id)}
					onToggleDone={() => onToggleDone(id)}
				/>
			);
		}
	});
	return <ul className="todo-list">{elements}</ul>;
};

TodoList.propTypes = {
	todos: PropTypes.array.isRequired,
	onDeleted: PropTypes.func.isRequired,
	onToggleDone: PropTypes.func.isRequired,
};

export default TodoList;

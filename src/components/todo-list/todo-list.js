import PropTypes from 'prop-types';
import Task from '../task/task';

import './todo-list.css';

const TodoList = ({ todos, onDeleted, onToggleDone }) => {
	const elements = todos.map((item) => {
		const { id, ...itemProps } = item;

		return (
			<Task
				key={item.id}
				{...itemProps}
				todos={todos}
				onDeleted={() => onDeleted(id)}
				onToggleDone={() => onToggleDone(id)}
			/>
		);
	});
	return <ul className="todo-list">{elements}</ul>;
};

TodoList.propTypes = {
	todos: PropTypes.array.isRequired,
	onDeleted: PropTypes.func.isRequired,
	onToggleDone: PropTypes.func.isRequired,
};

export default TodoList;

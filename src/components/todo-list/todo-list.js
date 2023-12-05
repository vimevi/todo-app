import PropTypes from 'prop-types';
import Task from '../task/task';

import './todo-list.css';

const TodoList = ({ todos, onDeleted, onToggleDone, timeStamp }) => {
	const elements = todos.map((item) => {
		const { id, ...itemProps } = item;
		if (item.visible) {
			return (
				<Task
					timeStamp={timeStamp}
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

TodoList.defaultProps = {
	timeStamp: new Date(), // по-умолчанию таймер будет установлен в 00:00
};

TodoList.propTypes = {
	todos: PropTypes.array.isRequired,
	onDeleted: PropTypes.func.isRequired,
	onToggleDone: PropTypes.func.isRequired,
	timeStamp: PropTypes.object,
};

export default TodoList;

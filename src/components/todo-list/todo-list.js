import Task from '../task/task';
import './todo-list.css';

const TodoList = ({ todos }) => {
	const elements = todos.map((item) => {
		let className = item.isCompleted ? 'completed' : '';
		const { isEditing, id, ...itemProps } = item;
		// const edit = (e) => {
		// 	if (e.keyCode == 13) {

		// 	};
		return (
			<div key={item.id}>
				<Task {...itemProps} />
			</div>
		);
	});
	return <ul className="todo-list">{elements}</ul>;
};

export default TodoList;

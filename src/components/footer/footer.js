import TaskFilter from '../task-filter/tasks-filter';
import './footer.css';

const Footer = (todos) => {
	let count = todos.todos.filter((el) => el.isCompleted);
	return (
		<footer className="footer">
			<span className="todo-count">
				{todos.todos.length - count.length} items left
			</span>
			<TaskFilter />
			<button className="clear-completed">Clear completed</button>
		</footer>
	);
};

export default Footer;

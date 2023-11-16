import TaskFilter from '../task-filter/tasks-filter';
import PropTypes from 'prop-types';

import './footer.css';

const Footer = ({ unDoneCount, clearCompleted, filterBy }) => {
	Footer.propTypes = {
		unDoneCount: PropTypes.number.isRequired,
		clearCompleted: PropTypes.func.isRequired,
		filterBy: PropTypes.func.isRequired,
	};

	return (
		<footer className="footer">
			<span className="todo-count">{unDoneCount} items left</span>
			<TaskFilter filterBy={filterBy} />
			<button className="clear-completed" onClick={clearCompleted}>
				Clear completed
			</button>
		</footer>
	);
};

export default Footer;

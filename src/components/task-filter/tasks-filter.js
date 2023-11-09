import { Component } from 'react';
import './task-filter.css';

export default class TaskFilter extends Component {
	render() {
		return (
			<ul className="filters">
				<li>
					<button className="selected">All</button>
				</li>
				<li>
					<button>Active</button>
				</li>
				<li>
					<button>Completed</button>
				</li>
			</ul>
		);
	}
}

// const TaskFilter = () => {
// 	return (
// 		<ul className="filters">
// 			<li>
// 				<button className="selected">All</button>
// 			</li>
// 			<li>
// 				<button>Active</button>
// 			</li>
// 			<li>
// 				<button>Completed</button>
// 			</li>
// 		</ul>
// 	);
// };

// export default TaskFilter;

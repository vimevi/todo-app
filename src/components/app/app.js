import TodoList from '../todo-list';
import AppHeader from '../app-header';
import TaskFilter from '../task-filter';
import Footer from '../footer';
import NewTaskForm from '../new-task-form';

import './app.css';

const App = () => {
	const todoData = [
		{
			label: 'Completed task',
			// isCompleted: true, isEditing: false,
			id: 1,
		},
		{
			label: 'editing task',
			// isCompleted: false, isEditing: true,
			id: 2,
		},
		{ label: 'Active task', id: 3 },
	];
	return (
		<div className="todoapp">
			<AppHeader />
			<NewTaskForm />
			<TodoList todos={todoData} />
			<Footer todos={todoData}>
				<TaskFilter />
			</Footer>
		</div>
	);
};
export default App;

import { useState } from 'react';

import TodoList from '../todo-list';
import AppHeader from '../app-header';
import TaskFilter from '../task-filter';
import Footer from '../footer';
import NewTaskForm from '../new-task-form';

import './app.css';

export default function App() {
	const [todoData, setTodoData] = useState([]);
	const [id, setId] = useState(100);

	function createTodoItem(label, minutes, seconds) {
		const time = new Date();
		time.setSeconds(time.getSeconds() + minutes * 60 + seconds);
		setId((id) => id + 1);

		return {
			label,
			done: false,
			visible: true,
			dateCreated: new Date(),
			id: id,
			minutes: minutes,
			seconds: seconds,
			timeStamp: time,
		};
	}
	const filterBy = (filter) => {
		let filteredData;

		switch (filter) {
			case 'active':
				filteredData = todoData.map((task) => ({
					...task,
					visible: !task.done,
				}));
				break;
			case 'completed':
				filteredData = todoData.map((task) => ({
					...task,
					visible: task.done,
				}));
				break;
			case 'all':
			default:
				filteredData = todoData.map((task) => ({ ...task, visible: true }));
		}
		setTodoData(filteredData);
	};

	const onToggleDone = (id) => {
		setTodoData((prevTodoData) => {
			const idx = prevTodoData.findIndex((el) => el.id === id);
			const oldItem = prevTodoData[idx];

			const newItem = { ...oldItem, done: !oldItem.done };
			const newArray = [...prevTodoData];
			newArray.splice(idx, 1, newItem);

			return newArray;
		});
	};

	const clearCompleted = () => {
		setTodoData((prevTodoData) => {
			const onlyDoneArr = prevTodoData.filter((el) => !el.done);
			return onlyDoneArr;
		});
	};

	const addItem = (text, minutes, seconds) => {
		const newItem = createTodoItem(text, minutes, seconds);
		setTodoData((prevTodoData) => {
			const newArr = [...prevTodoData, newItem];
			return newArr;
		});
	};

	const deleteItem = (id) => {
		setTodoData((prevTodoData) => {
			const idx = prevTodoData.findIndex((el) => el.id === id);
			const newArray = [
				...prevTodoData.slice(0, idx),
				...prevTodoData.slice(idx + 1),
			];
			return newArray;
		});
	};

	const unDoneCount = todoData.filter((el) => !el.done).length;

	return (
		<section className="todoapp">
			<AppHeader />
			<NewTaskForm onItemAdded={addItem} />
			<TodoList
				todos={todoData}
				onDeleted={deleteItem}
				onToggleDone={onToggleDone}
			/>
			<Footer
				unDoneCount={unDoneCount}
				clearCompleted={clearCompleted}
				filterBy={filterBy}
			>
				<TaskFilter />
			</Footer>
		</section>
	);
}

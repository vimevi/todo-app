import { Component } from 'react';

import TodoList from '../todo-list';
import AppHeader from '../app-header';
import TaskFilter from '../task-filter';
import Footer from '../footer';
import NewTaskForm from '../new-task-form';

import './app.css';

export default class App extends Component {
	maxId = 100;

	state = {
		todoData: [],
	};

	createTodoItem(label, minutes, seconds) {
		return {
			label,
			done: false,
			visible: true,
			dateCreated: new Date(),
			id: this.maxId++,
			elapsedSeconds: minutes * 60 + seconds,
		};
	}
	filterBy = (filter) => {
		const { todoData } = this.state;

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

		this.setState({
			todoData: filteredData,
		});
	};
	onToggleDone = (id) => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex((el) => el.id === id);
			const oldItem = todoData[idx];

			const newItem = { ...oldItem, done: !oldItem.done };
			const newArray = [...todoData];
			newArray.splice(idx, 1, newItem);

			return { todoData: newArray };
		});
	};

	clearCompleted = () => {
		this.setState(({ todoData }) => {
			const onlyDoneArr = todoData.filter((el) => !el.done);
			return {
				todoData: onlyDoneArr,
			};
		});
	};

	addItem = (text, minutes, seconds) => {
		const newItem = this.createTodoItem(text, minutes, seconds);
		this.setState(({ todoData }) => {
			const newArr = [...todoData, newItem];
			return {
				todoData: newArr,
			};
		});
	};

	deleteItem = (id) => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex((el) => el.id === id);
			const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
			return { todoData: newArray };
		});
	};

	render() {
		const { todoData } = this.state;
		const unDoneCount = this.state.todoData.filter((el) => !el.done).length;

		return (
			<section className="todoapp">
				<AppHeader />
				<NewTaskForm onItemAdded={this.addItem} />
				<TodoList
					todos={todoData}
					onDeleted={this.deleteItem}
					onToggleDone={this.onToggleDone}
				/>
				<Footer
					unDoneCount={unDoneCount}
					clearCompleted={this.clearCompleted}
					filterBy={this.filterBy}
				>
					<TaskFilter />
				</Footer>
			</section>
		);
	}
}

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
		timer: {
			minutes: 0,
			seconds: 0,
		},
	};

	createTodoItem(label, minutes, seconds) {
		return {
			label,
			done: false,
			visible: true,
			dateCreated: new Date(),
			id: this.maxId++,
			minutes: minutes,
			seconds: seconds,
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
		if (!this.state.todoData.find((task) => task.id === id).editing) {
			this.updateTimer();
		}
	};

	updateTimer = () => {
		const { todoData } = this.state;

		const totalSeconds = todoData.reduce(
			(acc, task) => acc + task.minutes * 60 + task.seconds,
			0,
		);

		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;

		this.setState(
			{
				timer: {
					minutes: minutes,
					seconds: seconds,
				},
			},
			() => {
				console.log('this.state.timer', this.state.timer);
			},
		);
	};

	clearCompleted = () => {
		this.setState(({ todoData }) => {
			const onlyDoneArr = todoData.filter((el) => !el.done);
			return {
				todoData: onlyDoneArr,
			};
		});

		this.updateTimer();
	};

	addItem = (text, minutes, seconds) => {
		const newItem = this.createTodoItem(text, minutes, seconds);
		this.setState(({ todoData }) => {
			const newArr = [...todoData, newItem];
			return {
				todoData: newArr,
			};
		});
		console.log(this.state.timer);
		this.updateTimer();
	};

	deleteItem = (id) => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex((el) => el.id === id);
			const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
			return { todoData: newArray };
		});

		this.updateTimer();
	};

	render() {
		const { todoData, timer } = this.state;
		const unDoneCount = this.state.todoData.filter((el) => !el.done).length;

		return (
			<section className="todoapp">
				<AppHeader />
				<NewTaskForm onItemAdded={this.addItem} />
				<TodoList
					todos={todoData}
					onDeleted={this.deleteItem}
					onToggleDone={this.onToggleDone}
					timer={timer}
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

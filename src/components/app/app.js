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
		todoData: [
			this.createTodoItem('Completed task'),
			this.createTodoItem('editing task'),
			this.createTodoItem('Active task'),
		],
	};

	createTodoItem(label) {
		return {
			label,
			done: false,
			visible: true,
			dateCreated: new Date(),
			id: this.maxId++,
		};
	}

	filterBy = (filter) => {
		const { todoData } = this.state;
		switch (filter) {
			case 'active':
				this.setState({
					todoData: todoData.map((task) => ({ ...task, visible: !task.done })),
				});
				break;
			case 'completed':
				this.setState({
					todoData: todoData.map((task) => ({ ...task, visible: task.done })),
				});
				break;
			case 'all':
			default:
				this.setState({
					todoData: todoData.map((task) => ({ ...task, visible: true })),
				});
		}
	};

	onToggleDone = (id) => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex((el) => el.id === id);
			const oldItem = todoData[idx];

			const newItem = { ...oldItem, done: !oldItem.done };
			const newArray = todoData.toSpliced(idx, 1, newItem);
			return { todoData: newArray };
		});
	};

	clearCompleted = () => {
		this.setState(({ todoData }) => {
			const OnlyDoneArr = todoData.filter((el) => !el.done);
			return {
				todoData: OnlyDoneArr,
			};
		});
	};

	addItem = (text) => {
		const newItem = this.createTodoItem(text);
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
					todos={todoData}
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

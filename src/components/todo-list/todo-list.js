/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import Task from '../task/task'

import './todo-list.css'

const TodoList = ({ todos, onDeleted, onToggleDone }) => {
	TodoList.propTypes = {
		todos: PropTypes.array.isRequired,
		onDeleted: PropTypes.func.isRequired,
		onToggleDone: PropTypes.func.isRequired,
	}
	const elements = todos.map((item) => {
		const { id, ...itemProps } = item

		return (
			<div key={item.id}>
				<Task
					{...itemProps}
					todos={todos}
					onDeleted={() => onDeleted(id)}
					onToggleDone={() => onToggleDone(id)}
				/>
			</div>
		)
	})
	return <ul className="todo-list">{elements}</ul>
}

export default TodoList

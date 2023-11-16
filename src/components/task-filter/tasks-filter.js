import React, { Component } from 'react';
import './task-filter.css';

export default class TaskFilter extends Component {
	// constructor(props) {
	// 	super(props);

	// 	this.state = {
	// 		selectedFilter: 'all',
	// 		filterOptions: ['all', 'active', 'completed'],
	// 	};
	// }
	state = {
		selectedFilter: 'all',
		filterOptions: ['all', 'active', 'completed'],
	};

	onFilterClick = (filter) => {
		this.setState({
			selectedFilter: filter,
		});

		this.props.filterBy(filter);
	};

	render() {
		return (
			<ul className="filters">
				{this.state.filterOptions.map((filter) => (
					<li key={filter}>
						<button
							className={this.state.selectedFilter === filter ? 'selected' : ''}
							onClick={() => this.onFilterClick(filter)}
						>
							{filter.charAt(0).toUpperCase() + filter.slice(1)}
						</button>
					</li>
				))}
			</ul>
		);
	}
}

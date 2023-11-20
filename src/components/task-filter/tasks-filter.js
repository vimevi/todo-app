import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './task-filter.css';

export default class TaskFilter extends Component {
	state = {
		selectedFilter: 'all',
		filterOptions: ['all', 'active', 'completed'],
	};

	static defaultProps = {
		filterBy: () => {},
	};

	static propTypes = {
		filterBy: PropTypes.func,
	};

	onFilterClick = (filter) => {
		this.setState({
			selectedFilter: filter,
		});

		this.props.filterBy(filter);
	};

	render() {
		const { filterOptions, selectedFilter } = this.state;

		return (
			<ul className="filters">
				{filterOptions.map((filter) => {
					if (filter === selectedFilter) {
						return (
							<li key={filter}>
								<button
									className="selected"
									onClick={() => this.onFilterClick(filter)}
								>
									{filter.charAt(0).toUpperCase() + filter.slice(1)}
								</button>
							</li>
						);
					} else {
						return (
							<li key={filter}>
								<button onClick={() => this.onFilterClick(filter)}>
									{filter.charAt(0).toUpperCase() + filter.slice(1)}
								</button>
							</li>
						);
					}
				})}
			</ul>
		);
	}
}

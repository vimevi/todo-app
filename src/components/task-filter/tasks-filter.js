import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './task-filter.css';

export default function TaskFilter({ filterBy }) {
	const [selectedFilter, setSelectedFilter] = useState('all');

	const filterOptions = ['all', 'active', 'completed'];
	const onFilterClick = (filter) => {
		setSelectedFilter(filter);
		filterBy(filter);
	};

	return (
		<ul className="filters">
			{filterOptions.map((filter) => {
				if (filter === selectedFilter) {
					return (
						<li key={filter}>
							<button
								className="selected"
								onClick={() => onFilterClick(filter)}
							>
								{filter.charAt(0).toUpperCase() + filter.slice(1)}
							</button>
						</li>
					);
				} else {
					return (
						<li key={filter}>
							<button onClick={() => onFilterClick(filter)}>
								{filter.charAt(0).toUpperCase() + filter.slice(1)}
							</button>
						</li>
					);
				}
			})}
		</ul>
	);
}

TaskFilter.defaultProps = {
	filterBy: () => {},
};

TaskFilter.propTypes = {
	filterBy: PropTypes.func,
};

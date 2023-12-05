/* eslint-disable react/prop-types */

// Было принято решение отключить здесь это правило
// т.к. я посчитал странным валидацию типов в библиотеке,
// на работу которой я по сути никак не влияю

import { useTimer } from 'react-timer-hook';

export default function MyTimer({ expiryTimestamp }) {
	const { seconds, minutes, hours, pause, resume } = useTimer({
		expiryTimestamp,
		onExpire: () => console.warn('время задачи истекло (onExpire called)'),
	});

	return (
		<div className="timer-container">
			<div className="timer-time">
				{hours !== 0 && <span>{hours}:</span>}
				<span>{String(minutes).padStart(2, '0')}:</span>
				<span>{String(seconds).padStart(2, '0')}</span>
			</div>
			<span className="timer-buttons">
				{' '}
				<button className="icon icon-pause" onClick={pause}></button>
				<button className="icon icon-play" onClick={resume}></button>
			</span>
		</div>
	);
}

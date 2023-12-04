/* eslint-disable react/prop-types */
import { useTimer } from 'react-timer-hook';

export default function MyTimer({ expiryTimestamp }) {
	const {
		// eslint-disable-next-line no-unused-vars
		totalSeconds,
		seconds,
		minutes,
		// isRunning,
		pause,
		resume,
		// start,
		// restart,
	} = useTimer({
		expiryTimestamp,
		onExpire: () => console.warn('onExpire called'),
	});

	return (
		<div className="timer-container">
			<div className="timer-time">
				<span>{minutes}</span>:<span>{seconds}</span>
			</div>
			{/* <p className="timer-status">{isRunning ? 'Running' : 'Not running'}</p> */}

			{/* <button onClick={start}>Start</button> */}
			<span className="timer-buttons">
				{' '}
				<button className="icon icon-pause" onClick={pause}></button>
				<button className="icon icon-play" onClick={resume}></button>
				{/* <button
					className="icon"
					onClick={() => {
						// Restarts to 5 minutes timer
						const time = new Date();
						time.setSeconds(time.getSeconds() + 10);
						restart(time);
					}}
				>
					restart
				</button> */}
			</span>
		</div>
	);
}

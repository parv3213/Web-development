import React from "react";

function App() {
	let currentTime = new Date().toLocaleTimeString();

	const [time, setTime] = React.useState(currentTime);

	function updateTime() {
		const newTime = new Date().toLocaleTimeString();
		setTime(newTime);
	}

	setInterval(updateTime, 1000);

	return (
		<div className="container">
			<h1>{time}</h1>
			<button onClick={updateTime}>Get Time</button>
		</div>
	);
}

export default App;

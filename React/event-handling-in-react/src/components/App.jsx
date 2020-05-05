import React from "react";

function App() {
	const [headingText, setHeadingText] = React.useState("Hello");
	const [isMouseOver, setMouseOver] = React.useState(false);

	function handleClick() {
		setHeadingText("Submitted");
	}

	function handleMouseOver() {
		setMouseOver(true);
	}
	function handleMouseOut() {
		setMouseOver(false);
	}

	return (
		<div className="container">
			<h1>{headingText}</h1>
			<input type="text" placeholder="What's your name?" />
			<button
				style={{ backgroundColor: isMouseOver ? "Black" : "White" }}
				onClick={handleClick}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
			>
				Submit
			</button>
		</div>
	);
}

export default App;

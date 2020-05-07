import React from "react";

function App() {
	const [name, setName] = React.useState("");
	const [publishName, setPublishName] = React.useState("");

	function handleChange(event) {
		setName(event.target.value);
	}

	function handleSubmit(event) {
		setPublishName(name);
		event.preventDefault();
	}

	return (
		<div className="container">
			<h1>Hello {publishName}</h1>
			<form onSubmit={handleSubmit}>
				<input onChange={handleChange} value={name} type="text" placeholder="What's your name?" />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default App;

import React from "react";

function App() {
	const [item, setItem] = React.useState("");
	const [todoList, setTodoList] = React.useState([]);

	function handleChange(event) {
		setItem(event.target.value);
	}

	function handleSubmit(event) {
		setTodoList((prevValue) => [...prevValue, item]);
		setItem("");
		event.preventDefault();
	}

	return (
		<div className="container">
			<div className="heading">
				<h1>To-Do List</h1>
			</div>
			<div className="form">
				<form onSubmit={handleSubmit}>
					<input onChange={handleChange} type="text" value={item} />
					<button type="submit">
						<span>Add</span>
					</button>
				</form>
			</div>
			<div>
				<ul>
					{todoList.map((todo, index) => (
						<li key={index}>{todo}</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;

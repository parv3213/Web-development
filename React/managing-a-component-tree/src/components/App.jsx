import React, { useState } from "react";
import TodoItem from "./TodoItem";

function App() {
	const [inputText, setInputText] = useState("");
	const [items, setItems] = useState([]);

	function handleChange(event) {
		const newValue = event.target.value;
		setInputText(newValue);
	}

	function addItem() {
		setItems((prevItems) => {
			return [...prevItems, inputText];
		});
		setInputText("");
	}

	function deleteItem(id) {
		setItems((prevValue) => {
			return prevValue.filter((item, index) => {
				return index !== id;
			});
		});
	}

	return (
		<div className="container">
			<div className="heading">
				<h1>To-Do List</h1>
			</div>
			<div className="form">
				<input onChange={handleChange} type="text" value={inputText} />
				<button onClick={addItem}>
					<span>Add</span>
				</button>
			</div>
			<div>
				<ul>
					{items.map((todoItem, index) => (
						<TodoItem item={todoItem} key={index} id={index} onChecked={deleteItem} />
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;

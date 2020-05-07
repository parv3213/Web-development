import React, { useState } from "react";

function App() {
	const [fullName, setFullName] = useState({
		fName: "",
		lName: "",
	});

	function handleChange(event) {
		const { value, name } = event.target;

		setFullName((prevValue) => {
			if (name === "fName") {
				return { fName: value, lName: prevValue.lName };
			} else {
				return { fName: prevValue.fName, lName: value };
			}
		});
	}

	return (
		<div className="container">
			<h1>
				Hello {fullName.fName} {fullName.lName}
			</h1>
			<form>
				<input onChange={handleChange} value={fullName.fName} name="fName" placeholder="First Name" />
				<input onChange={handleChange} value={fullName.lName} name="lName" placeholder="Last Name" />
				<button>Submit</button>
			</form>
		</div>
	);
}

export default App;

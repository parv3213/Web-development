import React from "react";

function CreateArea(props) {
	const [note, setNotes] = React.useState({ title: "", content: "" });

	function handleChange(event) {
		const { name, value } = event.target;
		setNotes((prevValue) => {
			if (name === "title") {
				return { title: value, content: prevValue.content };
			} else {
				return { title: prevValue.title, content: value };
			}
		});
	}

	return (
		<div>
			<form
				autoComplete="off"
				onSubmit={(event) => {
					props.noteSubmit(note, event);
					setNotes({ title: "", content: "" });
					event.preventDefault();
				}}
			>
				<input onChange={handleChange} name="title" placeholder="Title" value={note.title} />
				<textarea
					onChange={handleChange}
					name="content"
					placeholder="Take a note..."
					rows="3"
					value={note.content}
				/>
				<button type="submit">Add</button>
			</form>
		</div>
	);
}

export default CreateArea;

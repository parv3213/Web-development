import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
	const [note, setNote] = useState({
		title: "",
		content: "",
	});
	const [zoom, setZoom] = React.useState(false);

	function handleChange(event) {
		const { name, value } = event.target;

		setNote((prevNote) => {
			return {
				...prevNote,
				[name]: value,
			};
		});
	}

	function submitNote(event) {
		props.onAdd(note);
		setNote({
			title: "",
			content: "",
		});
		event.preventDefault();
	}

	return (
		<div>
			<form className="create-note">
				<input
					name="title"
					style={zoom === false ? { display: "none" } : { display: "inherit" }}
					onChange={handleChange}
					value={note.title}
					placeholder="Title"
					autoComplete="off"
				/>
				<textarea
					name="content"
					onClick={() => setZoom(true)}
					onChange={handleChange}
					value={note.content}
					placeholder="Take a note..."
					rows={zoom === false ? 1 : 3}
				/>
				<Zoom in={zoom}>
					<Fab onClick={submitNote}>
						<AddIcon />
					</Fab>
				</Zoom>
			</form>
		</div>
	);
}

export default CreateArea;

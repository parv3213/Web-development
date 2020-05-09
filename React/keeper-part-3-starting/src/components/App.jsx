import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
	const [notes, setNotes] = React.useState([]);

	function handleNoteSubmit(note) {
		setNotes((prevValue) => [...prevValue, { title: note.title, content: note.content }]);
	}

	function handleNoteDelete(indexToDelete) {
		setNotes((prevValue) => {
			return prevValue.filter((note, index) => {
				return index !== indexToDelete;
			});
		});
	}

	return (
		<div>
			<Header />
			<CreateArea noteSubmit={handleNoteSubmit} />
			{notes.map((note, index) => {
				return (
					<Note
						key={index}
						index={index}
						title={note.title}
						content={note.content}
						onDelete={handleNoteDelete}
					/>
				);
			})}
			<Footer />
		</div>
	);
}

export default App;

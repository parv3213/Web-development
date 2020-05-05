import React from "react";
import Entry from "./Entry";
import emojipedia from "../emojipedia";

function emojiEntry(emoji) {
	return <Entry key={emoji.id} emoji={emoji.emoji} name={emoji.name} meaning={emoji.meaning} />;
}

function App() {
	return (
		<div>
			<h1>
				<span>emojipedia</span>
			</h1>
			<dl className="dictionary">{emojipedia.map(emojiEntry)}</dl>
		</div>
	);
}

export default App;

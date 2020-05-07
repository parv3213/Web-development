import React from "react";

function TodoItem(props) {
	return (
		<li
			onClick={() => {
				props.onChecked(props.id);
			}}
		>
			{props.item} {props.index}
		</li>
	);
}

export default TodoItem;

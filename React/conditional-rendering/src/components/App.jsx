import React from "react";
import Login from "./Login";

var isLoggedIn = false;

function App() {
	return <div className="container">{isLoggedIn ? <h1>Hello</h1> : <Login />}</div>;
}

export default App;

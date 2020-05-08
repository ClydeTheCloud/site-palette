import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainFrame from "./components/MainFrame";
import Switcher from "./components/Switcher";

function App() {
	// const [data, setData] = useState({});
	// async function getItems() {
	// 	await fetch("https://picsum.photos/v2/list?limit=5").then((response) => {
	// 		response.json().then((com) => {
	// 			setData(com);
	// 		});
	// 	});
	// }
	// getItems();

	return (
		<div className="app">
			<Switcher />
			<Header />
			<MainFrame data={data} />
		</div>
	);
}

export default App;

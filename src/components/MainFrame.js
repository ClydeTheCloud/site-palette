import React from "react";
import Item from "./Item";
import "./MainFrame.css";

function MainFrame(props) {
	// const items = props => {props.data.map(( => {
	// 	<Item />
	// }))
	// }

	return (
		<div className="wrapper main">
			<div className="main-text">
				<h1>Some title text go here.</h1>
				<h3>
					Some more text to explain something very important. You need to hear
					this.
				</h3>
				<p>
					This is where we go in detail. Take a closer look. We sure you'll like
					it. A lot. But don't take my word for it, go on and try it yourself!
					I'll wait for you here, don't worry, i'm not going anywhere. Take your
					time.
				</p>
				<button className="main-btn">TRY IT OUT NOW</button>
			</div>
			<div className="main-background-image"></div>
			<div className="wrapper items">{/* {items} */}</div>
		</div>
	);
}

export default MainFrame;

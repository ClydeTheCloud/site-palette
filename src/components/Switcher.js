import React, { useState } from "react";
import "./Switcher.css";

function Switcher() {
	const closed = "<";
	const opened = ">";

	const [isOpen, setIsOpen] = useState(false);

	const positionHandler = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="switcher">
			<div
				className={isOpen ? "small opened" : "small"}
				onClick={positionHandler}
			>
				{isOpen ? opened : closed} <span></span>
			</div>
			<div className={isOpen ? "big opened" : "big"}></div>
		</div>
	);
}

export default Switcher;

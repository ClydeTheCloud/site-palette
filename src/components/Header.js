import React from "react";
import Logo from "./Logo";
import "./Header.css";

function Header() {
	return (
		<div>
			<header>
				<div className="wrapper">
					<Logo />
					<div className="menu-wrapper">
						<div className="menu-item">
							<a className="menu-link">Item 1</a>
						</div>
						<div className="menu-item">
							<a className="menu-link">Item 2</a>
						</div>
						<div className="menu-item">
							<a className="menu-link">Item 3</a>
						</div>
						<div className="menu-item">
							<a className="menu-link">Item 4</a>
						</div>
						<div className="menu-item">
							<button className="menu-button">Button</button>
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}

export default Header;

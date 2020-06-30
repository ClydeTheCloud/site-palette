import React from 'react';
import './Tooltip.css';

// export const tooltipElements = [];

// export function createTooltip(event) {
// 	tooltipElements.push({
// 		location: {
// 			left: event.clientX,
// 			top: event.clientY,
// 		},
// 	});

// 	console.log(
// 		'clientX: ' +
// 			event.clientX +
// 			' - clientY: ' +
// 			event.clientY +
// 			' - event: ' +
// 			event
// 	);
// }
/* left: ${props => props.location.left} */
/* top:  ${props => props.location.top} */

export class Tooltip extends React.Component {
	constructor(props) {
		super(props);
		this.displayHandler = this.displayHandler.bind(this);
	}

	state = {
		visible: false,
	};

	basicStyle = {
		zIndex: 2,
		width: '100px',
		height: '50px',
		position: 'absolute',
		color: 'white',
		backgroundColor: 'black',
		transition: 'none',
	};

	displayHandler() {
		this.setState({
			visible: !this.state.visible,
		});
	}

	render() {
		const { visible } = this.state;

		const basicStyle = {
			zIndex: 2,
			width: '100px',
			height: '50px',
			position: 'absolute',
			color: 'white',
			backgroundColor: 'black',
			transition: 'none',
		};

		const classes = 'tooltip ' + this.props.position;

		return (
			<div className="tooltip-wrapper">
				{visible && (
					<div style={basicStyle} className={classes}>
						tooltip
					</div>
				)}
				<div className="tooltip-target" onClick={this.displayHandler}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

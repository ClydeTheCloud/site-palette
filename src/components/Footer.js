import React from 'react';
import './Footer.css';
import Vk from './img/icons/Vk.js';
import Facebook from './img/icons/Facebook.js';
import Instagram from './img/icons/Instagram.js';
import Youtube from './img/icons/Youtube.js';
import Twitter from './img/icons/Twitter.js';
import { useSelector } from 'react-redux';
import { H5, P, LI, BTN_BORDER } from './_styled-components';

function Footer() {
	const { activePalette, paletteData } = useSelector(state => state);

	const style = {
		footer: {
			backgroundColor:
				paletteData[activePalette].colors[
					paletteData[activePalette].addresses.footer.bg
				],
		},
	};

	H5.defaultProps = {
		color:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.footer.titles
			],
	};

	P.defaultProps = {
		color:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.footer.text
			],
	};

	LI.defaultProps = {
		color:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.footer.link
			],
		colorHover:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.footer.linkOffset
			],
	};

	BTN_BORDER.defaultProps = {
		color:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.footer.btn
			],
		bg:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.footer.btnBg
			],
		border:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.footer.btnBorder
			],
		colorHover:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.footer.btnOffset
			],
		bgHover:
			paletteData[activePalette].colors[
				paletteData[activePalette].addresses.footer.btnBgOffset
			],
	};

	return (
		<div>
			<footer style={style.footer}>
				<div className="wrapper">
					<div className="footer-item">
						<H5>About our company.</H5>
						<hr />
						<P>
							We are the champions, my friends And we'll keep on fighting 'til
							the end We are the champions We are the champions No time for
							losers 'Cause we are the champions of the world
						</P>
					</div>
					<div className="footer-item">
						<H5>Quick links.</H5>
						<hr />
						<ul>
							<LI>About us</LI>
							<LI>Learn more</LI>
							<LI>Contacts</LI>
							<LI>We are hiring</LI>
							<LI>Info</LI>
						</ul>
					</div>
					<div className="footer-item">
						<H5>Call to action: last resort.</H5>
						<hr />
						<P>Text text text text text text text text text text text</P>
						<BTN_BORDER className="footer-btn">BUTTON!</BTN_BORDER>
					</div>
					<div className="footer-item">
						<H5>Let's get social!</H5>
						<hr />
						<div className="social-container">
							<Facebook />
							<Instagram />
							<Twitter />
							<Vk />
							<Youtube />
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default Footer;

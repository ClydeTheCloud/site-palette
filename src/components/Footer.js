import React, { useContext } from 'react';
import './Footer.css';
import Vk from './img/icons/Vk.js';
import Facebook from './img/icons/Facebook.js';
import Instagram from './img/icons/Instagram.js';
import Youtube from './img/icons/Youtube.js';
import Twitter from './img/icons/Twitter.js';
import { PalettesContext } from '../PalettesContext';
import styled from 'styled-components';

// let iconsColor = '#222222';
// let iconsColorOffset = '#0282fa';

function Footer() {
	let context = useContext(PalettesContext);

	const style = {
		footer: {
			backgroundColor: context[3].palette[context[4].addresses.footer.bg],
		},
	};

	const H5 = styled.h5`
		color: ${context[3].palette[context[4].addresses.footer.titles]};
	`;
	const P = styled.p`
		color: ${context[3].palette[context[4].addresses.footer.text]};
	`;
	const LI = styled.li`
		color: ${context[3].palette[context[4].addresses.footer.link]};
		&:hover {
			color: ${context[3].palette[context[4].addresses.footer.linkOffset]};
		}
	`;
	const BTN = styled.button`
		color: ${context[3].palette[context[4].addresses.footer.btn]};
		background-color: ${context[3].palette[context[4].addresses.footer.btnBg]};
		border: 1px solid
			${context[3].palette[context[4].addresses.footer.btnBorder]};
		&:hover {
			color: ${context[3].palette[context[4].addresses.footer.btnOffset]};
			background-color: ${context[3].palette[
				context[4].addresses.footer.btnBgOffset
			]};
		}
	`;

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
						<BTN className="footer-btn">BUTTON!</BTN>
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

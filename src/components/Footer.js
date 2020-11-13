import React from 'react'
import { useSelector } from 'react-redux'

import './Footer.css'
import Vk from './img/icons/Vk.js'
import Facebook from './img/icons/Facebook.js'
import Instagram from './img/icons/Instagram.js'
import Youtube from './img/icons/Youtube.js'
import Twitter from './img/icons/Twitter.js'
import { H5, P, LI, BTN_BORDER } from './_styled-components'
import useTooltip from './utility/useTooltip/useTooltip'
import ColorToggle from './ColorToggle'

function Footer() {
	const { activePalette, paletteData } = useSelector(state => state)
	const [tooltips, handler] = useTooltip({
		children: {
			bg: <ColorToggle section="footer" address="bg" description="Footer background" />,
			title: <ColorToggle section="footer" address="titles" description="Column's title" />,
			text: <ColorToggle section="footer" address="text" description="Column's text" />,
			link: (
				<div>
					<ColorToggle section="footer" address="link" description="Link text" />
					<ColorToggle section="footer" address="linkOffset" description="Link on hover" />
				</div>
			),
			button: (
				<div>
					<ColorToggle section="footer" address="btn" description="Button text" />
					<ColorToggle section="footer" address="btnBg" description="Button background" />
					<ColorToggle section="footer" address="btnOffset" description="Button text on hover" />
					<ColorToggle section="footer" address="btnBgOffset" description="Button background on hover" />
					<ColorToggle section="footer" address="btnBorder" description="Button border" />
				</div>
			),
			social: (
				<div>
					<ColorToggle section="footer" address="social" description="Social link" />
					<ColorToggle section="footer" address="socialOffset" description="Social link on hover" />
				</div>
			),
		},
	})

	const style = {
		footer: {
			backgroundColor: paletteData[activePalette].colors[paletteData[activePalette].addresses.footer.bg],
		},
	}

	H5.defaultProps = {
		color: paletteData[activePalette].colors[paletteData[activePalette].addresses.footer.titles],
	}

	P.defaultProps = {
		color: paletteData[activePalette].colors[paletteData[activePalette].addresses.footer.text],
	}

	LI.defaultProps = {
		color: paletteData[activePalette].colors[paletteData[activePalette].addresses.footer.link],
		colorHover: paletteData[activePalette].colors[paletteData[activePalette].addresses.footer.linkOffset],
	}

	BTN_BORDER.defaultProps = {
		color: paletteData[activePalette].colors[paletteData[activePalette].addresses.footer.btn],
		bg: paletteData[activePalette].colors[paletteData[activePalette].addresses.footer.btnBg],
		border: paletteData[activePalette].colors[paletteData[activePalette].addresses.footer.btnBorder],
		colorHover: paletteData[activePalette].colors[paletteData[activePalette].addresses.footer.btnOffset],
		bgHover: paletteData[activePalette].colors[paletteData[activePalette].addresses.footer.btnBgOffset],
	}

	return (
		<div>
			<footer style={style.footer} onClick={handler} data-tooltip-content-id="bg">
				<div className="wrapper">
					<div className="footer-item">
						<H5 onClick={handler} data-tooltip-content-id="title">
							About our company.
						</H5>
						<hr />
						<P onClick={handler} data-tooltip-content-id="text">
							We are the champions, my friends And we'll keep on fighting 'til the end We are the champions We are the
							champions No time for losers 'Cause we are the champions of the world
						</P>
					</div>
					<div className="footer-item">
						<H5 onClick={handler} data-tooltip-content-id="title">
							Quick links.
						</H5>
						<hr />
						<ul>
							<LI onClick={handler} data-tooltip-content-id="link">
								About us
							</LI>
							<LI onClick={handler} data-tooltip-content-id="link">
								Learn more
							</LI>
							<LI onClick={handler} data-tooltip-content-id="link">
								Contacts
							</LI>
							<LI onClick={handler} data-tooltip-content-id="link">
								We are hiring
							</LI>
							<LI onClick={handler} data-tooltip-content-id="link">
								Info
							</LI>
						</ul>
					</div>
					<div className="footer-item">
						<H5 onClick={handler} data-tooltip-content-id="title">
							Call to action: last resort.
						</H5>
						<hr />
						<P onClick={handler} data-tooltip-content-id="text">
							Text text text text text text text text text text text
						</P>
						<BTN_BORDER onClick={handler} data-tooltip-content-id="button" className="footer-btn">
							BUTTON!
						</BTN_BORDER>
					</div>
					<div className="footer-item">
						<H5 onClick={handler} data-tooltip-content-id="title">
							Let's get social!
						</H5>
						<hr />
						<div className="social-container">
							<Facebook handler={handler} dataTooltipContentId="social" />
							<Instagram handler={handler} dataTooltipContentId="social" />
							<Twitter handler={handler} dataTooltipContentId="social" />
							<Vk handler={handler} dataTooltipContentId="social" />
							<Youtube handler={handler} dataTooltipContentId="social" />
						</div>
					</div>
				</div>
			</footer>
			{tooltips}
		</div>
	)
}

export default Footer

import React from 'react'
import { useSelector } from 'react-redux'
import { DIV, H3, P, BTN } from './_styled-components'

import './Item.css'

function Item(props) {
    const { activePalette, paletteData } = useSelector(state => state)

    DIV.defaultProps = {
        bg: paletteData[activePalette].colors[paletteData[activePalette].addresses.items.bg],
    }

    H3.defaultProps = {
        color: paletteData[activePalette].colors[paletteData[activePalette].addresses.items.name],
    }

    P.defaultProps = {
        color: paletteData[activePalette].colors[paletteData[activePalette].addresses.items.text],
    }

    BTN.defaultProps = {
        color: paletteData[activePalette].colors[paletteData[activePalette].addresses.items.btn],
        bg: paletteData[activePalette].colors[paletteData[activePalette].addresses.items.btnBg],

        colorHover: paletteData[activePalette].colors[paletteData[activePalette].addresses.items.btnOffset],
        bgHover: paletteData[activePalette].colors[paletteData[activePalette].addresses.items.btnBgOffset],
    }

    return (
        <>
            <DIV className="item" onClick={props.handler} data-tooltip-content-id="itemBg">
                <div className="img-container">
                    <img src={props.data.urls.thumb} alt={props.data.user.first_name} />
                </div>
                <div className="item-info">
                    <H3 onClick={props.handler} data-tooltip-content-id="itemName">
                        {props.data.user.first_name} {props.data.user.last_name}
                    </H3>
                    <P onClick={props.handler} data-tooltip-content-id="itemText">
                        {props.data.description}
                    </P>
                </div>
                <div className="item-button-wrapper">
                    <BTN onClick={props.handler} data-tooltip-content-id="itemButton">
                        BUTTON!
                    </BTN>
                </div>
            </DIV>
        </>
    )
}

export default Item

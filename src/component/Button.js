import React from 'react'

const Button = ({ color, text, onclick }) => {
    return (
        <button
            style={{ backgroundColor: `${color}` }}
            className="btn" onClick={onclick}>
            {text}
        </button>
    )
}

export default Button
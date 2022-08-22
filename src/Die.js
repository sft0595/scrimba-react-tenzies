import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <div
            className="die-face"
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="die-num">{Array.from(Array(props.value), (_, i) => <span key={i} className="dot"></span>)}</h2>
        </div>
    )
}
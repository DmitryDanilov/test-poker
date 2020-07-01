import React from 'react'
import Card from './Card'

const PlayerCards = (props) => {

    const [card1, card2] = props.cards

    if (card1 && card2) {
        return (
            <div className="player-cards">
                <Card card={card1} />
                <Card card={card2} />
            </div>
        )
    }
    else {
        return (
            <div>
                нет карт
            </div>
        )
    }
}

export default PlayerCards
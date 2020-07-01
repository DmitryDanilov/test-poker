import React from 'react'

const Card = ({ card }) => {
    const { suit, value } = card
    return (
        <div className="player-card">
            {suit + value}
        </div>
    )
}

export default Card
import React from 'react'
import Card from './Card'

const Table = (props) => {
    const { cards, bank } = props.tableState
    if (cards.length > 0) {

        return (
            <div className="table">
                <div>
                    {cards && cards.map((card, index) => {
                        return <Card key={index} card={card} />
                    })}
                </div>
                <div>Банк: {bank}</div>
            </div>
        )
    }
    return (
        <div className="table">
            <div>Банк: {bank}</div>
        </div>
    )
}

export default Table
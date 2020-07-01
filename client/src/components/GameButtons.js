import React, { useContext } from 'react'
import Context from '../context'

const GameButtons = () => {
    const { startGame, playerMove } = useContext(Context)

    return (
        <div>
            <button
                onClick={startGame.bind(null, { name: 1 })}>
                start
            </button>
            <button
                id='buttonCheck'
                onClick={(e) => {playerMove(e.target.id)}}>
                check
            </button>
            <button
                id='buttonRaise'
                onClick={(e) => {playerMove(e.target.id)}}>
                raise min
            </button>
            <button
                id='buttonRaiseX2'
                onClick={(e) => {playerMove(e.target.id)}}>
                raise x2
            </button>
            <button
                id='buttonFold'
                onClick={(e) => {playerMove(e.target.id)}}>
                fold
            </button>
        </div>
    )
}

export default GameButtons
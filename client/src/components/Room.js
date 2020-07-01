import React, { useState, useContext } from 'react'
import Table from './Table'
import Space from './Space'
import Context from '../context'
import GameButtons from './GameButtons'
import PlayerCards from './PlayerCards'
import socket from '../socket'
import { AuthContext } from '../context/AuthContext'

const Room = () => {
    const { token } = useContext(AuthContext)

    const [spaces, setSpaces] = useState([])
    const [playerCards, setPlayerCards] = useState([])
    const [playerSpaceId, setPlayerSpaceId] = useState(null)
    const [tableState, setTableState] = useState({ cards: [], bank: 0 })


    socket.on('change spaces server', (spaces) => {
        setSpaces(spaces)
    })

    socket.on('change card', (playerCards) => {
        setPlayerCards(playerCards)
    })

    socket.on('change playerSpaceId', (playerSpaceId) => {
        setPlayerSpaceId(playerSpaceId)
    })

    socket.on('change tableState', (tableState) => {
        setTableState(tableState)
    })

    const toggleSpace = (id) => {
        socket.emit('change id', { id, token })
    }

    const startGame = () => {
        socket.emit('start game', { token })
    }

    const playerMove = (data) => {
        socket.emit('playerMove', { token, data })
    }

    const space = spaces[playerSpaceId]
    return (
        <Context.Provider value={{ toggleSpace, startGame, playerMove }}>
            <div>
                {spaces && spaces.map(space => {
                    return <Space key={space.id} space={space} playerSpaceId={playerSpaceId} />
                })}

            </div>
            <div style={{ display: 'flex' }}>
                <Table tableState={tableState} />
                <div>
                    {playerCards && <PlayerCards cards={playerCards} />}
                    {space && space.queue && <div className='label'>ваш ход</div>}
                </div>
            </div>
            <GameButtons />
        </Context.Provider>
    )
}

export default Room
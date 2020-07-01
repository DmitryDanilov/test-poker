const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const config = require('config')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
//const User = require('./models/User')
const getDeck = require('./game/deck')
const fold = require('./game/fold')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

let spaces = []
for (let i = 0; i < 9; i++) {
    spaces.push({
        id: i,
        isEmpty: true,
        name: null,
        cash: 0,
        userId: null,
        queue: null,
        blind: null,
        socketId: null,
        rate: null
    })
}

let cards = new Array(9)

let gameState = { players: [], firstBlind: null }

let tempSocket = ''

app.use(express.json())

app.use('/api/auth', require('./routes/auth.routes'))
//app.use('/api/room', require('./routes/room.routes'))

/*app.get('/r', (req, res) => {
    res.send(spaces)
})*/

const checkUser = (id) => {
    for (let space of spaces) {
        if (space.userId === id) {
            return true
        }
    }
    return false
}


const start = async () => {
    io.on('connection', socket => {
        console.log(`New client connected ${socket.id}`)

        io.emit('change spaces server', spaces)

        socket.on('change id', (data) => {
            const { id, token } = data

            if (!token) {
                return res.status(401).json({ message: 'Нет авторизации' })
            }

            const decoded = jwt.verify(token, config.get('jwtSecret'))

            if (decoded) {
                const isUser = checkUser(decoded.userId)

                if (spaces[id].isEmpty && !isUser) {
                    const spaces2 = spaces.map(space => {
                        if (space.id === id) {
                            space.isEmpty = !space.isEmpty
                            space.name = decoded.nickname
                            space.userId = decoded.userId
                            space.socketId = socket.id
                            space.cash = 1000
                        }
                        return space;
                    })

                    io.emit('change spaces server', spaces2)
                    socket.emit('change playerSpaceId', id)

                }
                else if (spaces[id].name == decoded.nickname) {
                    spaces = spaces.map(space => {
                        if (space.id === id) {
                            space.isEmpty = !space.isEmpty
                            space.name = null
                            space.userId = null
                            space.socketId = null
                            space.cash = 0
                            space.blind = null
                            space.socketId = null
                            space.rate = null
                        }
                        return space;
                    })

                    io.emit('change spaces server', spaces)
                    socket.emit('change playerSpaceId', id)
                }
            }
            else {
                io.emit('change spaces server', spaces)
            }
        })

        socket.on('start game', async (data) => {
            const { token } = data

            if (!token) {
                return res.status(401).json({ message: 'Нет авторизации' })
            }
            else {
                gameState.players = spaces.filter(space => !space.isEmpty).map((space) => {
                    return { id: space.id, userId: space.userId }
                })

                if (gameState.players.length > 1) {


                    const decoded = jwt.verify(token, config.get('jwtSecret'))

                    const deck = getDeck()

                    

                    let countCards = deck.length

                    gameState.players.forEach((value) => {
                        const key = value.id
                        const card1 = deck[Math.floor(Math.random() * countCards)]
                        deck.splice(Math.floor(Math.random() * countCards), 1) //переделать удаление выбранной карты, сейчас удаляется рандомная
                        countCards--
                        const card2 = deck[Math.floor(Math.random() * countCards)]
                        deck.splice(Math.floor(Math.random() * countCards), 1)
                        countCards--
                        cards[key] = [card1, card2]

                        io.to(spaces[key].socketId).emit('change card', cards[key])
                    })

                    const idBigBlind = gameState.players[0].id
                    const idMinBlind = gameState.players[1].id

                    spaces[idBigBlind].blind = 1
                    spaces[idMinBlind].blind = 0
                    spaces[idBigBlind].rate = 20
                    spaces[idMinBlind].rate = 10

                    spaces[idBigBlind].cash -= 20
                    spaces[idMinBlind].cash -= 10

                    spaces[idBigBlind].queue = true

                    io.emit('change spaces server', spaces)
                }
            }
        })

        socket.on('playerMove', (dataObj) => {
            const { token, data } = dataObj

            if (!token) {
                return res.status(401).json({ message: 'Нет авторизации' })
            }

            const decoded = jwt.verify(token, config.get('jwtSecret'))

            if (spaces.filter(el => el.userId === decoded.userId)[0].queue) {
                switch (data) {
                    case 'buttonCheck':
                        console.log(1)
                        break
                    case 'buttonRaise':
                        console.log(2)
                        break
                    case 'buttonRaiseX2':
                        console.log(3)
                        break
                    case 'buttonFold':
                        const foldData = fold(token, spaces, gameState.players)
                        spaces = foldData.sp
                        gameState.players = foldData.gs
                        io.emit('change tableState', { cards: [], bank: foldData.bank })
                        break
                    default:
                        console.log(5)
                        break
                }
                console.log(spaces)
                io.emit('change spaces server', spaces)
            }
        })

        socket.on('disconnect', () => {
            tempSocket = socket.id
            console.log(`user disconnected ${socket.id}`)
        })
    })

    const port = config.get('port')

    await mongoose.connect(config.get('mongoUri'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    server.listen(port, () => console.log(`Listening on port ${port}`))
}

start()
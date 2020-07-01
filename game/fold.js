const config = require('config')
const jwt = require('jsonwebtoken')

const fold = (token, spaces, gameState) => {

    const getBlindId = (spaces) => {
        spaces.forEach((el, index) => {
            if (el.blind === 1) {
                return index
            }
        })
    }

    const getNextQueueId = (gameState, id) => {
        let nextId = null

        gameState.forEach((el, index) => {
            if (el.userId === id) {

                if (index === (gameState.length - 1)) {
                    nextId = gameState[0].id
                }
                else {
                    nextId = gameState[index + 1].id
                }
            }
        })
        return nextId
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'))

    let gs = gameState.slice()
    gs.sort((a, b) => {
        if (a.id > b.id) return 1
        if (a.id == b.id) return 0
        if (a.id < b.id) return -1
    })

    const nextId = getNextQueueId(gs, decoded.userId)


    gs = gs.filter((el) => el.userId !== decoded.userId)
    const sp = spaces.slice()


    let bank = 0

    if (gs.length > 1) {
        const blindId = getBlindId(sp)

        sp[nextId].queue = true
    }
    else {
        spaces.forEach((element, index) => {
            bank += element.rate
            sp[index].rate = 0
        });
    }

    return { sp, gs, bank }
}
module.exports = fold
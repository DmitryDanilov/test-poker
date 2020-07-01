const deck = () => {
    let arrDeck = []
    const suits = ['bubi', 'piki', 'tref', 'cherv']
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    suits.forEach((suit) => {
        values.forEach((value) => {
            arrDeck.push({ suit, value })
        })
    })
    return arrDeck
}

module.exports = deck

/*class Deck extends Map {
    constructor() {
        super()
        this.suits = ['bubi', 'piki', 'tref', 'cherv']
        this.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        this.index = 0
        this.deck = new Map()
        this.hh()
    }

    hh() {
        this.suits.forEach((suit) => {
            this.values.forEach((value) => {
                this.deck.set(this.index, suit + value)
                this.index++
            })
        })
    }
}

module.exports = Deck*/
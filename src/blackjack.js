// all cards in 52 card deck
const cards = [
    "&#x1F0A1", "&#x1F0A2", "&#x1F0A3", "&#x1F0A4", "&#x1F0A5", "&#x1F0A6",
    "&#x1F0A7", "&#x1F0A8", "&#x1F0A9", "&#x1F0AA", "&#x1F0AB", "&#x1F0AD",
    "&#x1F0AE", // spades
    "&#x1F0B1", "&#x1F0B2", "&#x1F0B3", "&#x1F0B4", "&#x1F0B5", "&#x1F0B6",
    "&#x1F0B7", "&#x1F0B8", "&#x1F0B9", "&#x1F0BA", "&#x1F0BB", "&#x1F0BD",
    "&#x1F0BE", // hearts
    "&#x1F0C1", "&#x1F0C2", "&#x1F0C3", "&#x1F0C4", "&#x1F0C5", "&#x1F0C6",
    "&#x1F0C7", "&#x1F0C8", "&#x1F0C9", "&#x1F0CA", "&#x1F0CB", "&#x1F0CD",
    "&#x1F0CE", // diamonds
    "&#x1F0D1", "&#x1F0D2", "&#x1F0D3", "&#x1F0D4", "&#x1F0D5", "&#x1F0D6",
    "&#x1F0D7", "&#x1F0D8", "&#x1F0D9", "&#x1F0DA", "&#x1F0DB", "&#x1F0DD",
    "&#x1F0DE" ] // clubs

// status of game
const statusEl  = document.querySelector("#status-txt")

// player variables
let playerValue = 0
const cardEl = document.querySelector("#card-display")
const valueEl = document.querySelector("#value-display")

// dealer variables
const dealerCardEl = document.querySelector("#dealer-cards")
const dealerValueEl = document.querySelector("#dealer-value")
let dealerFirstCard = ""
let dealerCurrentHand = ""
const backCard = "&#x1F0A0"
let dealerValue = 0

// btn-el assignments for ace functionality
const aceOneEl = document.querySelector("#ace-one")
const aceElevenEl = document.querySelector("#ace-eleven")
let aceBool = false

// btn-el assignment for start, hit, hold, and reset btns
const startEl = document.querySelector("#start-btn")
const hitEl = document.querySelector("#hit-btn")
const holdEl = document.querySelector("#hold-btn")
const resetEl = document.querySelector("#reset-btn")

// btn-el assignment for bet and return btns
const betEl = document.querySelector("#plus-fifty")
const returnEl = document.querySelector("#minus-fifty")
const resultEl = document.querySelector("#result")

// bools and int for money tracking
let canBet = true
let canReturn = false
let balance = 500
let betAmount = 0
const balanceEl = document.querySelector("#money-tracker")
const betAmountEl = document.querySelector("#bet-tracker")

// initial setup
btnSwitch(aceOneEl, false)
btnSwitch(aceElevenEl, false)
btnSwitch(hitEl, false)
btnSwitch(holdEl, false)
btnSwitch(returnEl, false)

// fn to start game
async function start() { 
    dealerCardEl.innerHTML = ""
    dealerCurrentHand = ""
    dealerFirstCard = ""
    cardEl.textContent = ""
    valueEl.textContent = ""
    dealerCardEl.textContent = ""
    dealerValueEl.textContent = ""
    // set btns
    btnSwitch(startEl, false)
    startEl.textContent = "GAME IN SESSION"
    btnSwitch(betEl, false)
    btnSwitch(returnEl, false)
    btnSwitch(hitEl, true)
    btnSwitch(holdEl, true)
    // display two cards
    dealerStart()
    let tempHitNum = hit(false)
    if (tempHitNum === 0 || tempHitNum === 13 ||
        tempHitNum === 26 || tempHitNum === 39) {
            while (!aceBool) {
                await new Promise(resolve => setTimeout(resolve, 1))
            }
    }
    hit(true)
}

function dealerStart() {
    // hide card
    dealerCardEl.innerHTML += 
    "<span style='font-size: 75px;'>"+backCard+"</span"
    // draw two
    dealerValueEl.textContent = "UNKNOWN"
}

function dealerHit(dealerBool) {
    let dealerCardNum = Math.floor(Math.random()*52)
    if (dealerBool) {
        dealerCardEl.innerHTML += 
        "<span style='font-size: 75px;'>"+
        cards[dealerCardNum]+"</span>"
        dealerCurrentHand += 
        "<span style='font-size: 75px;'>"+
        cards[dealerCardNum]+"</span>"
    } else if (!dealerBool) {
        dealerFirstCard = "<span style='font-size: 75px;'>"+
        cards[dealerCardNum]+"</span>"
    }
    if (dealerCardNum === 0 || dealerCardNum === 13 ||
        dealerCardNum === 26 || dealerCardNum === 39) {
            if (dealerValue + 11 > 21) {
                dealerValue += 1
            } else {
                dealerValue += 11
            }
    } else if (dealerCardNum === 9 || dealerCardNum === 10 || dealerCardNum === 11 ||
        dealerCardNum === 12 || dealerCardNum === 22 || dealerCardNum === 23 ||
        dealerCardNum === 24 || dealerCardNum === 25 || dealerCardNum === 35 ||
        dealerCardNum === 36 || dealerCardNum === 37 || dealerCardNum === 38 ||
        dealerCardNum === 48 || dealerCardNum === 49 || dealerCardNum === 50 ||
        dealerCardNum === 51) {
            dealerValue += 10
    } else if (dealerCardNum > 0 && dealerCardNum < 9) {
        dealerValue += dealerCardNum + 1
    } else if (dealerCardNum > 13 & dealerCardNum < 22) {
        dealerValue += dealerCardNum - 12
    } else if (dealerCardNum > 26 && dealerCardNum< 35) {
        dealerValue += dealerCardNum - 25
    } else if (dealerCardNum > 39 && dealerCardNum < 48) {
        dealerValue += dealerCardNum - 38
    }
}

function hit(dealerBool) {
    let tempCardNum = Math.floor(Math.random()*52)
    // logic for adding value
    if (tempCardNum === 0 || tempCardNum === 13 ||
        tempCardNum === 26 || tempCardNum === 39) {
            resultEl.textContent = "You drew an ace! Pick 1 or 11 for its value."
            cardEl.innerHTML += "<span style='font-size: 75px;'>"+cards[tempCardNum]+"</span>"
            btnSwitch(hitEl, false)
            btnSwitch(holdEl, false)
            btnSwitch(aceOneEl, true)
            btnSwitch(aceElevenEl, true)
    } else if (tempCardNum === 9 || tempCardNum === 10 || tempCardNum === 11 ||
        tempCardNum === 12 || tempCardNum === 22 || tempCardNum === 23 ||
        tempCardNum === 24 || tempCardNum === 25 || tempCardNum === 35 ||
        tempCardNum === 36 || tempCardNum === 37 || tempCardNum === 38 ||
        tempCardNum === 48 || tempCardNum === 49 || tempCardNum === 50 ||
        tempCardNum === 51) {
            playerValue += 10
            cardEl.innerHTML += "<span style='font-size: 75px;'>"+cards[tempCardNum]+"</span>"
            valueEl.innerHTML = playerValue
    } else if (tempCardNum > 0 && tempCardNum < 9) {
        playerValue += tempCardNum + 1
        cardEl.innerHTML += "<span style='font-size: 75px;'>"+cards[tempCardNum]+"</span>"
        valueEl.innerHTML = playerValue
    } else if (tempCardNum > 13 & tempCardNum < 22) {
        playerValue += tempCardNum - 12
        cardEl.innerHTML += "<span style='font-size: 75px;'>"+cards[tempCardNum]+"</span>"
        valueEl.innerHTML = playerValue
    } else if (tempCardNum > 26 && tempCardNum< 35) {
        playerValue += tempCardNum - 25
        cardEl.innerHTML += "<span style='font-size: 75px;'>"+cards[tempCardNum]+"</span>"
        valueEl.innerHTML = playerValue
    } else if (tempCardNum > 39 && tempCardNum < 48) {
        playerValue += tempCardNum - 38
        cardEl.innerHTML += "<span style='font-size: 75px;'>"+cards[tempCardNum]+"</span>"
        valueEl.innerHTML = playerValue
    }
    // dealer logic
    if (dealerValue <= 15) {
        dealerHit(dealerBool)
    }

    // logic for bust, blackjack, or keep going
    if (playerValue < 21) {
        resultEl.textContent = "Hit or Hold?"
    } else if (playerValue === 21) {
        btnSwitch(hitEl, false)
        btnSwitch(holdEl, false)
        hold()
    } else if (playerValue > 21) {
        resultEl.textContent = "Bust!"
        btnSwitch(hitEl, false)
        btnSwitch(holdEl, false)
        hold()
    }

    return tempCardNum
}

function hold() {
    if (dealerValue <= 15) {
        dealerHit(true)
    }
    if (playerValue > 21 && dealerValue > 21) {
        resultEl.textContent = "You both busted! The game of Blackjack favors the dealer." +
        "You lose! The dealer keeps your bet amount."
    } else if (playerValue === 21) {
        if (playerValue === dealerValue) {
            resultEl.textContent = "It's a tie! Your bet amount is returned."
            balance += betAmount
        } else {
            resultEl.textContent = "Blackjack! You win! The dealer pays you your bet amount."
            balance += betAmount*2
        }
    } else if (playerValue === dealerValue) {
        resultEl.textContent = "It's a tie! Your bet amount is returned."
        playerValue += betAmount
    } else if (playerValue > dealerValue && playerValue < 21) {
        if (playerValue < 21){
            resultEl.textContent = "You win! The dealer pays you your bet amount."
        }
        balance += betAmount*2
    } else if (playerValue < dealerValue || playerValue > 21) {
        if (playerValue > 21) {
            resultEl.textContent = "Bust! You lose! The dealer keeps your bet amount."
        } else if (dealerValue > 21) {
            resultEl.textContent = "Dealer bust! You win! The dealer pays you your bet amount."
            balance += betAmount*2
        } else {
            resultEl.textContent = "You lose! The dealer keeps your bet amount."
        }
    }
    endGame()
}

function aceOne() {
    playerValue += 1
    resultEl.textContent = "Hit or Hold?"
    valueEl.innerHTML = playerValue
    btnSwitch(hitEl, true)
    btnSwitch(holdEl, true)
    btnSwitch(aceOneEl, false)
    btnSwitch(aceElevenEl, false)
    if (playerValue < 21) {
        resultEl.textContent = "Hit or Hold?"
    } else if (playerValue === 21) {
        btnSwitch(hitEl, false)
        btnSwitch(holdEl, false)
        hold()
    } else if (playerValue > 21) {
        resultEl.textContent = "Bust!"
        btnSwitch(hitEl, false)
        btnSwitch(holdEl, false)
        hold()
    }
    aceBool = true
}

function aceEleven() {
    playerValue += 11
    resultEl.textContent = "Hit or Hold?"
    valueEl.innerHTML = playerValue
    btnSwitch(hitEl, true)
    btnSwitch(holdEl, true)
    btnSwitch(aceOneEl, false)
    btnSwitch(aceElevenEl, false)
    if (playerValue < 21) {
        resultEl.textContent = "Hit or Hold?"
    } else if (playerValue === 21) {
        btnSwitch(hitEl, false)
        btnSwitch(holdEl, false)
        hold()
    } else if (playerValue > 21) {
        resultEl.textContent = "Bust!"
        btnSwitch(hitEl, false)
        btnSwitch(holdEl, false)
        hold()
    }
    aceBool = true
}

// fn for endgame
function endGame() {
    // display dealer first card
    dealerCardEl.innerHTML = dealerFirstCard + dealerCurrentHand
    dealerValueEl.innerHTML = dealerValue
    betAmount = 0
    betAmountEl.textContent = "BET AMOUNT: $0"
    balanceEl.innerHTML = "BALANCE: $" + balance
    if (balance > 0) {
        btnSwitch(startEl, true)
        btnSwitch(betEl, true)
        btnSwitch(holdEl, false)
        btnSwitch(hitEl, false)
        startEl.textContent = "START GAME"
        playerValue = 0
        dealerValue = 0
    } else if (balance <= 0) {
        statusEl.innerHTML = "<p>YOU LOST AND WENT BANKRUPT!"+
            "<br /><br />INELIGIBLE TO KEEP PLAYING, PLEASE RESET TABLE</p>"
    }
}

function bet() {
    if (balance > 0) {
        balance -= 50
        betAmount += 50
        betAmountEl.innerHTML = "BET AMOUNT: $" + betAmount
        balanceEl.innerHTML = "BALANCE: $" + balance
        btnSwitch(returnEl, true)
        if (balance === 0) {
            btnSwitch(betEl, false)
        }
    } else if (balance <= 0) {
        btnSwitch(betEl, false)
    }
}

function returnMoney() {
    if (betAmount > 0) {
        balance += 50
        betAmount -= 50
        betAmountEl.innerHTML = "BET AMOUNT: $" + betAmount
        balanceEl.innerHTML = "BALANCE: $" + balance
        btnSwitch(betEl, true)
        if (betAmount === 0) {
            btnSwitch(returnEl, false)
        }
    } else if (betAmount <= 0) {
        btnSwitch(returnEl, false)
    }
}

// fn to reset table
function reset() {
    location.reload()
}

// fn to enable and disable btns
// if onOff is false, disable, if on, enable
function btnSwitch(element, onOff) {
    if (!onOff) {
        element.disabled = true
    } else if (onOff) {
        element.disabled = false
    }
}
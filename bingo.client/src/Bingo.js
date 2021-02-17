import { logger } from './utils/Logger'

export const phrases = [
  'Your on Mute',
  'This should be working',
  '🤷‍♀️🤷‍♂️🤷‍♀️',
  'I need to jump on another call',
  'We lost you',
  'Is everyone here?',
  'Can you see my screen',
  'Let\'s take this offline',
  'Bad feedback',
  'What\'s that noise?',
  'Hard Stop',
  'Oh, Only 5 more minutes',
  'Are we ready to go?',
  'How much time do I have',
  'This worked last night',
  'Empty Chat',
  'No one responds',
  'Awkward silence',
  'You\'re still sharing',
  'Now can you hear me?',
  'Oops forgot to mute',
  'Uhh you go first',
  'Dog barking',
  'Sirens in the background',
  'Awkward close up',
  'Let\'s get started',
  'Take a 5 minute break',
  'Is ______ on here?',
  '🍕 Lunch Break',
  '☕ break',
  'Cat Butt 🐈',
  'Child Interuption',
  'Doorbell',
  'Visible Energy Drink',
  'Annoying Keyboard',
  'Speaker Wearing a Hat',
  'New Normal',
  'Covid',
  'Agile/Scrum',
  'That\'s new',
  'I\'m not tech savy',
  'Exotic Pet',
  '🔥 2020 🔥',
  'Getting Political',
  'Poor Lighting',
  'Exercise Equipment',
  'Bad Mic',
  'More than 6 tabs open',
  'Powerpoint',
  '"Many Hats"',
  'A wild Meme appears',
  'Curses $*&@^!'
]

const BINGO = 'BINGO'

const ids = generateIds()

function generateIds() {
  const ids = []
  let x = 2
  for (let i = 0; i < 25; i++) {
    if (i % 5 === 0) {
      x++
    }
    ids[i] = BINGO[i % BINGO.length] + (x - 2)
  }
  return ids
}

export class Bingo {
  static generateBoard() {
    const shuffled = shuffle(shuffle(shuffle(phrases)))
    const board = shuffled.map((p, i) => {
      return {
        id: ids[i],
        phrase: p,
        selected: false
      }
    })
    board.splice(12, 1, {
      id: 'N3',
      phrase: 'FREEBIE',
      selected: true
    })
    return board.slice(0, 25)
  }

  static checkBoard(board) {
    try {
      const selected = board.filter(s => s.selected)
      if (selected.length < 5) { return false }
      const matches = {}
      const d1 = { B1: true, I2: true, N3: true, G4: true, O5: true }
      const d2 = { B5: true, I4: true, N3: true, G2: true, O1: true }
      for (let i = 0; i < selected.length; i++) {
        const s = selected[i]
        matches[s.id[1]] = matches[s.id[1]] || []
        matches[s.id[1]].push(s)
        matches[s.id[0]] = matches[s.id[0]] || []
        matches[s.id[0]].push(s)
        if (d1[s.id]) {
          delete d1[s.id]
          if (Object.keys(d1).length === 0) { return true }
        }
        if (d2[s.id]) {
          delete d2[s.id]
          if (Object.keys(d2).length === 0) { return true }
        }
        if (matches[s.id[0]].length === 5 || matches[s.id[1]].length === 5) { return true }
      }
      return false
    } catch (e) {
      logger.error(e)
      return false
    }
  }
}

function shuffle(array) {
  let currentIndex = array.length; let temporaryValue; let randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return [...array]
}

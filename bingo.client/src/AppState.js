import { reactive } from 'vue'
import { socketService } from './services/SocketService'
import { catNameGenerator, generateId } from './utils/CatGenerator'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  users: [],
  bingos: []
})

getStoredAccount()

function getStoredAccount() {
  const random = generateCatUser()
  const stored = JSON.parse(localStorage.getItem('bingo_user'))
  if (!stored) {
    return setStoredUser(random)
  }
  AppState.profile = stored
  AppState.user = stored
  socketService.emit('set:user', stored)
}

export function generateCatUser() {
  const random = {
    id: generateId(),
    name: catNameGenerator()
  }
  random.picture = `https://robohash.org/${random.name.split(' ').join('-').toLowerCase()}?set=set4`
  return random
}

export function setStoredUser(user) {
  AppState.profile = user
  AppState.user = user
  localStorage.setItem('bingo_user', JSON.stringify(user))
  socketService.emit('set:user', user)
}

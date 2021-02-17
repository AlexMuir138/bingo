import { Logger, toast } from '@bcwdev/quickvue'
import { AppState } from '../AppState'
import { addOrUpdate, remove } from '../utils/ArrayHelpers'
import { SocketHandler } from '../utils/SocketHandler'
class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('user:connected', this.onUserConnected)
      .on('user:disconnected', this.onUserDisconnected)
      .on('set:users', this.onSetUsers)
      .on('set:bingos', this.onSetBingos)
      .on('bingo', this.onBingo)
  }

  onUserConnected(user) {
    Logger.log('[USER:CONNECTED]', user)
    addOrUpdate(AppState.users, user)
  }

  onUserDisconnected(user) {
    Logger.log('[USER:DISCONNECTED]', user)
    remove(AppState.users, user)
  }

  onSetUsers(users) {
    Logger.log('[SET:USERS]', users)
    AppState.users = Object.values(users)
  }

  onSetBingos(bingos) {
    Logger.log('[SET:BINGOS]', bingos)
    AppState.bingos = bingos
  }

  onBingo(bingo) {
    Logger.log('[BINGO]', bingo)
    addOrUpdate(AppState.bingos, bingo)
    toast({
      title: 'BINGO!!!',
      body: `${bingo.user.name}`,
      img: bingo.user.picture,
      type: 'bg-dark'
    })
  }
}

export const socketService = new SocketService()

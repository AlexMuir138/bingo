<template>
  <div class="">
    <div class="bingo-board">
      <div class="heading">
        B
      </div>
      <div class="heading">
        I
      </div>
      <div class="heading">
        N
      </div>
      <div class="heading">
        G
      </div>
      <div class="heading">
        O
      </div>
      <div
        v-for="s in squares"
        :key="s.id"
        @click="toggleSquare(s)"
        class="square text-center"
        :class="s.selected ? 'selected':''"
        :style="isMobile ? 'font-size:70%;' : ''"
      >
        {{ s.phrase }}
      </div>
    </div>
    <Users />
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { Bingo } from '../Bingo'
import { toastInfo, UTILS } from '@bcwdev/quickvue'
import confetti from 'canvas-confetti'
import { socketService } from '../services/SocketService'

export default {
  name: 'Home',
  setup() {
    const squares = ref(Bingo.generateBoard())
    const finished = ref(false)
    const threeMinutes = (1000 * 60 * 3)
    let lastBingo = Number(localStorage.getItem('last_bingo')) || (Date.now() - threeMinutes)

    async function playAgain() {
      if (Date.now() - lastBingo < threeMinutes) {
        const yes2 = await UTILS.$confirm('That was fast 😕', 'Are you sure you that was fair?')
        if (!yes2) {
          toastInfo('Thanks for playing honestly')
          finished.value = false
          squares.value = Bingo.generateBoard()
          return
        }
      }
      const yes = await UTILS.$confirm('Congratulations!!!', 'Ready to play again?')
      if (yes) {
        lastBingo = Date.now()
        socketService.emit('bingo', squares.value)
        finished.value = false
        squares.value = Bingo.generateBoard()
      }
    }

    return reactive({
      finished,
      squares,
      isMobile: computed(() => UTILS.isMobile),
      toggleSquare(s) {
        if (finished.value) { return playAgain() }
        if (s.id === 'N3') { return }
        s.selected = !s.selected
        if (Bingo.checkBoard(squares.value)) {
          finished.value = true
          this.fireConfetti()
          setTimeout(playAgain, 1000)
        }
      },
      fireConfetti() {
        const count = 200
        const defaults = {
          origin: { y: 0.7 }
        }

        function fire(particleRatio, opts) {
          confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
          }))
        }

        fire(0.25, {
          spread: 26,
          startVelocity: 55
        })
        fire(0.2, {
          spread: 60
        })
        fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8
        })
        fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2
        })
        fire(0.1, {
          spread: 120,
          startVelocity: 45
        })
      }
    })
  }
}
</script>

<style scoped lang="scss">
.bingo-board{
  display: grid;
  place-content: center;
  height: 80vh;
  width: 100vw;
  grid-template-columns: repeat(5, min(250px, 20%));
  grid-template-rows: repeat(6, max(16%, 10vh));
  .heading{
    font-size: 3rem;
    display: grid;
    place-content: center;
    background: #313130;
    border: 1px solid #464646;
    color: #f0f0f0;
  }
  .square{
    background: rgb(255, 255, 255);
    transition: all .15s linear;
    border: 1px solid #46464649;
    display: grid;
    place-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    text-transform: capitalize;
    user-select: none;
    &:hover:not(.selected){
      background: #ecf8fe;
      color: rgb(3, 34, 75);
      cursor: pointer;
    }
    &.selected{
      background: #fefdec;
      color: #4b3b03;
      cursor: pointer;
    }
  }
}

</style>

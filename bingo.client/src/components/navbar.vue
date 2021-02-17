<template>
  <div class="d-flex align-items-center justify-content-between p-1 bg-dark">
    <div class="flex-grow-1">
      <img
        :src="user.picture"
        alt="user photo"
        height="50"
        class="rounded bg-primary darken-30 p-1"
        :title="user.name"
      />
      <span class="mx-2">
        {{ user.name }}
      </span>
    </div>

    <QBtn class="btn text-info" @click="generateUser">
      <small class="badge">Change Username</small>
    </QBtn>
  </div>
</template>

<script>
import { AppState, generateCatUser, setStoredUser } from '../AppState'
import { computed, reactive } from 'vue'
import { UTILS } from '@bcwdev/quickvue'
export default {
  name: 'Navbar',
  setup() {
    return reactive({
      user: computed(() => AppState.user),
      async generateUser() {
        const yes = await UTILS.$confirm('Usernames are randomly assigned', 'Are you sure you want to change?')
        if (!yes) { return }
        const user = generateCatUser()
        setStoredUser(user)
      }
    })
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: translateX(200px);
  transition: all 0.15s linear;
  width: 250px !important;
}
.dropdown-menu.show {
  transform: translateX(-200px);
  margin-right: 1.5rem;
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--primary);
}
</style>

<template>
  <div class="mx-1">
    <div class="stats d-flex align-items-center justify-content-around">
      <QDialogCard :dialog-class="isMobile ? 'maximize':''">
        <QBtn class="p-0">
          <span class="text-muted badge text-uppercase"><QIcon icon="mdi-cat" /> Online: {{ users.length }} </span>
        </QBtn>
        <template #expanded>
          <div class="card">
            <div class="border-bottom sticky-top bg-white">
              <div class="p-3 mx-4">
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    <p class="f-14 m-0">
                      <QIcon icon="mdi-cat mr-2 text-primary f-20" />
                      <b>Connected Users</b>
                    </p>
                    <small class="text-muted">
                      The more the merrier!
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body bg-light darken-20 full">
              <div class="container">
                <div class="d-flex flex-wrap">
                  <div class="col-lg-3 col-12 mb-4" v-for="u in users" :key="u.id">
                    <div class="bg-dark p-2 rounded elevation-2 text-center">
                      <div class="rounded lg">
                        <img :src="u.picture" class="p-1 rounded" height="120" width="120">
                      </div>
                      <kbd class="my-2 clip-text bg-secondary lighten-40 badge">
                        {{ u.name }}
                      </kbd>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </QDialogCard>
      <QDialogCard :dialog-class="isMobile ? 'maximize':''">
        <QBtn class="p-0">
          <span class="text-muted badge text-uppercase"><QIcon icon="mdi-seal" /> Bingos: {{ bingos.length }} </span>
        </QBtn>
        <template #expanded>
          <div class="card">
            <div class="border-bottom sticky-top bg-white">
              <div class="p-3 mx-4">
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    <p class="f-14 m-0">
                      <QIcon icon="mdi-seal mr-2 text-success f-20" />
                      <b>Bingos</b>
                    </p>
                    <small class="text-muted">
                      Celebrate the victories
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body bg-light darken-20 full">
              <div class="w-100">
                <QCollapse class="elevation-2" v-for="b in bingos" :key="b.id">
                  <template #trigger="{show}">
                    <div class="w-100 bingo-header list-group-item d-flex align-items-center" :class="show ? 'bg-dark text-white mx-2 mt-2':'bg-white'">
                      <img :src="b.user.picture" class="p-1 rounded" height="60">
                      <div class="ml-4">
                        <h4 class="">
                          {{ b.user.name }}
                        </h4>
                        <kbd>Tiles: {{ b.board.filter(s => s.selected).length }}</kbd>
                      </div>
                    </div>
                  </template>
                  <div class="mx-2 border-top border-4 border-primary bg-dark mb-2 pb-2">
                    <ul class="pt-2">
                      <li class="text-white" v-for="s in b.board.filter(s => s.selected)" :key="b.id + s.id">
                        <b>{{ s.id }}:</b><span class="ml-2">{{ s.phrase }}</span>
                      </li>
                    </ul>
                  </div>
                </QCollapse>
              </div>
            </div>
          </div>
        </template>
      </QDialogCard>
    </div>
    <div class="scrollable-x pt-1">
      <div class="users">
        <div class="user position-relative d-flex align-items-center" v-for="u in users" :key="u.id" :class="user.id === u.id ? 'self':''" :title="u.name">
          <img :src="u.picture" class="user-img p-1 elevation-2 rounded-right">
          <span class="self star">🌟</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { UTILS } from '@bcwdev/quickvue'
export default {
  setup() {
    return reactive({
      isMobile: computed(() => UTILS.isMobile),
      user: computed(() => AppState.user),
      users: computed(() => AppState.users),
      bingos: computed(() => AppState.bingos)
    })
  }
}
</script>

<style lang="scss" scoped>
.users{
  display: flex;
}
.user{
  height: 40px;
  width: 40px;
  transition: all .15s linear;
  cursor: pointer;
  user-select: none;
  .user-img{
    height: 40px;
    width: 40px;
    object-fit: contain;
    object-position: center;
    &.lg{
      height: 120px;
      width: 120px;
    }
  }
  &.lg{
    height: 120px;
    width: 120px;
  }
  &:hover{
    transform: translateY(-4px);
  }
  &.self .self{
    display: unset;
    position: absolute;
  }
  .self{
    display: none;
  }
  .star{
    left: 25px;
    bottom: -5px;
    z-index: 2;
  }

  &:nth-child(odd){
    background-color: rgb(11, 59, 48);
  }
  &:nth-child(even){
    background-color: rgb(98, 92, 47);
  }
  &:nth-child(3){
    background-color: rgb(71, 121, 85);
  }
  &:nth-child(4){
    background-color: rgb(93, 23, 23);
  }
  &:nth-child(5){
    background-color: rgb(100, 26, 94);
  }

}

.bingo-header{
  transition: all .2s linear;
}

.full{
  min-height: calc(100vh - 86px);
}
</style>

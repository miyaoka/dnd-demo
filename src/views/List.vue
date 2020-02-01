<template>
  <ul class="items">
    <li v-for="(item, i) in list" :key="i" @click="() => select(i)">
      {{ item }} ({{ i }})
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { mv } from '@/utils/list'

export default Vue.extend({
  data() {
    return {
      list: 'ABCDE'.split(''),
      selectedIndex: -1
    }
  },
  methods: {
    select(index: number) {
      if (this.selectedIndex < 0) {
        this.selectedIndex = index
        return
      }
      this.list = mv(this.list, this.selectedIndex, index)
      this.selectedIndex = -1
    }
  }
})
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
}
.items {
  width: 100px;
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #666;
    padding: 10px;
    margin: 2px;
    cursor: pointer;
    user-select: none;
    &.isSelected {
      background: #666;
      color: #fff;
    }
  }
}
</style>

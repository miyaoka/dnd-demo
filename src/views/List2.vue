<template>
  <div>
    <p>{{ fromIndex }} -> {{ toIndex }}</p>

    <ul class="items" :class="{ isDragging: fromIndex >= 0 }">
      <li
        v-for="(item, i) in list"
        :key="i"
        @mousedown="e => onDragStart(e, i)"
        :style="draggingStyles[i]"
        :class="{ isDragging: fromIndex === i }"
      >
        {{ item }} ({{ i }})
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mv } from '@/utils/list'

export default Vue.extend({
  data() {
    return {
      list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      fromIndex: -1,
      toIndex: -1,
      dragStartY: 0,
      deltaY: 0,
      selectedIndex: -1,
      draggingStyles: [] as (Record<string, string> | null)[],
      draggingStyle: null as Record<string, string> | null,
      draggingRect: {} as { width: number; height: number }
    }
  },
  methods: {
    getTranslate(index: number) {
      if (this.fromIndex === index)
        return Math.min(
          this.draggingRect.height * (this.list.length - this.fromIndex - 1),
          Math.max(-this.draggingRect.height * this.fromIndex, this.deltaY)
        )

      const i = index < this.fromIndex ? index + 1 : index
      if (i > this.toIndex) return this.draggingRect.height
      return null
    },

    getStyle(index: number) {
      if (index === this.fromIndex) {
        return { transform: `translateY(${this.deltaY}px)` }
      }
      return null
    },
    onDragStart(e: MouseEvent, index: number) {
      console.log(e)
      this.fromIndex = this.toIndex = index
      this.dragStartY = e.pageY
      const target = e.target as HTMLElement

      const { offsetWidth: width, offsetHeight: height } = target

      this.draggingRect = {
        width,
        height
      }
      this.draggingStyle = {
        width: `${width}px`,
        height: `${height}px`
      }
      document.addEventListener('mousemove', this.onDrag)
      document.addEventListener('mouseup', this.onDragEnd)
      this.onDrag(e)
    },
    onDrag(e: MouseEvent) {
      this.deltaY = e.pageY - this.dragStartY
      this.toIndex =
        this.fromIndex +
        Math.floor(this.deltaY / this.draggingRect.height + 0.5)

      const getTranslate = (index: number) => {
        // ドラッグ要素
        if (this.fromIndex === index) return this.deltaY
        // ドラッグ要素より前の要素はindex加算
        const adjustedIndex = index < this.fromIndex ? index + 1 : index
        // ドラッグ先より後ろの要素はずらす
        if (adjustedIndex > this.toIndex) return this.draggingRect.height
        // それ以外はstyle設定しない
        return null
      }

      const styles = this.list.map((_item, index) => {
        const diff = getTranslate(index)
        return diff ? { transform: `translateY(${diff}px)` } : null
      })
      styles[this.fromIndex] = {
        ...this.draggingStyle,
        ...styles[this.fromIndex]
      }
      this.draggingStyles = styles
    },
    onDragEnd(e: MouseEvent) {
      this.list = mv(this.list, this.fromIndex, this.toIndex)
      this.draggingStyles = []
      this.draggingStyles[this.fromIndex] = {
        transition: 'none'
      }
      this.fromIndex = this.toIndex = -1
      this.deltaY = 0
      console.log('dragEnd')
      document.removeEventListener('mousemove', this.onDrag)
      document.removeEventListener('mouseup', this.onDragEnd)
    },
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
  width: 160px;
  margin: 100px 0;
  li:not(.isDragging) {
    transition: ease-out 0.2s;
  }
  li {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    border: 1px solid #666;
    padding: 10px;
    margin: 0;
    height: 40px;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    background: #fff;
    z-index: 1000;

    &.isDragging {
      position: absolute;
      background: #ffc;
      z-index: 1;
      box-shadow: 4px 4px 4px rgba(#666, 0.2);
    }
    // &:nth-child(2) {
    //   height: 100px;
    // }
    // &:nth-child(4) {
    //   height: 50px;
    // }
  }
}
</style>

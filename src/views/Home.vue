<template>
  <div class="home">
    <DomRenderer :dom="dom" />
  </div>
</template>

<script lang="ts">
import DomRenderer from '@/components/DomRenderer'
import dom from '@/assets/dom.json'
import tree from '@/assets/node.yaml'

console.log(tree)
export default {
  name: 'home',
  data() {
    return {
      dom
    }
  },
  components: {
    DomRenderer
  }
}
</script>

<style lang="scss" scoped>
.dom {
  outline: 1px solid #999;
}
</style>

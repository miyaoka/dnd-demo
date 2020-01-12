<template>
  <div class="home">
    <div>selectedNode: {{ selectedNode }}</div>
    <label v-if="selectedNode">
      move: <input type="checkbox" v-model="isMove" />
    </label>
    <TreeRenderer :node="tree" :select="onSelect" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TreeRenderer from '@/components/TreeRenderer'
import tree from '@/assets/node.json'

export default Vue.extend({
  name: 'home',
  data() {
    return {
      tree,
      selectedNode: '',
      isMove: false
    }
  },
  components: {
    TreeRenderer
  },
  methods: {
    onSelect(nodeName: string) {
      if (this.isMove) {
        this.mv(this.selectedNode, nodeName)
        return
      }
      this.selectedNode = nodeName
    },
    mv(from: string, to: string) {
      console.log(from, to)
    }
  }
})
</script>

<style lang="scss" scoped>
.branch-container {
  background: rgba(rgb(151, 151, 151), 0.2);
}
.leaf,
.branch,
.children {
  font-size: 20px;
}

.leaf,
.branch {
  cursor: pointer;
  text-align: left;
  padding: 0.2em;
  margin-top: 0.5em;
  display: flex;
  flex: 1;
  flex-direction: row;
  &::before {
    padding: 0 0.5em 0 0.1em;
  }
}
.leaf {
  background: rgb(159, 218, 218);
  &::before {
    content: '📄';
  }
}
.branch {
  background: rgb(255, 211, 160);
  &::before {
    content: '📂';
  }
}
.children {
  padding: 0.5em 0px 0.5em 1.6em;
  background: rgba(#333, 0.2);
}
</style>

<template>
  <div class="home">
    <div class="container">
      <TreeRenderer :node="tree" :select="onSelect" />
      <div class="menu">
        <div>selectedNodeId: {{ selectedNodeId }}</div>
        <div class="error" v-if="errorText">{{ errorText }}</div>
        <textarea :value="JSON.stringify(tree, null, 4)" />
        <StyleRenderer :text="selectedStyle" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TreeRenderer from '@/components/TreeRenderer'
import StyleRenderer from '@/components/StyleRenderer'
import tree from '@/assets/tree.json'
import { moveNode } from '@/utils/node'
import { Node } from '@/types/node'

const selectedStyle = `{
  background: #ff0!important
}`

export default Vue.extend({
  data() {
    return {
      tree: tree as Node,
      selectedNodeId: '',
      errorText: ''
    }
  },
  components: {
    TreeRenderer,
    StyleRenderer
  },
  computed: {
    selectedStyle(): string {
      return this.selectedNodeId
        ? `div[data-node-id="${this.selectedNodeId}"]${selectedStyle}`
        : ''
    }
  },
  methods: {
    onSelect(nodeName: string) {
      this.errorText = ''
      if (this.selectedNodeId) {
        this.mv(this.selectedNodeId, nodeName)
        return
      }
      this.selectedNodeId = nodeName
    },
    mv(from: string, to: string) {
      try {
        this.tree = moveNode(this.tree, from, to)
      } catch (e) {
        this.errorText = e.message
      } finally {
        this.selectedNodeId = ''
      }
    }
  }
})
</script>

<style lang="scss">
.container {
  display: flex;
}
.menu {
  width: 300px;
  display: flex;
  flex-direction: column;

  textarea {
    display: flex;
    flex: auto;
  }
}
.error {
  color: #f00;
}
</style>

<style lang="scss">
.branch-container {
  display: flex;
  flex-direction: column;
  flex: auto;
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
  &:hover {
    opacity: 0.7;
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

import Vue, { PropType, VNode } from 'vue'

export type Node = Branch | Leaf
export type Branch = Record<string, Node[]>
export type Leaf = string

const isLeaf = (node: Node): node is Leaf => {
  return typeof node === 'string'
}

export default Vue.component('TreeRenderer', {
  functional: true,
  props: {
    node: {
      type: [Object, String] as PropType<Branch | Leaf>,
      required: true
    },
    select: {
      type: Function,
      required: true
    }
  },
  render(h, { props }): VNode | VNode[] {
    const onHandler = (nodeName: string) => ({
      click: (e: MouseEvent) => {
        select(nodeName)
      }
    })

    const { node, select } = props
    if (isLeaf(node)) {
      return h(
        'div',
        {
          class: 'leaf',
          on: onHandler(node)
        },
        node
      )
    }

    const [key, children] = Object.entries(node)[0]
    return [
      h(
        'div',
        {
          class: 'branch-container'
        },
        [
          h(
            'div',
            {
              class: 'branch',
              on: onHandler(key)
            },
            key
          ),
          h(
            'div',
            {
              class: 'children'
            },
            children.map(child =>
              h('TreeRenderer', {
                props: { ...props, node: child }
              })
            )
          )
        ]
      )
    ]
  }
})

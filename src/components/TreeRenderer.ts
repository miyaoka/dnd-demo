import Vue, { PropType, VNode } from 'vue'
import { Node } from '@/types/node'

export default Vue.component('TreeRenderer', {
  functional: true,
  props: {
    node: {
      type: [Object, String] as PropType<Node>,
      required: true
    },
    select: {
      type: Function,
      required: true
    }
  },
  render(h, { props }): VNode {
    const onHandler = (nodeName: string) => ({
      click: (e: MouseEvent) => {
        e.stopPropagation()
        select(nodeName)
      }
    })

    const { node, select } = props
    const { id, children } = node

    const nodeElement = (className: string) => {
      return h(
        'div',
        {
          class: className,
          on: onHandler(id),
          attrs: {
            'data-node-id': id
          }
        },
        id
      )
    }

    if (!children) return nodeElement('leaf')

    return h(
      'div',
      {
        class: 'branch-container'
      },
      [
        nodeElement('branch'),
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
  }
})

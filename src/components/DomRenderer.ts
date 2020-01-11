import Vue, { PropType, VNode } from 'vue'

export interface Dom {
  id: string
  tag?: string
  text?: string
  style?: Record<string, string>
  class?: string[]
  children?: Dom[]
}

export default Vue.component('DomRenderer', {
  functional: true,
  props: {
    dom: {
      type: Object as PropType<Dom>,
      required: true
    }
  },
  render(h, { props }): VNode {
    const { dom } = props

    return h(
      dom.tag || 'div',
      {
        class: dom.class ? ['dom', ...dom.class] : 'dom',
        style: dom.style,
        domProps: {
          innerHTML: dom.text
        }
      },
      (dom.children || []).map(child =>
        h('DomRenderer', {
          props: { dom: child }
        })
      )
    )
  }
})

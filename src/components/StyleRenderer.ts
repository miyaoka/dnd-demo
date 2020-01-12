import Vue from 'vue'

export default Vue.component('StyleRenderer', {
  functional: true,
  props: {
    text: String
  },
  render(h, { props }) {
    return h('style', props.text)
  }
})

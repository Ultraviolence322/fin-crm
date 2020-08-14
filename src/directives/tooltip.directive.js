export default {
  bind(el, { value }) {
    window.M.Tooltip.init(el, { html: value })
  },
  unbind(el) {
    const Tooltip = window.M.Tooltip.getInstance(el)

    if (Tooltip && Tooltip.destroy) {
      Tooltip.destroy()
    }
  }
}
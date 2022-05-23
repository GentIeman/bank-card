import Vue from "vue"

const handlers = new Map()

const updateHandler = (el, binding) => {
  el.removeEventListener('input', handlers.get(el))

  const handler = () => {
    const value = el.value.replace(/\D/g, '').slice(0, binding.value)
    if (value !== el.value) {
      el.value = value;
      el.dispatchEvent(new Event('input'))
    }
  }
  handler()
  handlers.set(el, handler)
  el.addEventListener('input', handler);
}

Vue.directive("maxlength", {
  bind: updateHandler,
  update: updateHandler,
  unbind(el) {
    el.removeEventListener('input', handlers.get(el));
    handlers.delete(el);
  },
})


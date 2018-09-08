export function addClassName (el, className) {
  if (hassClassName(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}
export function hassClassName (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
export function getSingerKeyEle (el, name, val) {
  let prefiex = 'data-'
  if (val) {
    return el.setAttribute(prefiex + name, val)
  }
  return el.getAttribute(prefiex + name)
}

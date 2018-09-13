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

let styElement = document.createElement('div').style
let textSty = (() => {
  let styleNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    0: '0Transform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in styleNames) {
    if (styElement[styleNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()
export function prefixSty (style) {
  if (!textSty) {
    return false
  }
  if (textSty === 'standard') {
    return style
  }
  return textSty + style.charAt(0).toUpperCase() + style.substring(1, style.length)
}

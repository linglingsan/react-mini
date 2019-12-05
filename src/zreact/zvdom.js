export function createVNode(vtype, type, props) {
  const vnode = {vtype, type, props}
  return vnode
}

export function initVNode(vnode) {
  const {vtype} = vnode
  if(!vtype) {
    return document.createTextNode(vnode)
  }

  if(vtype === 1) {
    return createElement(vnode)
  }else if(vtype === 2) {
    return createClassComp(vnode)
  }else if(vtype === 3) {
    return createFuncComp(vnode)
  }
}

function createElement(vnode) {
  const {type, props} = vnode

  const node = document.createElement(type)
  const {key, children, ...rest} = props
  Object.keys(rest).forEach(k => {
    if(k === "className") {
      node.setAttribute("class", rest[k])
    }else if(k === "htmlFor") {
      node.setAttribute("for", rest[k])
    }else if(k === "style" && typeof rest[k] === "object") {
      const style = Object.keys(rest[k]).map(s => `${s}:${rest[k][s]}`).join(";")
      node.setAttribute("style", style)
    }else if(k.startsWith("on")) {
      const event = k.toLowerCase()
      node[event] = rest[k]
    }else {
      node.setAttribute(k, rest[k])
    }
  })

  children.forEach(c => {
    if(Array.isArray(c)) {
      c.forEach(n => node.appendChild(initVNode(n)))
    }else {
      node.appendChild(initVNode(c))
    }
  })

  return node
}

function createClassComp(vnode) {
  const {type, props} = vnode
  const component = new type(props)
  const vdom = component.render()
  return initVNode(vdom)
}

function createFuncComp(vnode) {
  const {type, props} = vnode
  const vdom = type(props)
  return initVNode(vdom)
}
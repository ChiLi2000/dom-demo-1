window.dom = {
  //创建节点
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  //增加哥哥
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  //增加弟弟
  //将node2插入到node的后面 == 将node2插入到node的下一个节点的前面
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  //增加儿子
  append(parent, node) {
    parent.appendChild(node);
  },
  //增加爸爸
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  },
  //删除自己
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  //   删除儿子
  //   所有array存储删去的东西，以便日后有用
  empty(node) {
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(x));
      x = node.firstChild; //删除孩子节点时长度实时变化，所以设置为总是删去第一个孩子
      console.log(x);
    }
    return array;
  },

  //   读写属性
  attr(node, name, value) {
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  //   读写文本内容 重载+适配
  text(node, string) {
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerHTML = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerHTML;
      } else {
        return node.textContent;
      }
    }
  },
  //   读写html内容
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  //   读写style
  style(node, name, value) {
    if (arguments.length === 3) {
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        return node.style[name];
      } else if (name instanceof Object) {
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
          //   return node.style[key];
        }
      }
    }
  },
  //   添加css
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    // 删除css
    remove(node, className) {
      node.classList.remove(className);
    },
    // 判断是否有css
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  //   添加事件监听
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  //   删除事件监听
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  // 获取标签
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  //   获取父元素
  parent(node) {
    return node.parentNode;
  },
  //   获取子元素
  children(node) {
    return node.children;
  },
  //   获取兄弟元素
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  //   获取弟弟
  //如果x是文本，就让它等于下一个
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  //   获取哥哥
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  //   遍历所有节点
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  //   获取排行
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};

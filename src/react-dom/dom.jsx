// setAttribute方法用于设置属性集合的属性
// setAttribute方法接收三个参数，分别是虚拟DOM对应的真实DOM元素标签、该标签的属性名、属性值
const setAttribute = (dom, name, value) => {
  // 如果属性名是className，则改回class
  if (name === "className") name = "class";

  // 如果属性名是onXXX，则是一个时间监听方法onClick
  if (/on\w+/.test(name)) {
    // 在html中事件绑定方法是小写，需将驼峰属性名转换为小写
    name = name.toLowerCase();
    dom[name] = value || "";
    // 如果属性名是style，则更新style对象
  } else if (name === "style") {
    // 这种形式：style="red"
    if (!value || typeof value === "string") {
      dom.style.cssText = value || "";
    }
    // 这种形式: style={ color:red }
    else if (value && typeof value === "object") {
      for (let name in value) {
        // 可以通过style={ width: 20 }这种形式来设置样式，可以省略掉单位px
        dom.style[name] =
          typeof value[name] === "number" ? value[name] + "px" : value[name];
      }
    }
    // 普通属性则直接更新属性
  } else {
    if (name in dom) {
      dom[name] = value || "";
    }
    if (value) {
      dom.setAttribute(name, value); // 属性值存在，设置属性值
    } else {
      dom.removeAttribute(name, value); // 属性值不存在，移除属性
    }
  }
};

export default setAttribute;

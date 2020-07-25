const div1 = dom.create("<div><span>增加的第一个盒子</span></div>");
console.log(div1);

dom.before(test, div1);
dom.after(test, div1);
dom.append(test, div1);

const div2 = dom.create("<div>parent</div>");
dom.wrap(test, div2);
console.log(div2);

dom.remove(test2);
dom.empty(test3);

dom.attr(test, "title", "only");
const value = dom.attr(test, "title");
console.log(`value: ${value}`);

dom.text(test4, "文本被改变惹");
const string = dom.text(test4);
console.log(`string: ${string}`);

dom.style(test4, "color", "red");
const t4_color = dom.style(test4, "color");
console.log(`t4_color: ${t4_color}`);
dom.style(test, {
  border: "1px solid red",
  color: "blue",
  background: "yellow",
});
const t_color = dom.style(test, "color");
const s_value = dom.attr(test, "style");
console.log(`value: ${s_value}`);

dom.class.add(test, "red");
dom.class.add(test, "blue");
dom.class.remove(test, "red");
console.log(dom.class.has(test, "blue"));

const fn = () => {
  console.log("点击啦~");
};
dom.on(test4, "click", fn); //参数不能与标识符重名如 onclick
dom.off(test4, "click", fn);

const testDiv = dom.find("#test4")[0];
console.log(testDiv);
console.log(dom.find("#test", testDiv)[0]);

console.log(dom.parent(test));
console.log(dom.children(test5));
console.log(dom.siblings(test6));
console.log(dom.next(test6));
console.log(dom.previous(test6));

const t = dom.find("#test5")[0];
dom.each(dom.children(t), (n) => dom.style(n, "color", "green"));

console.log(dom.index(test6));

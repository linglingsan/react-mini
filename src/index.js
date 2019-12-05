import React, { Component } from "./zreact";
import ReactDOM from "./zreact/zreact-dom";

import * as serviceWorker from "./serviceWorker";

function Func(props) {
  const { name } = props;
  return <div>{name}</div>;
}

class Clzz extends Component {
  render() {
    const { name } = this.props;
    return <div>{name}</div>;
  }
}

const data = [{id: 1, name: "zhangsan", age: 19}, {id: 2, name: "lisi", age: 22}]

const jsx = (
  <div>
    <Func name="函数组件" />
    <Clzz name="类组件" />
    <ul style={{color: "purple"}}>
      {data.map(d => <li key={d.id} className={`item-${d.id}`}>姓名: {d.name} --- 年龄: {d.age}</li>)}
    </ul>
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

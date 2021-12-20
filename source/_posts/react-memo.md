---
title: 谈谈 react 中的 memo
date: 2020-04-22
category: react
tag: memo
---

从一个性能优化问题，谈一谈关于 react 中的 memo 以及具体场景的应用。

<!-- more -->

# memo

## 从一个典型场景出发

```js
function Foo (props) {
  console.log("Foo render", props.name)
  return <div>Foo {props.name}</div>
}

function App () {
  const [checked, setChecked] = React.useState(false)
  
  return (
    <div>
      <label>
        <input
          onChange={event => setChecked(event.target.checked)}
          type="checkbox"
          checked={checked}
          />
        点击切换
      </label>
      <Foo />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
```

> 上面代码的结果是，每次点击切换都会触发 Foo render 的 log。

在状态发生切换时，由于 react 的更新机制，导致所有的子组件都会触发 render，当子组件简单时是无关紧要的，但是，如果子组件内部涉及到了比较复杂的计算，或者子组件层级加深内容较多，就会导致性能问题。

## PureComponent or React.memo

react 中提供了解决方案，用来处理这种“不需要”进行的 render，其中，类组件可以使用 `PureComponent`，函数式组件可以使用 `React.memo`。从原理上看，这两种方式基本相同，都是通过进行两次 props 的浅比较来判断是否触发 render。

```js
function FooComp (props) {
  return <div>Foo</div>
}

const Foo = React.memo(FooComp)

function App () {
  const [checked, setChecked] = React.useState(false)
  
  return (
    <div>
      <label>
        <input
          onChange={event => setChecked(event.target.checked)}
          type="checkbox"
          checked={checked}
          />
        点击切换
      </label>
      <Foo />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
```

## 函数类型 props

现在我们换一个场景，假设现在有一个需求，需要在页面渲染一个列表，并且在点击节点的时候触发点击事件，我们最直接想到的是下面这种写法：

```js
function FooComp (props) {
  console.log("Foo render", props.name)
  return <div onClick={props.onClick}>Foo {props.name}</div>
}

const Foo = React.memo(FooComp)

function App () {
  const [checked, setChecked] = React.useState(false)
  const list = ['a', 'b', 'c', 'd']
  
  function handleClick () {
    console.log('clicked')
  }
  
  return (
    <div>
      <label>
        <input
          onChange={event => setChecked(event.target.checked)}
          type="checkbox"
          checked={checked}
          />
        点击切换
      </label>
      {list.map(item => (
        <Foo key={item} name={item} onClick={handleClick} />
      ))}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
```

> 上面代码的结果是，每次点击切换都会触发 Foo render 的 log。

由于 hooks 的机制，每次修改 state 都会触发一个组件的 render，此时对于 Foo 组件来说，每次 render 的 onClick 方法都是 “新的”，为了解决这个问题，可以使用 useCallback 包装 handleClick 方法。

```js
function FooComp (props) {
  console.log("Foo render", props.name)
  return <div onClick={props.onClick}>Foo {props.name}</div>
}

const Foo = React.memo(FooComp)

function App () {
  const [checked, setChecked] = React.useState(false)
  const list = ['a', 'b', 'c', 'd']
  
  // function handleClick () {
  //   console.log('clicked')
  // }
  
  const handleClick = React.useCallback(() => {
    console.log('clicked')
  }, [])
  
  return (
    <div>
      <label>
        <input
          onChange={event => setChecked(event.target.checked)}
          type="checkbox"
          checked={checked}
          />
        点击切换
      </label>
      {list.map(item => (
        <Foo key={item} name={item} onClick={handleClick} />
      ))}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
```

此时切换 state 不会触发 Foo 组件的 render。

如果需要在循环中使用索引，可以再增加一层 cache ：

<iframe height="300" style="width: 100%;" scrolling="no" title="func props" src="https://codepen.io/xiguaxigua/embed/QWjdOgo?height=300&theme-id=26449&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">
  See the Pen <a href='https://codepen.io/xiguaxigua/pen/QWjdOgo'>func props</a> by xiguaxigua
  (<a href='https://codepen.io/xiguaxigua'>@xiguaxigua</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 类组件中如何处理

解决的方式大致相同，通过 cache 的方式，将函数缓存，从而避免“不需要”的 render。

```js
class Foo extends React.PureComponent {
  render () {
    console.log("Foo render", this.props.name)
    return <div onClick={this.props.onClick}>Foo {this.props.name}</div>
  }
}

class App extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { checked: false }
    this.list = ['a', 'b', 'c', 'd']
    this.cache = {}
  }
  
  render () {
    return (
      <div>
        <label>
          <input
            onChange={event => this.setState({ checked: event.target.checked })}
            type="checkbox"
            checked={this.state.checked}
            />
          点击切换
        </label>
        {this.list.map(item => (
          <Foo
            key={item}
            name={item}
            onClick={this.cache[0] || (this.cache[0] = () => console.log('clicked'))}
           />
        ))}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
```

<iframe height="300" style="width: 100%;" scrolling="no" title="class func props" src="https://codepen.io/xiguaxigua/embed/gOamaYR?height=300&theme-id=26449&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">
  See the Pen <a href='https://codepen.io/xiguaxigua/pen/gOamaYR'>class func props</a> by xiguaxigua
  (<a href='https://codepen.io/xiguaxigua'>@xiguaxigua</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

# 思考

## vue3 中的解决方案

![vue3 template](https://cdn.xiguaxigua.com/blog/sc.png)

根据 vue3 template playground 给出的结果，vue3 中会在模板解析时增加 cache，从而避免了渲染时的问题。从人性化的角度来讲，vue3 “默默”地处理掉这些可能引起性能问题的点，对开发者也更加的友好，而 react 则更需要开发者对原理有更深的了解，从而在解决问题的时候才能更加游刃有余。

## 是否需要解决

实际上，在 react 的文档中，涉及 memo 的地方，字里行间都能够体会到 react 是不赞成在不需要性能优化时进行性能优化的，react 官方对 JS 引擎的执行效率，以及 fiber 架构有着足够的信心，对一些“不需要”进行的 render 不是那么看重，反而进行了 cache 实际上会反向对内存产生影响。而 vue 则更偏向于隐式的将问题处理掉，从笔者的角度来看，vue 在这一点上做的更“接地气”一些。

“vue 和 react 的区别是什么”，很多面试官都喜欢问这样的问题，如果从这篇文章上来看，vue 更多的是面向“内存”的框架，而 react，则是面向“CPU”的框架。

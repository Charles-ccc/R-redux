const appState = {
  title: {
    text: 'React.js 小书',
    color: 'red',
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue'
  }
}

const renderApp = (appState) => {
  renderTitle(appState.title)
  renderContent(appState.content)
}

const renderTitle = (title) => {
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = title.text
  titleDOM.style.color = title.color
}

const renderContent = (content) => {
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = content.text
  contentDOM.style.color = content.color
}

// 观察者模式
// state 表示当前应用状态
// stateChanger 描述应用状态会根据action发生什么变化
const createStore = (state, stateChanger) => {
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
        stateChanger(state, action)
        listeners.forEach((listener) => listener())
    }
    // getState 用于获取 state 数据，把 state 参数返回
    // dispatch 用于修改数据，把 state 和 action 一并传给 stateChanger
    return { getState, dispatch, subscribe}
}

const stateChanger = (state, action) => {
    switch (action.type) {
      case 'UPDATE_TITLE_TEXT':
        state.title.text = action.text
        break
      case 'UPDATE_TITLE_COLOR':
      state.title.color = action.color
        break
      default: 
        break
    }
}
const TITLE_TEXT = { type: 'UPDATE_TITLE_TEXT', text: 'Charles 学 React' }
const TITLE_COLOR = { type: 'UPDATE_TITLE_COLOR', color: 'green' }

const store = createStore(appState, stateChanger)
store.subscribe(() => renderApp(store.getState()))

renderApp(store.getState()) // 首次渲染页面
store.dispatch(TITLE_TEXT)
store.dispatch(TITLE_COLOR)
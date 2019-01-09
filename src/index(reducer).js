const renderApp = (newAppState,  oldAppState = {}) => {
  if (newAppState === oldAppState) return // 数据没有变化就不渲染
  renderTitle(newAppState.title, oldAppState.title)
  renderContent(newAppState.content, oldAppState.content)
}

const renderTitle = (newTitle, oldTitle = {}) => {
  if (newTitle === oldTitle) return // 数据没有变化就不渲染
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

const renderContent = (newContent, oldContent = {}) => {
  if (newContent === oldContent) return // 数据没有变化就不渲染
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}

// 观察者模式
// state 表示当前应用状态
// stateChanger 描述应用状态会根据action发生什么变化
// 函数reducer接收 state和action两个参数
const createStore = (reducer) => {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
      state = reducer(state, action) // 覆盖原对象
      listeners.forEach((listener) => listener())
  }
  // getState 用于获取 state 数据，把 state 参数返回
  // dispatch 用于修改数据，把 state 和 action 一并传给 stateChanger
  dispatch({}) // 初始化state，dispatch内部会调用stateChanger，而state为null，达成初始化
  return { getState, dispatch, subscribe}
}

const themeReducer = (state, action) => {
  if(!state) return {
    themeName: 'Red Theme',
    themeColor: 'red'
  }
  switch (action.type) {
    case 'UPATE_THEME_NAME':
      return { ...state, themeName: action.themeName }
    case 'UPATE_THEME_COLOR':
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}

// stateChanger 现在既充当了获取初始化数据的功能，也充当了生成更新数据的功能
const stateChanger = (state, action) => {
    if(!state) {
      return {
        title: {
          text: 'React.js 小书',
          color: 'red',
        },
        content: {
          text: 'React.js 小书内容',
          color: 'blue'
        }
      }
    }
    switch (action.type) {
      case 'UPDATE_TITLE_TEXT':
      return { // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
        // state.title.text = action.text
        // break
      case 'UPDATE_TITLE_COLOR':
      return { // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
      // state.title.color = action.color
      //   break
      default: 
        // break
        return state // 没有修改，返回原来的对象
    }
}
const TITLE_TEXT = { type: 'UPDATE_TITLE_TEXT', text: 'Charles 学 React' }
const TITLE_COLOR = { type: 'UPDATE_TITLE_COLOR', color: 'green' }

const store = createStore(stateChanger)
// const store = createStore(themeReducer)
let oldState = store.getState() // 缓存旧的 state
// store.subscribe(() => renderApp(store.getState())) // 监听数据变化
const newState = store.getState() // 数据可能变化，获取新的 state
renderApp(newState, oldState) // 把新旧的 state 传进去渲染
oldState = newState // 渲染完以后，新的 newState 变成了旧的 oldState，等待下一次数据变化重新渲染

renderApp(store.getState()) // 首次渲染页面
store.dispatch(TITLE_TEXT)
store.dispatch(TITLE_COLOR)
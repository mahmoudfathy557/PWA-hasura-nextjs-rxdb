import React from 'react'

import Header from './Header'
import TodoListWrapper from './Todo/TodoListWrapper'

const App = ({ auth, db }) => {
  return (
    <div>
      <Header />
      <div className='todo-list'>
        <TodoListWrapper auth={auth} db={db} />
      </div>
    </div>
  )
}

export default App

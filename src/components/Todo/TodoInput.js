import React from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'

class TodoInput extends React.Component {
  constructor() {
    super()
    this.state = {
      textboxValue: '',
    }
    this.handleTextboxValueChange = this.handleTextboxValueChange.bind(this)
    this.handleTextboxKeyPress = this.handleTextboxKeyPress.bind(this)
  }

  handleTextboxValueChange(e) {
    this.setState({
      textboxValue: e.target.value,
    })
  }

  addTodo(text) {
    this.props.db.todos.insert({
      id: uuidv4(),
      text: text,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      userId: this.props.auth.userId,
    })
  }

  handleTextboxKeyPress(e) {
    if (e.key === 'Enter') {
      const newTodo = this.state.textboxValue

      this.addTodo(newTodo)

      this.setState({
        textboxValue: '',
      })
    }
  }

  render() {
    return (
      <div className="formInput">
        <input
          className="input"
          placeholder="What needs to be done?"
          value={this.state.textboxValue}
          onChange={this.handleTextboxValueChange}
          onKeyPress={(e) => {
            this.handleTextboxKeyPress(e)
          }}
        />
        <i className="inputMarker fa fa-angle-right" />
      </div>
    )
  }
}

TodoInput.propTypes = {
  auth: PropTypes.any.isRequired,
}

export default TodoInput

import React, { Component } from 'react';
import './App.css';

const TodoItem = ({ title, description, time, date, onRemove, onPin, pinned }) => (
  <li className={`todo-item ${pinned ? 'pinned' : ''}`}>
    <div className="todo-header">
      <h3>{title}</h3>
      <button onClick={onPin} className={`pin-button ${pinned ? 'pinned' : ''}`}>
        <i className={`fas fa-thumbtack ${pinned ? 'pinned' : ''}`}></i>
      </button>
    </div>
    <p>{description}</p>
    <div className="todo-item-details">
      <p><strong>Time:</strong> {time}</p>
      <p><strong>Date:</strong> {date}</p>
    </div>
    <button onClick={onRemove} className="remove-button">Remove</button>
  </li>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTitle: '',
      newDescription: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handlePin = this.handlePin.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { newTitle, newDescription } = this.state;
    const currentDate = new Date();
    const todo = {
      title: newTitle,
      description: newDescription,
      time: `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
      date: `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`,
      pinned: false // Default is unpinned
    };
    const todos = [...this.state.todos, todo];
    this.setState({ todos, newTitle: '', newDescription: '' });
  }

  handleRemove(index) {
    const todos = [...this.state.todos];
    todos.splice(index, 1);
    this.setState({ todos });
  }

  handlePin(index) {
    const todos = [...this.state.todos];
    todos[index].pinned = !todos[index].pinned;
    this.setState({ todos });
  }

  render() {
    const { newTitle, newDescription, todos } = this.state;
    const todoItems = todos.map((todo, i) => (
      <TodoItem
        key={i}
        title={todo.title}
        description={todo.description}
        time={todo.time}
        date={todo.date}
        pinned={todo.pinned}
        onRemove={() => this.handleRemove(i)}
        onPin={() => this.handlePin(i)}
      />
    ));

    return (
      <div className="container">
        <div className="header">
          <h1>Rencana Harian Saya</h1>
        </div>
        <div className="content">
          <div className="form-container">
            <form onSubmit={this.handleSubmit} className="form">
              <div className="form-item">
                <input
                  className="todo-input"
                  autoComplete="off"
                  type="text"
                  name="newTitle"
                  placeholder="Judul Rencana"
                  value={newTitle}
                  onChange={e => this.setState({ newTitle: e.target.value })}
                />
              </div>
              <div className="form-item">
                <textarea
                  className="todo-input"
                  name="newDescription"
                  placeholder="Deskripsi Rencana"
                  value={newDescription}
                  onChange={e => this.setState({ newDescription: e.target.value })}
                />
              </div>
              <div className="form-item">
                <button type="submit" className="save-button">
                  SAVE
                </button>
              </div>
            </form>
          </div>
          <div className="todo-list-container">
            <div className="todo-content">
              <h2>Rencana Hari Ini</h2>
              <ol className="todo-list">{todoItems}</ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

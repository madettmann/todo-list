import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid'
import uuidv4 from 'uuid/dist/v4'

const LOCAL_STORAGE_KEY = "todoApp.todos"

function App() {
  const [value, setValue] = useState("")
  const getInputValue = e => {
    setValue(e.target.value)
    console.log(e.target.value)
  }
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  },[])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }


  function handleAddTodo(e){
    const name = value
    if (name === '') return
    setTodos(prevTodos =>{
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    setValue("")
  }

  function handleClearComplete(e){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  
  return (
    <Container maxWidth="sm">
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <Grid
          container
          direction="row"
          alignItems="center"
        >
        <TextField label="New item" type="text" value = {value} ref={todoNameRef} variant="outlined" onChange={getInputValue}></TextField>
        <AddIcon onClick={handleAddTodo} color="primary"></AddIcon>
        </Grid>
        <div>{todos.filter(todo => !todo.complete).length} left to do</div>
        <Button fullWidth="false" variant="contained" color="primary" onClick={handleClearComplete}>Clear Checked</Button>
      
    </Container>
    )
}

export default App;

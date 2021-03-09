import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'

export default function Todo({ todo, toggleTodo }) {
    function handleTodoClick (){
        toggleTodo(todo.id)
    }
    return (
        <div>
            <label>
                <Checkbox color="secondary" checked={todo.complete} onChange={handleTodoClick}></Checkbox>
                {todo.name}
            </label>
            
        </div>
    )
}

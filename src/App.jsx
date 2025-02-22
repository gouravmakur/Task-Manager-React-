import { useState, useEffect} from 'react'
import { ToDoProvider , ToDoContext , useToDo } from './Contexts'
import './App.css'
import TodoForm from './Components/TodoForm'
import TodoItem from './Components/TodoItem'

function App() {
  
  const [todos , setTodos] = useState([])

  const addTodo = (todo) => {
      setTodos((prev) => [{id: Date.now() , ...todo} , ...prev]);
  }

  const updateTodo = (id, todo) => {

    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ?  todo:prevTodo)))
  }

  const removeTodo = (id) => {

    setTodos((prev) => prev.filter((prevTodo) => (prevTodo.id !== id)))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => 
        prev.map((prevTodo) => 
            prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
        )
    );
};


  useEffect(()=>{

    const todos = JSON.parse(localStorage.getItem("todos"));

    if(todos && todos.length > 0){
      setTodos(todos);
    }
  } , []);

  useEffect(()=>{

    localStorage.setItem("todos" , JSON.stringify(todos))
  } , [todos])

  return (
    <ToDoProvider value = {{todos , addTodo , updateTodo , removeTodo, toggleComplete}}>
      <div className="bg-[#36393e] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-3xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div
                            key={todo.id}
                            className='w-full'
                          > 
                            <TodoItem todo = {todo}/>
                          </div>

                        ))}
                    </div>
                </div>
            </div>
    </ToDoProvider>
  )
}

export default App

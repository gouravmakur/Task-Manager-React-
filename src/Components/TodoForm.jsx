import React from 'react'
import { useState } from 'react'
import { useToDo } from '../Contexts';

function TodoForm() {
    
    const [todo, setTodo] = useState("");
    const { addTodo } = useToDo()

    const add = (e) => {

        e.preventDefault();

        if(!todo) return

        addTodo({todo, completed : false})
        setTodo("")
    }

    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Add Todo..."
                className="w-full border border-black/10 rounded-xl px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-full  mx-2 px-5 py-2 bg-orange-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;
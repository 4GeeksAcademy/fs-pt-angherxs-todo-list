import React, { useEffect , useState } from "react";

const USER = "angherxs"; 

export function TodoList() {
    const [task, setTask] = useState(""); 
    const [tasks, setTasks] = useState([]); 

    function loadTasks() {
        fetch(`https://playground.4geeks.com/todo/users/${USER}`)
            .then(resp => resp.json())
            .then(data => {
                setTasks(data.todos || []);
            })
            .catch(error => console.error("Error al cargar tareas:", error));
    }

    useEffect(() => {
        fetch(`https://playground.4geeks.com/todo/users/${USER}`, {
            method: "POST"
        })
        .then(() => loadTasks()) 
        .catch(error => console.error("Error al crear usuario:", error));
    }, []); 

    function handleKeyDown(e) {
        if (e.key === "Enter" && task.trim() !== "") {
            fetch(`https://playground.4geeks.com/todo/todos/${USER}`, {
                method: "POST",
                body: JSON.stringify({
                    label: task,
                    is_done: false
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(() => {
                setTask("");
                loadTasks();
            })
            .catch(error => console.error("Error al añadir tarea:", error));
        }
    }

    function deleteTask(id) { 
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE"
        })
        .then(() => loadTasks())
        .catch(error => console.error("Error al eliminar tarea:", error));
    }

    function clearAll() {
        fetch(`https://playground.4geeks.com/todo/users/${USER}`, {
            method: "DELETE"
        })
        .then(() => {
            return fetch(`https://playground.4geeks.com/todo/users/${USER}`, {
                method: "POST"
            });
        })
        .then(() => setTasks([]))
        .catch(error => console.error("Error al limpiar todo:", error));
    }

    return (
        <div className="todo-container">
            <h1>Lista de Tareas</h1>

            <input
                type="text"
                placeholder="Escribe una tarea y presiona Enter"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <ul>
                {tasks.length === 0 ? (
                    <li className="empty">No hay tareas, añadir tareas</li>
                ) : (
                    tasks.map((t) => (
                        <li key={t.id}> 
                            {t.label}
                            <span className="delete-btn" onClick={() => deleteTask(t.id)}>
                                ❌
                            </span>
                        </li>
                    ))
                )}
            </ul>
            
            <button onClick={clearAll} className="clear-btn">
                Limpiar todas las tareas
            </button>
        </div>
    );
}
import React, { useState } from "react";

export default function TodoList() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    function handleKeyDown(e) {
        if (e.key === "Enter" && task.trim() !== "") {
            setTasks([...tasks, task]);
            setTask("");
        }
    }

    function deleteTask(index) {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
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
                    tasks.map((t, i) => (
                        <li key={i}>
                            {t}
                            <span className="delete-btn" onClick={() => deleteTask(i)}>
                                ❌
                            </span>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
import type {FilterValues, Task} from './App'
import {Button} from './Button'
import {useState} from "react";


type Props = {
    taskCount: number
    title: string
    tasks: Task[]
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: Task["title"]) => void
}

export const TodolistItem = ({
                                 title,
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 createTask,
                                 taskCount,
                             }: Props) => {
    const [taskInput, setTaskInput] = useState("")
    // alert(taskInput)
    const createTaskHandler = () => {
        createTask(taskInput)
        setTaskInput("")
    }
    const validationTasks = taskInput.length === 0

    return (
        <div>
            <h3>{title}</h3>
            <span>{taskCount}</span>
            <div>
                <input
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.currentTarget.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !validationTasks) {
                            createTaskHandler()
                        }
                    }}
                />
                <Button
                    title={'+'}
                    disabled={validationTasks}
                    onClick={createTaskHandler}/>
                {validationTasks && <div>Enter never main</div>}
                {taskInput.length < 15 && <div>Vax message is 15</div>}
                {Boolean(taskInput.length >= 15) && <div style={{color: "red"}}>Message too long</div>}
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={() => deleteTask(task.id)}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'} onClick={() => changeFilter('all')}/>
                <Button title={'Active'} onClick={() => changeFilter('active')}/>
                <Button title={'Completed'} onClick={() => changeFilter('completed')}/>
            </div>
        </div>
    )
}

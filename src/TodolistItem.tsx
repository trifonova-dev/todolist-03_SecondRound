import type {FilterValues, Task} from './App'
import {Button} from './Button'
import {useState} from "react";

type Props = {
    count: number
    title: string
    tasks: Task[]
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    createTasks: (title: Task["title"]) => void
}

export const TodolistItem = ({
                                 count,
                                 title,
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 createTasks,
                             }: Props) => {
    const [taskInput, setTasksInput] = useState("")
    const createTasksHandler = () => {
        createTasks(taskInput)
        setTasksInput("")
    }
    const isEmpty = taskInput.length === 0
    const isTooLong = taskInput.length >= 15
    const isDisabled = isEmpty || isTooLong
    return (
        <div>
            <h3>{title}</h3>
            <span>{count}</span>
            <div>
                <input
                    value={taskInput}
                    onChange={(e) => setTasksInput(e.currentTarget.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            createTasksHandler()
                        }
                    }}
                />
                <Button
                    title={'+'}
                    disabled={isDisabled}
                    onClick={() => {
                        createTasksHandler()
                    }}/>
                {isEmpty && <div>Пусто тута</div>}
                {isTooLong && <div style={{color:"red"}} >Слишком много символов, можно не более 15</div>}
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

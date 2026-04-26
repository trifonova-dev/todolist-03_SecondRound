import type {FilterValues, Task} from './App'
import {Button} from './Button'
import {useState} from "react";

type Props = {
    count: number
    title: string
    tasks: Task[]
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: Task["title"]) => void
}

export const TodolistItem = ({
                                 title,
                                 count,
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 createTask
                             }: Props) => {
    const [taskInput, setTaskInput] = useState("")
    // alert(taskInput)
    const createTaskHandler = () => {
        createTask(taskInput)
        setTaskInput("")
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
                    onChange={(e) => setTaskInput(e.currentTarget.value)}
                />
                <Button
                    title={'+'}
                    disabled={isDisabled}
                    onClick={createTaskHandler}/>
                {isEmpty && <div>Введите ну хоть что-нибудь...</div>}
                {isTooLong && <div style={{color: "red"}}>Братан, пароль малость длинноват</div>}
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

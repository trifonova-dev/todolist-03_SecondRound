import type {FilterValues, Task} from './App'
import {Button} from './Button'
import {useState} from "react";


type Props = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: Task["title"]) => void
    count: number
}

export const TodolistItem = ({
                                 title,
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 createTask,
                                 count,
                             }: Props) => {
    const [inputTasks, setInputTasks] = useState("")
    const isEmpty = inputTasks.length === 0
    const isTooLong = inputTasks.length >= 15
    const isDisabled = isEmpty || isTooLong
    return (
        <div>
            <h3>{title}</h3>
            <span>{count}</span>
            <div>
                <input
                    value={inputTasks}
                    onChange={(e) => {
                        setInputTasks(e.currentTarget.value)

                    }}
                />
                <Button
                    title={'+'}
                    disabled={isDisabled}
                    onClick={() => {
                        createTask(inputTasks)
                        setInputTasks("")
                    }}
                />
                {isEmpty && <div>Enter something</div>}
                {isTooLong && <div style={{color: "red"}}>Max length is 15</div>}
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

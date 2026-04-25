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
                                 count,
                                 title,
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 createTask
                             }: Props) => {
    const [inputTask, setInputTask] = useState("")
    // alert(inputTask)
    const isEmpty = inputTask.length === 0
    const isTooLong = inputTask.length >= 15
    const isDisabled = isEmpty || isTooLong
    return (
        <div>
            <h3>{title}</h3>
            {count}
            <div>
                <input
                    value={inputTask}
                    onChange={(e) => setInputTask(e.currentTarget.value)}
                />
                <Button
                    title={'+'}
                    disabled={isDisabled}
                    onClick={() => {
                        createTask(inputTask)
                        setInputTask("")
                    }}
                />
                {isEmpty && <div>Enter some worlds</div>}
                {isTooLong && <div style={{color: "red"}}>Password can be 15</div>}
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

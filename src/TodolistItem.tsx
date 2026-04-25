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

    const [inputTask, setInputTask] = useState("")
    // alert(inputTask)
    const createTaskHandler = () => {
        createTask(inputTask)
        setInputTask("")
    }

    const isEmpty = inputTask.length === 0
    const isTooLong = inputTask.length > 15
    const isDisabled = isEmpty || isTooLong

    return (
        <div>
            <h3>{title}</h3>
            {taskCount}
            <div>
                <input
                    value={inputTask}
                    onChange={(e) => setInputTask(e.currentTarget.value)}
                />
                <Button
                    title={'+'}
                    disabled={isDisabled}
                    onClick={createTaskHandler}/>
                {isEmpty && <div>Enter some worlds</div>}
                {isTooLong && <div>Max length string is 15</div>}
                {!isEmpty && isTooLong && <div style={{color: "red"}}>Too long</div>}
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

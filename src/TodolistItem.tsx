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
                                 createTask,
                             }: Props) => {
    const [inputTask, setInputTask] = useState("")
    // alert(inputTask)
    const createTaskHandler = () => {
        createTask(inputTask)
        setInputTask("")
    }

    const isEmpty = inputTask.length === 0
    const isTooLong = inputTask.length >= 15
    const isDisabled = isEmpty || isTooLong

    return (
        <div>
            <h3>{title}</h3>
            <span>{count}</span>
            <div>
                <input
                    value={inputTask}
                    onChange={(e) => setInputTask(e.currentTarget.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            createTaskHandler()
                        }
                    }}/>
                <Button
                    title={'+'}
                    disabled={isDisabled}
                    onClick={createTaskHandler}/>
                {isEmpty &&
                    <div>Нету тут ничего,братан,надо написать</div>
                }
                {isTooLong &&
                    <div style={{color: "red"}}>Ну это ты лишка написал,братан, надо сократить</div>
                }
            </div>
            {
                tasks.length === 0 ? (
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
                )
            }
            <div>
                <Button title={'All'} onClick={() => changeFilter('all')}/>
                <Button title={'Active'} onClick={() => changeFilter('active')}/>
                <Button title={'Completed'} onClick={() => changeFilter('completed')}/>
            </div>
        </div>
    )
}

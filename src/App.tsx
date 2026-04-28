import './App.css'
import {useRef, useState} from 'react'
import {TodolistItem} from './TodolistItem'
import {getFilteredTasks} from "./getFilteredTasks.ts";
import {v1} from "uuid";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
    const [filter, setFilter] = useState<FilterValues>('all')
    const taskCounter = useRef(4)

    const [tasks, setTasks] = useState<Task[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])

    const deleteTask = (taskId: string) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTasks)
    }

    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }

    const filteredTasks = getFilteredTasks(tasks, filter)

    const createTask = (title: Task["title"]) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        const nextTasksState: Task[] = [newTask, ...tasks]
        setTasks(nextTasksState)
        taskCounter.current = taskCounter.current + 1
    }

    return (
        <div className="app">
            <TodolistItem title="What to learn"
                          tasks={filteredTasks}
                          deleteTask={deleteTask}
                          changeFilter={changeFilter}
                          createTask={createTask}
                          count={taskCounter.current}
            />
        </div>
    )
}

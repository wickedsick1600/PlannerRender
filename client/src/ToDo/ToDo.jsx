import React, { useEffect, useState } from 'react';
import styles from './ToDo.module.css';
import axios from 'axios';
import Header from '../Header/Header.jsx';

function Planner(){
    const [task, setTask] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [finishedTasks, setFinishedTasks] = useState([]);

    const URL = "https://plannerrender.onrender.com";

     // Gets the list of tasks in the database
    useEffect(() => {
        const fetchAllTasks = async () => {
            try{
                const res = await axios.get(`${URL}/tasks`);
                setTask(res.data);
            }catch(error){
                console.log(error);
            }
        }   
        fetchAllTasks();
    }, [task]);

     // Gets the list of finished tasks in the database
    useEffect(() => {
        const fetchAllFinishedTasks = async () => {
            try{
                const res = await axios.get(`${URL}/finished_tasks`);
                setFinishedTasks(res.data);
            }
            catch(error){
                console.log(error);
            }
        }
        fetchAllFinishedTasks();
    }, [finishedTasks])

    // Adds a new task to the table
    async function addTask(e){
        e.preventDefault();
        try{
            const value = {"task_name":newTask}
            await axios.post(`${URL}/insert`, value);
            setNewTask("");
        }
        catch(error){
            console.log(error);
        }
    }
    // Transfer a task to the finished tasks table
    async function doneTask(index, idx){

        const currentTime = new Date;
        let currentHours = currentTime.getHours();
        let currentMins = currentTime.getMinutes();
        let currentSeconds = currentTime.getSeconds();
        let meridiem = currentHours >= 12 ? "PM" : "AM";
        currentHours = currentHours % 12 || 12;
        
        let final = (`${currentHours.toString().padStart(2, "0")}:${currentMins.toString().padStart(2, "0")}:${currentSeconds.toString().padStart(2, "0")} ${meridiem}`);
        
        try{
            const taskTransfer = task[idx].task_name;
            const value = {"finished_tasks": taskTransfer, "time_finished": final};
            await axios.post(`${URL}/insert_finished_tasks`, value);
        }
        catch(error){
            console.log(error);
        }

        deleteTask(index);
    }
     // Delete the new task in the table
    async function deleteTask(index) {
        try{
            await axios.delete(`${URL}/delete/${index}`);
        }
        catch(error){
            console.log(error);
        }
    }
    // Undo a task in the finished tasks table
    async function undoTask(index){
        // Returns the finished task to the Todo table
        try{
            const value = {"task_name": finishedTasks[index].finished_tasks};
            axios.post(`${URL}/insert`, value);
        }
        catch(error){
            console.log(error);
        }
        // Removes the task in the Finished tasks table
        try{
            await axios.delete(`${URL}/delete_finished_tasks/${finishedTasks[index].id}`);
        }
        catch(error){
            console.log(error)
        }
    }


     return (<>
    <Header />
    <div className={styles.plannerCont}>
        <h1 className={styles.plannerDivision}>TO-DO-LIST</h1>
        <form onSubmit={addTask}>
            <input type="text" 
                style={{fontSize: "20px", fontWeight: "bold"}} 
                value={newTask} 
                placeholder="Enter a task" 
                onChange={(e) => setNewTask(e.target.value)} 
                required />
            <button className={styles.addTaskBtn}>ADD TASK</button>
        </form>
        <ol>
            {task.map((task, index) => 
                <li key={task.id} >
                    <span className={styles.taskName}>{task.task_name}</span>
                    <button 
                        className={styles.doneBtn} 
                        onClick={() => doneTask(task.id, index)}> 
                        MARK AS DONE
                    </button>
                    <button 
                        className={styles.delBtn} 
                        onClick={() => deleteTask(task.id)}>
                        DELETE TASK
                    </button>
                </li>)}
        </ol>    
            <h1 className={styles.plannerDivision}>FINISHED TASKS</h1>
            <ol>
                {finishedTasks.map((finishedTasks, index) => 
                    <li key={finishedTasks.id}>
                        <span className={styles.taskName}>{finishedTasks.finished_tasks}</span>
                        <button 
                            className={styles.undoBtn} 
                            onClick={() => undoTask(index)}> 
                            UNDO 
                        </button>
                        <span className={styles.doneAt}>{finishedTasks.time_finished}</span>
                    </li>)}
            </ol>
    </div>
     </>);
}
export default Planner

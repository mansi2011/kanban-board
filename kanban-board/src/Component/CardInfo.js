import React, { useEffect, useState } from 'react';
import Modal from './Modal'
import './CardInfo.css'
import { v1 as uuidv1 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCheckSquare, faIndent, faTag, faTextWidth, faTrash } from '@fortawesome/fontawesome-free-solid';
import Editable from './Editable';
import Chip from './Chip';
function CardInfo({ onClose, card,updateCard ,boardId}) {
    const colors = ["#a8193d", "#4fcc25", "#1ebffa", "#8da377", "#9975bd", "#cf61a1", "#240959"]
    const [values,setValues] = useState({...card})

    const [activeColor,setActiveColor]=useState("")

    const calculatePercent = () =>{
        if (values.tasks?.length === 0 )return "0"
        const completed = values.tasks?.filter((item)=>item.completed)?.length
        return (completed/values.tasks?.length )*100 + ""
    }

    

    useEffect(()=>{
        updateCard(card?.id,boardId,values)
    },[values])

    const addLabel=(value,color)=>{
        const index = values.labels?.findIndex((item)=> item.text === value);
        if(index>-1) return;
        const label = {
            text: value,
            color,
        }
        setValues({...values,labels:[...values.labels,label]})
        setActiveColor("")
    }

    const removeLabel = (text)=>{
        const index =  values.labels?.findIndex((item)=> item.text === text);
        if(index<0) return;
        const tempLabels = values.labels?.filter((item)=> item.text===text)
        setValues({...values,labels:tempLabels})
    

    }

    const addTask = (value)=>{
        const task = {
            id:uuidv1(),
            text:value,
            completed:false
        }

        setValues({...values,tasks:[...values.tasks,task]})
    }
    
    const removeTask = (id)=>{
        const index = values.tasks?.findIndex(item=>item.id===id)
        if(index<0)return

        const tempTasks = values.tasks?.splice(index,1);
        setValues({...values,tasks:tempTasks})
    }

    const updateTask = (id,completed) =>{
        const index= values.tasks?.findIndex(item=>item.id===id)
        if(index<0)return

        const tempTasks = [...values.tasks]
        tempTasks[index].completed = completed
        setValues({...values,tasks:tempTasks})
    }

    return (
        <div>
            <Modal onClose={onClose}>
                <div className='cardInfo'>
                    <div className='cardInfo_box'>
                        <div className='cardInfo_box_title'>
                            <FontAwesomeIcon icon={faTextWidth} /><span>Title no 1</span>
                        </div>
                        <div className='cardInfo_box_body'>
                            <Editable
                                text={values.title}
                                defaultValue={values.title}
                                placeholder="Enter Title"
                                buttonText="Set Title"
                                onSubmit={(value) => setValues({...values,title:value})}
                            />
                        </div>
                        <div className='cardInfo_box_title'>
                            <FontAwesomeIcon icon={faIndent} /><span>Description</span>
                        </div>
                        <div className='cardInfo_box_body'>
                            <Editable
                                text={values.desc}
                                defaultValue={values.desc}
                                placeholder="Enter Description"
                                buttonText="Set Description"
                                onSubmit={(value) => setValues({...values,desc:value})}
                            />
                        </div>
                        <div className='cardInfo_box_title'>
                            <FontAwesomeIcon icon={faCalendar} /><span>Date</span>
                        </div>
                        <div className='cardInfo_box_body'>
                            <input
                                type="date"
                                onChange={(e)=>setValues({...values,date: e.target.value})}
                                defaultValue = {values.date? new Date(values.date).toISOString().substring(0,10):""}
                            />
                        </div>
                        <div className='cardInfo_box_title'>
                            <FontAwesomeIcon icon={faTag} /><span>Labels</span>
                        </div>
                        <div className='cardInfo_box_labels'>
                            {values.labels?.map((item, index) => {
                                return <Chip close onClose={() => removeLabel(item.text)} key={index} color={item.color} text={item.text} />
                            })}
                        </div>
                        <div className='cardInfo_box_colors'>
                            {
                                colors.map((item, index) => 
                                <li key={index} style={{ backgroundColor: item }} className={item===activeColor ? "active" :""}
                                onClick={()=>setActiveColor(item)}/>)
                            }
                        </div>
                        <div className='cardInfo_box_body'>
                            <Editable
                                text="Add Label"
                                placeholder="Enter Label"
                                buttonText="Add"
                                onSubmit={(value)=> addLabel(value,activeColor)}
                            />
                        </div>
                        <div className='cardInfo_box_title'>
                            <FontAwesomeIcon icon={faCheckSquare} /><span>Tasks</span>
                        </div>
                        <div className='cardInfo_box_progress_bar'>
                            <div className='cardInfo_box_progress' style={{ width: calculatePercent() + "%" , backgroundColor: calculatePercent()==="100"? "limegreen":""}} />
                        </div>
                        <div className='cardInfo_box_list'>
                            {
                                values.tasks?.map((item) =>
                                {return <div key={item.id} className='cardInfo_task'>
                                    <input type="checkbox"
                                     defaultChecked={item.completed}
                                     onChange={(e)=>updateTask(item.id,e.target.checked)}
                                     />
                                    <p>{item.text}</p>
                                    <FontAwesomeIcon icon={faTrash} onClick={()=>removeTask(item.id)} />
                                </div>
                                })}

                        </div>
                        <div className='cardInfo_box_body'>
                            <Editable
                                text="Add new task"
                                placeholder="Enter Task"
                                buttonText="Add Task"
                                onSubmit={(value)=>addTask(value)}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default CardInfo;
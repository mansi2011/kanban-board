import React, { useState } from 'react';
import './Editable.css'

function Editable({buttonText,placeholder,text,onSubmit,displayClass,editClass,defaultValue}) {
    const [showEdit,setShowEdit]= useState(false);
    const [inputValue,setInputValue]=useState(defaultValue || "")

    return (
        <div className='editable'>
            {showEdit ? 
            (<form className={`editable_edit ${editClass ||  ""}`} onSubmit=
            {
                (event)=>{event.preventDefault()
                if(onSubmit){
                    onSubmit(inputValue);
                    setShowEdit(false)
                    setInputValue("")
                }
            }}>
                <input 
                type="text" 
                autoFocus 
                value={inputValue} 
                onChange={(e)=> setInputValue(e.target.value)}
                placeholder={placeholder || "Enter Item"}/>
                <div className='editable_edit_footer'>
                    <button type='submit'>{buttonText || "Add"}</button>
                    <button type='submit' onClick={()=> setShowEdit(false)}>Cancel</button>
               
                </div>
            </form>)
            :
            (<p className={`editable_display ${displayClass ||  ""}`}  onClick={()=>setShowEdit(true)}>{text || "+ Add Card"}</p>)
        }
            
        </div>
    );
}

export default Editable;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import './Chip.css';
function Chips({text,color,close,onClose}) {
    return (
        <div className='chip' style={{backgroundColor:color,color:"white"}}>
            {text}
            {
                close && (<FontAwesomeIcon onClick={()=>onClose  ? onClose() : ""} className='chip_close' icon={faTimes} />)
            }
        </div>
    );
}

export default Chips;
import React, { useState } from 'react';

import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faClock, faEllipsisH } from '@fortawesome/fontawesome-free-solid';
import Chip from './Chip';
import Dropdown from './Dropdown';
import CardInfo from './CardInfo';


function Card({card,removeCard,boardId,handleDragEnter,handleDragEnd,updateCard}) {
    const [showDropdown,setShowDropdown] = useState(false)
    const [showModal,setShowModal] = useState(false)

    
    return (
        <>
        {showModal && <CardInfo onClose={()=> setShowModal(false)} boardId={boardId} card={card} updateCard={updateCard}/>}
        <div 
        className='card' 
        draggable
        onClick={()=>setShowModal(true)}
        onDragEnter={()=> handleDragEnter(card?.id,boardId)}
        onDragEnd={()=> handleDragEnd(card?.id,boardId)}
        >
            
            <div className='card_details'>
               <div className='card_details_labels'>
                   {card?.labels?.map((item,index)=>{return <Chip key={index} text={item.text} color={item.color}/>})}
               </div>
               <div className='card_top_option' onClick={()=> setShowDropdown(true)}>
               <FontAwesomeIcon icon={faEllipsisH} /> 
               {
                    showDropdown && (<Dropdown  onClose={()=> setShowDropdown(false)}>
                    <div className='card_dropdown'>
                        <p className='card_dropdown_action' onClick={()=>removeCard(card?.id,boardId)}>Delete Card</p>
                    </div>
                    </Dropdown>)
                }
                </div>
            </div>
            <div className='card_title'>
                <p className='card_subtitle'>{card?.title}</p>
            </div>
            <div className='card-footer'>
                {
                    card?.date && (
                    <p className='footer-subdesc'>
                        <FontAwesomeIcon icon={faClock}/>
                        {" "}
                        <span className='footer_svg'>{card?.date}</span>
                    </p>
                    )
                }
           
                {
                  card?.tasks?.length>0 &&(
                    <p className='footer-subdesc'> 
                    <FontAwesomeIcon icon={faCheckSquare}/> {" "} 
                    <span className='footer_svg'>
                        {card?.tasks?.filter((item)=> item.completed).length}/{card?.tasks?.length}
                    </span>
                </p>
                  )
                  
                }
                
            </div>
        </div>
        </> 
    );
}


export default Card;
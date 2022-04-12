import React, { useState } from 'react';
import './Board.css'
import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/fontawesome-free-solid'
import Editable from './Editable';
import Dropdown from './Dropdown';

function Board({board,removeBoard,addCard,removeCard,handleDragEnter,handleDragEnd,updateCard}) {
    const [showDropdown,setShowDropdown] = useState(false)

    return (
        <div className='board'>
            <div className='board_top'>
                <p className='board_top_title'>
                    {board?.title}  <span>{`  ${board?.cards?.length}`}</span>
                </p>
                <div className='board_top_option' onClick={()=> setShowDropdown(true)}>
                <FontAwesomeIcon icon={faEllipsisH} />
                {
                    showDropdown && (<Dropdown  onClose={()=> setShowDropdown(false)}>
                    <div className='board_dropdown'>
                        <p className='board_dropdown_action' onClick={()=> removeBoard(board?.id)}>Delete Board</p>
                    </div>
                    </Dropdown>)
                }
                
                </div>
                    
            </div>
            <div className='board_cards custom-scroll'>
                {   
                    board?.cards?.map((item)=>{
                        return <Card key={item.id} card={item} removeCard={removeCard} boardId={board?.id} handleDragEnd={handleDragEnd}
                        handleDragEnter={handleDragEnter} updateCard={updateCard} />
                    })
                }
                <Editable 
                   displayClass="board_cards_add"
                   text="Add Cards"
                   placeholder="Enter Card Title"
                   onSubmit={(value)=>addCard(value,board?.id)}
                   
                   />
            </div>
        </div>
    );
}

export default Board;
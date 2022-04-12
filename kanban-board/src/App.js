import './App.css';
import Board from './Component/Board';
import Editable from './Component/Editable';
import { v1 as uuidv1 } from 'uuid';
import { useEffect, useState } from 'react';

function App() {
  const [target, setTarget] = useState({ cid: "", bid: "" })
  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem("kanban"))||[])

  const addCard = (title, bid) => {
    const card = {
      id: uuidv1(),
      title,
      labels: [],
      tasks: [],
      date:""
    };

    const index = boards.findIndex((item) => item.id === bid)
    if (index < 0) return;

    const tempboards = [...boards];
    tempboards[index].cards.push(card)
    setBoards(tempboards);
  }

  const removeCard = (cid, bid) => {
    const bindex = boards.findIndex((item) => item.id === bid)
    if (bindex < 0) return;

    const cindex = boards[bindex].cards.findIndex((item) => item.id === cid)
    if (cindex < 0) return;

    const tempboards = [...boards];
    tempboards[bindex].cards.splice(cindex, 1)
    setBoards(tempboards);
  }

  const addBoard = (title) => {
    setBoards(
      [...boards,
      {
        id: uuidv1(),
        title,
        cards: []
      },
      ]
    )
  }

  const removeBoard = (bid) => {
    const tempboards = boards.filter((item) => item.id !== bid);
    setBoards(tempboards)
  }

  const handleDragEnter = (cid, bid) => { setTarget({ cid, bid }) }
  const handleDragEnd = (cid, bid) => {
    let s_bindex, s_cindex, t_bindex, t_cindex

    s_bindex = boards.findIndex(item => item.id === bid)
    if (s_bindex < 0) return;

    s_cindex = boards[s_bindex].cards?.findIndex(item => item.id === cid)
    if (s_cindex < 0) return;

    t_bindex = boards.findIndex(item => item.id === target.bid)
    if (t_bindex < 0) return;

    t_cindex = boards[t_bindex].cards?.findIndex(item => item.id === target.cid)
    if (t_cindex < 0) return;

    const tempBoards = [...boards]
    const tempCard = tempBoards[s_bindex].cards[s_cindex]
    tempBoards[s_bindex].cards.splice(s_cindex, 1)
    tempBoards[t_bindex].cards.splice(t_cindex, 0, tempCard)
    setBoards(tempBoards)

  }

  const updateCard = (cid, bid, card) => {
    const bindex = boards.findIndex((item) => item.id === bid)
    if (bindex < 0) return;

    const cindex = boards[bindex].cards.findIndex((item) => item.id === cid)
    if (cindex < 0) return;

    const tempBoards = [...boards]
    tempBoards[bindex].cards[cindex] = card
    setBoards(tempBoards)

  }

  useEffect(()=>{
    localStorage.setItem('kanban',JSON.stringify(boards))
  },[boards])



 

  return (
    <div className="App">
      <div className="app_navbar">
        <h2>Kanban Board</h2>
       

      </div>
      <div className="app_outer">
        <div className="app_boards">
          {boards?.map((item) => <Board key={item.id} board={item} removeBoard={removeBoard}
            addCard={addCard} removeCard={removeCard} handleDragEnd={handleDragEnd} 
            handleDragEnter={handleDragEnter}  updateCard={updateCard}/>)}
          <div className='app_boards_board'>

            <Editable displayClass="app_boards_board_add"
              text="Add Board"
              placeholder="Enter board title"
              onSubmit={(value) => addBoard(value)}
            />

          </div>
        </div>

      </div>
    </div>
  );
}

export default App;

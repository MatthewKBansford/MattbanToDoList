import { useState } from "react";
import checkbox from "./assets/checkbox.png";
import checked from "./assets/checked.png";
import close from "./assets/close.png";



function App() {
  const [value, setNewValue] = useState<string>("");
  const [activeTodos, setActiveTodos] = useState<string[]>([]);
  const [completedToDos, setCompletedTodos] = useState<string[]>([]);



  const AddTodo = () => {
    if(value.trim() !== "") {
      setActiveTodos([...activeTodos, value]);
      setNewValue("");
    }
  }

  const AddToCompleted = (index:number) => {
      const itemToMove = activeTodos[index]

      setCompletedTodos([...completedToDos, itemToMove])
      setActiveTodos(activeTodos.filter((_, i) => i !== index));
  }

  const RestoreCompleted = (index:number) => {
      const itemToMove = completedToDos[index]

      setActiveTodos([...activeTodos, itemToMove]);
      setCompletedTodos(completedToDos.filter((_, i) => i !== index))
  }

  const RemoveToDo = (index:number) => {
    if(completedToDos[index]) {
      setCompletedTodos(completedToDos.filter((_, i) => i !== index))
    } else {
      setActiveTodos(activeTodos.filter((_, i) => i !== index))
    }
  }
  

  return (
    <>
      <div className="bg-white w-[30%] h-[40em] mx-auto my-[7%] rounded-xl px-16 max-[450px]:w-[90%] max-[450px]:px-4">
        <h1 className="relative text-3xl font-semibold pt-[50px] text-[#100A57] max-[450px]:text-xl">MattBan Todo List App</h1>

        <div className="relative grid grid-cols-2 h-16 mt-6 ">
          <input type="text" placeholder="Add new task" value={value} onChange={(e) => setNewValue(e.target.value)}  className="bg-[#FFE7DE] rounded-full w-100 pl-5 focus:outline-0 max-[450px]:w-70"/>
          <button className="bg-[#FA5113] rounded-full w-36 mx-20 font-semibold text-xl text-white hover:cursor-pointer max-[450px]:mx-1" onClick={AddTodo}>ADD</button>
        </div>

        <div className="h-50 ">
          <h1 className="relative text-xl font-semibold pt-[20px] text-[#100A57]">Active Tasks</h1>
          <div className="overflow-y-auto h-40">
          <ul>{activeTodos.map((todo, index) => (
            <li className="relative grid grid-cols-3 mt-2" key={index}>
              <img src={checkbox} alt="check-icon" className="w-6 hover:cursor-pointer" onClick={() => AddToCompleted(index)} />
              <p className="relative w-[250%] left-[-110px] text-[#100A57] max-[450px]:left-[-75px]">{todo}</p>
              <img src={close} alt="close-icon" className="w-6 ml-31 hover:cursor-pointer max-[450px]:ml-15" onClick={() => RemoveToDo(index)}/>
            </li>
           ))}         
           </ul>
           </div>
        </div>

        <div className="h-50 mt-5">
          <h1 className="relative text-xl font-semibold pt-[20px] text-[#100A57]">Completed Tasks</h1>
          <div className="overflow-y-auto h-40">
          <ul>{completedToDos.map((todo, index) => (
            <li className="relative grid grid-cols-3 mt-2 line-through" key={index}>
              <img src={checked} alt="checked-icon" className="w-6 hover:cursor-pointer" onClick={() => RestoreCompleted(index)}/>
              <p className="relative w-[250%] left-[-110px] text-[#100A57] max-[450px]:left-[-75px]">{todo}</p>
              <img src={close} alt="close-icon" className="w-6 ml-31 hover:cursor-pointer max-[450px]:ml-15" onClick={() => RemoveToDo(index)}/>
            </li>
            ))}
          </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

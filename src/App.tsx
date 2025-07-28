import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleClickAddOrUpdate = () => {
    if (editIndex !== null) {
      if (!task.trim()) {
        // IF THE EDIT INPUT FIELD IS EMPTY AND IF I CLICK UPDATE WE WILL DELETE THE WHOLE ROW
        // ✅ If empty, delete the task instead of updating
        setTaskList((prev) => prev.filter((_, t) => t != editIndex));
      } else {
        // ✅ Normal EDIT update
        setTaskList((prev) =>
          prev.map((item, index) => (index === editIndex ? task : item))
        );
      }

      setEditIndex(null);
    } else {
      if (!task.trim()) return; // IF THE INPUT FIELD IS EMPTY NO NEED TO CLICK THE ADD BUTTON
      setTaskList((prev) => [...prev, task]);
    }

    setTask("");
  };

  const handleClickDelete = (data: string) => {
    //FOR DELETE FUNCTION WE USE FILTER TO DELETE
    setTaskList((prev) => prev.filter((t) => t != data));
  };

  const handleClickEdit = (data: string, index: number) => {
    setTask(data);
    setEditIndex(index);
  };
  return (
    <>
      <div className="items-center justify-items-center ">
        <p className="underline bg-black-700">Todo List</p>
        <input value={task} onChange={(e) => setTask(e.target.value)} />
        <button
          className="bg-indigo-500 hover:bg-fuchsia-500"
          onClick={handleClickAddOrUpdate}
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
        <ul>
          {taskList.map((data, index) => (
            <li key={index}>
              {data}
              <button onClick={() => handleClickEdit(data, index)}>Edit</button>
              <button onClick={() => handleClickDelete(data)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

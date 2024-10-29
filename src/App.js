import "./styles.css";
import { useState, useEffect } from "react";
import FormComponent from "./FormComponent";
export default function App() {
  const [list, setList] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => res.json())
      .then((res) => {
        setList(res);
        localStorage.setItem("list", JSON.stringify(res));
      });
  }, []);

  const handleChange = (event, key, id, userId) => {
    console.log("<<< handle f", event.target.value, key);
    let formDataValue = { ...formData, [key]: event.target.value };
    setFormData(formDataValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      let editList = list.map((item) =>
        item.id === formData.id ? formData : item
      );
      setList([...editList]);
      localStorage.setItem("list", JSON.stringify(editList));
    } else {
      // Add new item
      let addedlist = [{ ...formData }, ...list];
      setList(addedlist);
      localStorage.setItem("list", JSON.stringify(addedlist));
      setFormData({});
    }
    setOpen(false);
    setIsEditing(false);
  };
  const handleEdit = (id) => {
    setOpen(true);
    setIsEditing(true);
    let index = list.findIndex((element) => element.id === id);
    setFormData({ ...list[index] });
  };
  const handleDelete = (id) => {
    let filtered = list.filter((element) => element.id !== id);
    setList(filtered);
    localStorage.setItem("list", JSON.stringify(filtered));
  };
  const getList = JSON.parse(localStorage.getItem("list") || []);
  return (
    <div className="App">
      <button
        onClick={() => {
          setOpen(true);
          setIsEditing(false);
          setFormData({});
        }}
      >
        {"Add"}
      </button>
      <FormComponent
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isOpen={isOpen}
        isEditing={isEditing}
      />
      <ul>
        {getList.map((item) => (
          <li key={item.id}>
            {item.id} - {item.title}
            <button onClick={() => handleEdit(item.id)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

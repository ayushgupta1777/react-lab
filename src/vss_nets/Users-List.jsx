import { useState } from "react";
import { useNavigate } from "react-router";

const UsersList = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    { id: 1, name: "Rahul" },
    { id: 2, name: "Abhishek" },
    { id: 3, name: "Tarun" },
    { id: 4, name: "Deepak" },
    { id: 5, name: "Uvesh" },
  ]);

  return (
    <div>
        <input type="text"
         placeholder="Search user" 
         />

           

           



      <h1>My Users</h1>
      {users.map((item) => {
        return (
          <li key={item.id} onClick={() => navigate(`/users/${item.id}/${item.name}`)}>
            {item.name}
          </li>
        );
      })}
    </div>
  );
};

export default UsersList;
import { useParams } from "react-router";

const UserDetails = () => {
  //   const params = useParams();
  const { id,name  } = useParams();




   
  return (
    <div>
      <h1>My user name is : {id }</h1>
        <h1>My user name is : {name }</h1>
    </div>
  );
};

export default UserDetails;
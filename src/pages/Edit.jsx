import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Edit = () => {
    let nav=useNavigate()
  const { id } = useParams();
  const [input, setinput] = useState({
    name: "",
    email: "",
    age: "",
  });
  useEffect(() => {
    async function get() {
      let res = await axios.get("https://mern-crud-backend-u9a9.onrender.com/api/user/s/" + id);
      setinput(res.data);
    }
    get();
  }, []);
  async function handleEdit(e){
    e.preventDefault()
    await axios.put("https://mern-crud-backend-u9a9.onrender.com/api/user/"+id,input)
    nav("/")
  }
  return (
    <div>
      <h1 className="text-lg font-semibold text-center">Update Data</h1>
      <form
        className="p-3 flex flex-col gap-3 w-[90%] bg-gray-600 rounded-md shadow-xl justify-center sm:w-[40%] mx-auto"
        autoComplete="off"
        onSubmit={handleEdit}
      >
        <input
          name="name"
          value={input.name}
          onChange={(e) =>
            setinput({ ...input, [e.target.name]: e.target.value })
          }
          type="text"
          placeholder="Enter Name.."
          required
          className="shadow-md rounded-md px-2"
        />
        <input
          name="email"
          value={input.email}
          onChange={(e) =>
            setinput({ ...input, [e.target.name]: e.target.value })
          }
          type="text"
          placeholder="Enter Email.."
          required
          autoComplete="off"
          className="shadow-md rounded-md px-2"
        />
        <input
          name="age"
          value={input.age}
          onChange={(e) =>
            setinput({ ...input, [e.target.name]: e.target.value })
          }
          type="number"
          placeholder="Enter Age.."
          required
          className="shadow-md rounded-md px-2"
        />
        <button
          type="submit"
          className="bg-blue-300 shadow-md rounded-md w-1/2 mx-auto"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Edit;

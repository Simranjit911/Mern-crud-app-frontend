import axios from "axios";
import { FallingLines } from "react-loader-spinner";
import { toast } from "react-hot-toast";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const [load, setload] = useState(true);
  const [users, setusers] = useState([]);
  const [render, setrender] = useState(false);
  const [input, setinput] = useState({
    name: "",
    email: "",
    age: "",
  });
  useEffect(() => {
    async function get() {
      let res = await axios.get(
        "https://mern-crud-backend-u9a9.onrender.com/api/user/"
      );
      setusers(res.data);
      console.log(users);
    }
    get();
    setTimeout(() => {
      setload(false);
    }, 1500);
  }, [render]);

  async function handleSubmit(e) {
    e.preventDefault();
    if(input.age.length<=0){
      return toast.error("Enter Valid Age!")
    }
    await axios.post(
      "https://mern-crud-backend-u9a9.onrender.com/api/user",
      input
    );
    toast.success("User Added!");
    setrender(!render);
    setinput({
      name: "",
      email: "",
      age: "",
    });
  }
  async function handleDel(id) {
    toast.success("User Deleted!");
    await axios.delete(
      `https://mern-crud-backend-u9a9.onrender.com/api/user/${id}`
    );
    setrender(!render);
  }
  return (
    <>
      {load ? (
        <div className="flex justify-center items-center mt-[40vh]">
          <FallingLines
            color="#60a5fa"
            width="100"
            visible={true}
            height={100}
            ariaLabel="falling-lines-loading"
          />
        </div>
      ) : (
        <>
          <h1 className="text-center text-lg font-bold bg-blue-400">
            User Management{" "}
          </h1>
          {/* Main Box */}
          <div className="flex flex-col mx-auto md:px-4  gap-2 m-1 items-center ">
            {/* Details */}
            <div className="sm:w-[60%] w-[95%] border-2 bg-slate-500 border-slate-600 rounded-md shadow-lg text-center">
              <h1 className="text-lg font-semibold">Add User</h1>
              <form
                className="p-3 flex flex-col gap-3  justify-center w-[85%] mx-auto"
                autoComplete="off"
                onSubmit={handleSubmit}
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
                  type="email"
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
                  Add
                </button>
              </form>
            </div>

            {/* Table */}
            <div className="md:w-[60%] w-[95%] border-2  border-slate-600 rounded-md shadow-lg text-center px-1">
              <h1 className="text-lg font-semibold">Users Data</h1>
              <table className="w-[100%]  text-center mb-2">
                <thead className="border-2 border-slate-600 rounded-md text-center">
                  <tr>
                    <th className="border-2 border-slate-600">Name</th>
                    <th className="border-2 border-slate-600">Email</th>
                    <th className="border-2 border-slate-600">Age</th>
                    <th className="border-2 border-slate-600 text-center">
                      {" "}
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-1 m-1 rounded">
                        <AiTwotoneEdit />
                      </button>
                    </th>
                    <th className="border-2 border-slate-600">
                      {" "}
                      <button className="bg-red-800 hover:bg-red-800 text-white font-bold py-1 px-1 m-1 rounded">
                        <AiFillDelete />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((user) => {
                      return (
                        <tr
                          className="border-2 border-slate-600"
                          key={user._id}
                        >
                          <td className="border-2 border-slate-600 ">
                            {user.name}
                          </td>
                          <td className="border-2 border-slate-600">
                            {user.email}
                          </td>
                          <td className="border-2 border-slate-600">
                            {user.age}
                          </td>
                          <td className="border-2 border-slate-600">
                            <Link to={"/edit/" + user._id}>
                              <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-1 m-1 rounded">
                                <AiTwotoneEdit />
                              </button>
                            </Link>
                          </td>
                          <td className="border-2 border-slate-600">
                            <button
                              className="bg-red-400 hover:bg-red-500 text-white font-bold m-1 px-1 py-1 rounded"
                              onClick={() => {
                                handleDel(user._id);
                              }}
                            >
                              <AiFillDelete />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;

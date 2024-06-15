import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const Note = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [blank, setBlank] = useState("");
  const [success, setSuccess] = useState();
  async function getData() {
    const response = await fetch("http://localhost:5000/notes", {
      method: "GET",
      credentials: "include", // Include cookies
    });

    if (response.status === 401) {
      // If unauthorized, navigate to login page
      navigate("/user/login");
    }
    const result = await response.json();

    if (result === null || Object.keys(result).length === 0) {
      setBlank("No note is present !! First add note !!");
    }
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setData(result);
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.status === 401) {
      // If unauthorized, navigate to login page
      navigate("/user/login");
      return;
    }

    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setSuccess("Deleted successfully");
      setTimeout(() => {
        setSuccess("");
        setError("");
        getData();
      }, 1000);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  return (
    <>
      <div>
        <center>
          <div className="blankBox">
            {blank ? (
              <h2 className="display-6">{blank}</h2>
            ) : (
              <h2 className="display-6">All Notes</h2>
            )}
          </div>
        </center>
        {data?.map((ele) => (
          <div key={ele._id} className="note">
            <h1>{ele.title}</h1>
            <br />
            <p>{ele.content}</p>
            <button
              className="btn deleteIcon"
              onClick={() => handleDelete(ele._id)}
            >
              <i className="bi bi-trash"></i>
            </button>
            <NavLink to={`/notes/${ele._id}`} className="btn editIcon">
              <i className="bi bi-pencil"></i>
            </NavLink>
          </div>
        ))}
      </div>
    </>
  );
};

export default Note;

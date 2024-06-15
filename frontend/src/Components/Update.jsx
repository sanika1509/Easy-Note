import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const Update = (props) => {
  const [expand, setExpand] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const expandIt = () => {
    setExpand(true);
  };

  const getSingleNote = async () => {
    const response = await fetch(`http://localhost:5000/notes/${id}`, {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      console.log("updated user:", result);
      setError("");
      setTitle(result.title);
      setContent(result.content);
    }
  };

  const bcToNormal = () => {
    setExpand(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedNote = { title, content };
    const response = await fetch(`http://localhost:5000/notes/${id}`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(updatedNote),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      console.log(result);
      setError("Success");
      navigate("/notes");
    }
  };
  useEffect(() => {
    getSingleNote();
  }, []);

  return (
    <>
      <div className="main_note" onDoubleClick={bcToNormal}>
        <form onSubmit={handleUpdate}>
          {expand ? (
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              autoComplete="off"
            />
          ) : null}

          <textarea
            rows=""
            column=""
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a note"
            onClick={expandIt}
          ></textarea>

          {expand ? (
            <div className="addBtn">
              <button type="submit" className="plus_sign">
                <i className="bi bi-plus"></i>
              </button>
            </div>
          ) : null}
        </form>
      </div>
    </>
  );
};

export default Update;

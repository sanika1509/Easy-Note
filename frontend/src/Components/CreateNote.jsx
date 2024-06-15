import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const CreateNote = (props) => {
  const [expand, setExpand] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Example: Protecting a page
  function checkAccess() {
    const userId = localStorage.getItem("token");
    if (userId === null) {
      // Redirect to login page if user is not logged in
      navigate("/user/login");
    }
  }

  const expandIt = () => {
    setExpand(true);
  };

  const bcToNormal = () => {
    setExpand(false);
  };

  const handleInsert = async (e) => {
    e.preventDefault();
    if (title.trim() === "" || content.trim() === "") {
      setError("Title and content cannot be empty");
      return;
    }
    const addNote = { title, content };

    const response = await fetch("http://localhost:5000/notes", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(addNote),
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
      setTitle("");
      setContent("");
      navigate("/notes");
    }
  };
  useEffect(() => {
    checkAccess();
  }, []);

  return (
    <>
      <div className="main_note" onDoubleClick={bcToNormal}>
        {error ? (
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <></>
        )}
        <form onSubmit={handleInsert}>
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

export default CreateNote;

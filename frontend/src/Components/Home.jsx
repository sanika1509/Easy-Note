import React from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  async function goToNext() {
    navigate("/notes/add");
  }
  return (
    <>
      <div className="banner">
        <form onSubmit={goToNext}>
          <button type="submit" className="btn btn-primary">
            Use Notes
          </button>
        </form>
      </div>
    </>
  );
};
export default Home;

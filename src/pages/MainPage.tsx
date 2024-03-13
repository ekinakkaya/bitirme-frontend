import "./MainPage.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import DocumentMetadatas from "./../components/DocumentMetadatas";


function MainPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Anasayfa";
  }, []); 
  
  const onCreateDocumentButtonClick = () => {
    navigate("/edit");
  }

  return (
    <>
      <div className="MainPage">
        <SideBar />
        <NavBar />
        <div className="Canberk">
          <button type="button" className="crtbtn" onClick={ onCreateDocumentButtonClick }>
            Create a Document
          </button>
          <SearchBar />
          <div className="LogColumns">
            <span className="label">File Name</span>
            <span className="label">Page</span>
            <span className="label">Generated</span>
            <span className="label">Last Modified</span>
          </div>
          <DocumentMetadatas />
        </div>
      </div>
    </>
  );
}

export default MainPage;

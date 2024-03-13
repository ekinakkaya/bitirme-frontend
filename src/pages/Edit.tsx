/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Edit.css"; // Import the CSS file
import PopUp from "../components/PopUp";




const Edit: React.FC = () => {
  const { id } = useParams();

  const [inputBoxes, setInputBoxes] = useState<string[]>([""]);
  const [displayedText, setDisplayedText] = useState<string[]>([""]);
  const [boxTypes, setBoxTypes] = useState<string[]>(["input"]); // Track the types of boxes
  const [displayBox, setDisplayBox] = useState<string[]>([""]);


  const addDisplayBox = (index: number) => {
    
    const updatedDisplayBox = [...displayBox];
    updatedDisplayBox.splice(index + 1, 0, "");
    setDisplayBox(updatedDisplayBox);

  };

  const deleteDisplayBox = (index: number) => {
    
    const updatedDisplayBox = [...displayBox];
    updatedDisplayBox.splice(index, 1);
    setDisplayBox(updatedDisplayBox);
  };



  const handleAddBox = (index: number, type: string) => {
    const updatedInputBoxes = [...inputBoxes];
    updatedInputBoxes.splice(index + 1, 0, "");
    setInputBoxes(updatedInputBoxes);

    const updatedDisplayedText = [...displayedText];
    updatedDisplayedText.splice(index + 1, 0, "");
    setDisplayedText(updatedDisplayedText);

    const updatedBoxTypes = [...boxTypes];
    updatedBoxTypes.splice(index + 1, 0, type);
    setBoxTypes(updatedBoxTypes);

    handleClosePopUp();
  };

  const handleAddTitleBox = (index: number) => {
    handleAddBox(index, "input");
  };

  const handleAddTextBox = (index: number) => {
    handleAddBox(index, "textarea");
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedInputBoxes = [...inputBoxes];
    updatedInputBoxes[index] = value;
    setInputBoxes(updatedInputBoxes);

    const updatedDisplayedText = [...displayedText];
    updatedDisplayedText[index] = value.replace(/\n/g, "<br/>");
    setDisplayedText(updatedDisplayedText);
    checkOverflow(index);
  };

  const [showPopUp, setShowPopUp] = useState(false);

  const handleOpenPopUp = (index: number) => {
    setShowPopUp(true);
    setPopupIndex(index);
  };

  const [popupIndex, setPopupIndex] = useState<number | null>(null);

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  const handleDeleteBox = (index: number) => {
    const updatedInputBoxes = [...inputBoxes];
    updatedInputBoxes.splice(index, 1);
    setInputBoxes(updatedInputBoxes);

    const updatedDisplayedText = [...displayedText];
    updatedDisplayedText.splice(index, 1);
    setDisplayedText(updatedDisplayedText);

    const updatedBoxTypes = [...boxTypes];
    updatedBoxTypes.splice(index, 1);
    setBoxTypes(updatedBoxTypes);
  };


  const checkOverflow = (index : number) => {
    const displayContainer = document.querySelector('.displayContainer');
    
    if (displayContainer) {
      const isOverflowing = displayContainer.scrollHeight > displayContainer.clientHeight;
      
      if (isOverflowing) {
        console.log('Overflow occurred in display container');

        addDisplayBox(index);
      } 
    }
  };



  // mainpage'de create butonuna basıldığında dökümanı oluşturmalı
  //const handleCreateDocument = async () => {
  //  const requestBody = {
  //    content: "",
  //    fileName: "test",
  //    userId: 1
  //  }

  //  // Belge oluşturma isteği
  //  const createResponse = await fetch("http://127.0.0.1:8081/api/documents/create", {
  //    method: "POST",
  //    headers: {
  //      "Content-Type": "application/json"
  //    },
  //    body: JSON.stringify(requestBody)
  //  });

  //  console.log(createResponse);
  //}

  const handleSaveDocument = async () => {
    const requestBody = {
      id: id,
      content: inputBoxes.join("\n"),
      fileName: "test",
      userId: 1
    }

    // veritabanındaki document'in content içeriğini sayfadakiyle değiştir
    const createResponse = await fetch("http://127.0.0.1:8081/api/documents/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    console.log(createResponse.json);
  }

  return (
    <div className="container">
      <div className="inputBoxes">
        {inputBoxes.map((inputBox, index) => (
          <div key={index} className="input-container">
            {boxTypes[index] === "input" ? ( // burası daha çok tür eklendikçe değişecek 
              <>
                <label htmlFor={`inputBox${index}`}>Enter Title:</label>
                <input
                  className="titleBox"
                  type="text"
                  id={`inputBox${index}`}
                  value={inputBox}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              </>
            ) : (
              <>
                <label htmlFor={`inputBox${index}`}>Enter Text:</label>
                <textarea
                  className="textBox"
                  id={`inputBox${index}`}
                  value={inputBox}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  rows={4}
                />
              </>
            )}

            <button onClick={() => handleOpenPopUp(index)}>Add Item</button>
            <button onClick={() => handleDeleteBox(index)}>Delete</button>

            <PopUp show={showPopUp} handleClose={handleClosePopUp}>
              {popupIndex !== null && (
                <>
                  <button onClick={() => handleAddTitleBox(popupIndex)}>
                    Add Title Box
                  </button>
                  <button onClick={() => handleAddTextBox(popupIndex)}>
                    Add Text Box
                  </button>
                </>
              )}
            </PopUp>
          </div>
        ))}
      <button onClick={() => handleSaveDocument()} type="submit">Save Document</button>
      </div>

      
      <div className="display-container">
        <h2>Display:</h2>

        {displayedText.map((text, index) =>
          boxTypes[index] === "input" ? (
            <>
              <div
                key={index}
                className="display-title"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </>
          ) : (
            <>
              <div
                key={index}
                className="display-text"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </>
          )
        )}
      </div>
    </div>


  )
};

export default Edit;
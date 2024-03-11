/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import "./Create.css";
import PopUp from "../components/PopUp";

const CreateTemplate: React.FC = () => {
  const [inputBoxes, setInputBoxes] = useState<string[]>(["1)"]); // Default title box
  const [boxTypes, setBoxTypes] = useState<string[]>(["title"]); // Track the types of boxes, changed "input" to "title" for clarity
  const [fileName, setFileName] = useState<string>(""); // State for file name
  const [showPopUp, setShowPopUp] = useState(false);
  const [popupIndex, setPopupIndex] = useState<number | null>(null);
  const [documentId, setDocumentId] = useState<string>("");
  const [createdDocument, setCreatedDocument] = useState<string>("");

  const createDocument = async () => {
    const requestBody = {
      content: inputBoxes.join("\n"),
      fileName: 3, // Kullanıcının girdiği belge ismini kullan
      userId: 3
    };
  
    try {
      // Belge oluşturma isteği
      const createResponse = await fetch("http://127.0.0.1:8081/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!createResponse.ok) {
        console.error("Failed to create document");
        return;
      }
  
      // Belge kimliğini al
      const createdDocumentId = await createResponse.text();
  
      // Belgeyi indirme isteği
      const downloadResponse = await fetch(`http://127.0.0.1:8081/api/documentsgenerateAndDownloadDocument/${createdDocumentId}`);
  
      if (downloadResponse.ok) {
        console.log("Document downloaded successfully");
        // İşlemler başarılı olduğunda dosyayı indir
        downloadDocument();
      } else {
        console.error("Failed to download document");
      }
    } catch (error) {
      console.error("Error during document creation and download:", error);
    }
  };
  
  

  const handleAddBox = (index: number, type: string, isSubTitle: boolean = false) => {
    const updatedInputBoxes = [...inputBoxes];
    const updatedBoxTypes = [...boxTypes];

    if (!isSubTitle) {
      // For a new main title
      updatedInputBoxes.push("");
      updatedBoxTypes.push("title");
    } else {
      // For a subtitle under the current title/subtitle
      updatedInputBoxes.push("");
      updatedBoxTypes.push("subtitle");
    }

    setInputBoxes(updatedInputBoxes);
    setBoxTypes(updatedBoxTypes);
    handleClosePopUp();
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedInputBoxes = [...inputBoxes];
    updatedInputBoxes[index] = value;
    setInputBoxes(updatedInputBoxes);
  };

  const handleOpenPopUp = (index: number) => {
    setShowPopUp(true);
    setPopupIndex(index);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
    setPopupIndex(null); // Clear the popup index upon closing
  };

  const handleDeleteBox = (index: number) => {
    const updatedInputBoxes = [...inputBoxes];
    const updatedBoxTypes = [...boxTypes];

    if (inputBoxes.length > 1) {
      updatedInputBoxes.splice(index, 1);
      updatedBoxTypes.splice(index, 1);

      setInputBoxes(updatedInputBoxes);
      setBoxTypes(updatedBoxTypes);
    } else {
      console.log("At least one input box must remain.");
    }
  };

  return (
    <div className="container">
      <div className="titleBoxes">
        
        {/* Document ID input box */}
        
        
        {/* Other input boxes */}
        {inputBoxes.map((inputBox, index) => (
          <div key={index} className="box-container">
            <label htmlFor={`inputBox${index}`}>{boxTypes[index] === "title" ? "Enter Title:" : "Enter Sub Title:"}</label>
            <input
              className="titleBox"
              type="text"
              id={`inputBox${index}`}
              value={inputBox}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            <button onClick={() => handleOpenPopUp(index)}>Add Item</button>
            <button onClick={() => handleDeleteBox(index)}>Delete</button>
          </div>
        ))}
      </div>
      {/* Pop-up for adding new boxes */}
      {showPopUp && popupIndex !== null && (
        <PopUp show={showPopUp} handleClose={handleClosePopUp}>
          <button onClick={() => handleAddBox(popupIndex, "title", false)}>Add Title Box</button>
          <button onClick={() => handleAddBox(popupIndex, "subtitle", true)}>Add Sub Title Box</button>
        </PopUp>
      )}
      {/* Belge oluşturma butonları */}

      <div className="generate-button-container">
        <button onClick={createDocument}>Create Document</button>
      </div>
      {/* Oluşturulan belgenin bilgisi */}
      {createdDocument && (
        <div className="document-info">
          Oluşturulan Belge: {createdDocument}
        </div>
      )}
    </div>
  );
};

export default CreateTemplate;
function downloadDocument() {
  throw new Error("Function not implemented.");
}


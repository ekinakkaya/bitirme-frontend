import React, { useEffect, useState } from 'react';
import "./DocumentMetadatas.css";

function DocumentMetadatas() {
  const [documentMetadatas, setDocumentMetadatas] = useState([]);

  const fetchAllDocumentsMetadata = async () => {
    return await fetch("http://127.0.0.1:8081/api/documents/all/metadata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(response => response.json());
  }

  useEffect(() => {
    fetchAllDocumentsMetadata()
    .then(data => setDocumentMetadatas(data))
  }, []);

  console.log(documentMetadatas);


  return(
    <div className='document-metadatas'>
        <ul>
            {documentMetadatas.map((data, i) => (
                <li key={i}>
                    <span>{data.id}</span>
                    <span>{data.fileName}</span>
                    <span>{data.userId}</span>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default DocumentMetadatas;
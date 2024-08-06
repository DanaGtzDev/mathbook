import React, { useState } from 'react'
import { jsonSetter } from '../global/jsonSetterInterface';

export const JSONFileReader : React.FC<jsonSetter> = (
    props:jsonSetter
) => {

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/json") {
      const reader = new (FileReader as any)
      reader.onload = (e: any) => {
        const text = e.target?.result;
        try {
          const json = JSON.parse(text as string);
          props.sendJsonData(json)
        } catch (error) {
          console.error("Error parsing JSON!", error);
        }
      };
      reader.readAsText(file);
    } else {
      console.error("Please upload a JSON file.");
    }
  };
  
  return (
    <div>
      <input type="file" accept=".json" onChange={handleFileChange} />
    </div>
  )
}

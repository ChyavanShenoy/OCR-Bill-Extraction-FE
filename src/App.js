import { useCallback, useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import "./App.css";
import DisplayResult from "./components/DisplayResult";
// import styled, { keyframes } from "styled-components";
import Dropdown from "./components/dropdown/Dropdown";
import Header from "./components/Header";
import Selection from "./components/Selection";
// import data_base64 from "./b64";
// import axios from "axios";
import {animation, SuccessWrapper} from './components/styling/styles'


function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");
  const [imagebase,setImagebase]=useState("")
  // const [extracted, setExtracted]=useState(false)
  const base64 =
    `data:image/png;base64,${imagebase}`;

  const worker = createWorker();

  const convertImageToText = useCallback(async () => {
    if (!selectedImage) return;
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const { data } = await worker.recognize(selectedImage);
    setTextResult(data.text);
  }, [worker, selectedImage]);

  useEffect(() => {
    convertImageToText();
  }, [selectedImage, convertImageToText]);

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    } else {
      setSelectedImage(null);
      setTextResult("");
    }
  };

  
  function imageUploaded() {
    var file = document.querySelector("input[id=upload]")["files"][0];
    var reader = new FileReader();
    reader.onload = function () {
      base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    };
    reader.readAsDataURL(file);
  }


  var base64String = "";

  
  function displayString() {
    console.log("Base64String is about to be printed");
    alert(base64String);
  }

async function extract() {
  const response= await fetch("http://localhost:8080/bill", {
    method: "POST",
    headers: {
      
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({"image_data": base64String}),
  });
  // console.log(response, '---------------------------------------');
  const data=await response.json();
  // console.log("Data_being_returned", data);

  // console.log("Data_result", data.result)
  // console.log("resultData", resultDataBlocks)
  const resultDataBlocks = data.result.pages[0].blocks
  // Object.entries(resultDataBlocks).forEach((entry) => {
  //   const [index, value] = entry;
  //   // console.log("Index: ", index, "Value: ", value);
  // });
  console.log("---------------------------------------");
  resultDataBlocks.forEach((block) => {
    Object.entries(block).forEach((entry) => {
      const [index, value] = entry;
      
      // console.log("Level: ", index, "Value: ", value);
    });
  });
  setImagebase(data.synth_image)
}



   function decodeBase64(base64String) {
    let base64ToString = Buffer.from(base64String, "base64").toString()
    this.setState({value: base64ToString })
}

  return (
    <div className="App">
      <Header />
      <Selection imageUploaded={imageUploaded} imagebase={imagebase} />
      <div className="input-wrapper">
        {/* <input type="file" onChange={extract} /> */}
        <button onClick={extract} style={{ width: "100px", height: "50px" }}>
          Extract
        </button>
      </div>
      
    <div>
    {/* <img src={"data:image/jpeg;base64," + this.state.value} /> */}
    {/* <img width='500' height='500' src={`data:image/png;base64,${imagebase}`}/> */}
    {/* {
      extracted ? <img width='500' height='500' src={`data:image/png;base64,${imagebase}`}/> : <img width='500' height='500' src={URL.createObjectURL(selectedImage)}/>
    } */}
    </div>

      <div className="result">
        {selectedImage && (
          <div className="box-image">
            <img src={URL.createObjectURL(selectedImage)} alt="thumb" />
          </div>
        )}
        {textResult && (
          <div className="box-p">
            <p>{textResult}</p>
          </div>
        )}
      </div>
      <DisplayResult  />

      {/* {textResult && (
        <SuccessWrapper>
          <h1 className="success">Extraction Successful</h1>
        </SuccessWrapper>
      )} */}
    </div>
  );
}

export default App;

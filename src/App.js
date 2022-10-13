import { useCallback, useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import "./App.css";
import Display from "./components/display";
import Header from "./components/Header";
import Selection from "./components/Selection";
import {isReachable} from './components/server'

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");
  const [imagebase,setImagebase]=useState("")
  const [extracted, setExtracted]=useState(false)
  const [reachable, setReachable]=useState(false)
  const [isImageUploaded, setIsImageUploaded]=useState(false)
  const [resultDataBlocks, setResultDataBlocks]=useState([])
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
    }
  };
  function imageUploaded() {
    var file = document.querySelector("input[id=upload]")["files"][0];
    console.log(file)
    var reader = new FileReader();
    reader.onload = function () {
      base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    };
    reader.readAsDataURL(file);
    setIsImageUploaded(true)
  }
  var base64String = "";
  function displayString() {
    console.log("Base64String is about to be printed");
    alert(base64String);
  }

async function extract() {
  const response= await fetch("http://localhost:8000/bill", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({"image_data": base64String}),
  });
  const data=await response.json();
  setResultDataBlocks(data.result)
  console.log("---------------------------------------");
  setImagebase(base64String)
  setExtracted(true)
}
  function isConnected(){
    isReachable().then((res)=>{
      setReachable(res)
    })
  }
   function decodeBase64(base64String) {
    let base64ToString = Buffer.from(base64String, "base64").toString()
    this.setState({value: base64ToString })
}
isConnected()
  return ( 
    <div className="App">
      {reachable ? <>
      <div style={{"display": "flex", "flexDirection": 'column', "alignItems": "center"}}>
      <Header />
      <Selection imageUploaded={imageUploaded} imagebase={imagebase} />
      <div className="input-wrapper">
       { isImageUploaded ? <button onClick={extract} style={{ width: "100px", height: "50px" }}>
          Extract
        </button> : <button onClick={extract} style={{ width: "100px", height: "50px" }} disabled={true}>Extract</button> }
      </div>
      </div>
    <div>
    </div>
      <div className="result">
      </div>
      <div style={{"display": "flex", "flexDirection": "row", "alignContent": "space-evenly"}}>
        {isImageUploaded ? <img width='500' height='500' src={`data:image/png;base64,${imagebase}`}/> : <></>}
      {extracted ? <Display data={resultDataBlocks} /> : <></>}
      </div>
      </> : <h1>Unable to reach the server. Please check the connection.</h1>}
    </div>
  );
}

export default App;

import { useCallback, useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import "./App.css";
import styled, { keyframes } from "styled-components";
import Dropdown from "./components/dropdown/Dropdown";
import data_base64 from "./b64";
import axios from "axios";

const animation = keyframes`
  0% { opacity: 0; transform: translateY(-100px); }
  25% { opacity: 1; transform: translateY(0px); }
  75% { opacity: 1; transform: translateY(0px); }
  100% { opacity: 0; transform: translateY(-100px); }
`;
const Wrapper = styled.span`
  animation-name: ${animation};
  animation-duration: 10s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  font-size: 50px;
  font-weight: 600;
`;
const SuccessWrapper = styled.span`
  animation-name: ${animation};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  font-size: 30px;
  font-weight: 600;
`;

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");
  const [imagebase,setImagebase]=useState("")

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

  let base64String = "";

  function imageUploaded() {
    var file = document.querySelector("input[id=upload]")["files"][0];

    var reader = new FileReader();
    console.log("next");

    reader.onload = function () {
      base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

      // const imageBase64Stringsep = base64String;

      // alert(imageBase64Stringsep);
      // console.log(base64String);
      console.log("Conversion Complete");
    };
    reader.readAsDataURL(file);
  }

  function displayString() {
    console.log("Base64String about to be printed");
    alert(base64String);
  }
  
let json_format_data =  {
  "image_location": {
    "image_data": data_base64,
  }
}

  // function extract() {
  //   fetch("http://127.0.0.1:8000/bill", {
  //     mode: "no-cors",
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     body: JSON.stringify(json_format_data),
  //   }).then(response=>response.json()).then(data => setImage(data.synth_image));


  // }

  async function extract() {
    const response= await fetch("http://localhost:8000/bill", {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: json_format_data,
    });
    console.log(json_format_data)
    console.log(response, '---------------------------------------');
    const data=await response.json();
    console.log(data, '--------------------------------------');
    setImagebase(data.synth_image)
  }

  function display(){
    console.log(imagebase)
  }

   function decodeBase64(base64String) {
    let base64ToString = Buffer.from(base64String, "base64").toString()
    this.setState({value: base64ToString })
}

  return (
    <div className="App">
      <Wrapper>OCR App</Wrapper>
      <p className="waviy">Extract Text Anytime, Anywhere!</p>
      <Dropdown />
      <div className="input-wrapper">
        <label htmlFor="upload">Upload Image</label>
        <input
          type="file"
          id="upload"
          accept="image/*"
          onChange={imageUploaded}
        />
      </div>
      <div className="input-wrapper">
        {/* <input type="file" onChange={extract} /> */}
        <button onClick={extract} style={{ width: "100px", height: "50px" }}>
          Extract
        </button>
      </div>
      <button onClick={display}>
        Display
    </button>
    <div>
    {/* <img src={"data:image/jpeg;base64," + this.state.value} /> */}
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
      {textResult && (
        <SuccessWrapper>
          <h1 className="success">Extraction Successful</h1>
        </SuccessWrapper>
      )}
    </div>
  );
}

export default App;

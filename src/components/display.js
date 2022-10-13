import React from 'react'
// import Records from './response.json'
import "../App.css"

function Display({data}) {
  return (
    <div  >{
        data.pages.map((page,i)=>{
            return(<div key={i} >
                <div  className="gridBox">
                    {page.blocks.map((block,i)=>{return(<div key={i} >
                            <div >
                                {block.lines.map((line,i)=>{
                                    return(<div key={i} >
                                        <div style={{"display": "flex", "flexDirection": "row","padding":"5px"}}>
                                            {line.words.filter(word=> word.value.match("[0-9]")).map((word,i)=>{
                                                return(<div key={i} >
                                                    <div> 
                                                    <textarea>{word.value}</textarea>
                                                        </div>
                                                        </div>)
                                            })}
                                        </div>
                                        <div >
                                            {line.words.filter(word=> word.value.match("[a-z]")).map((word,i)=>{
                                                return(<div key={i} style={{"display": "flex", "flexDirection": "row"}}>
                                                    <div > 
                                                        {word.value} 
                                                        </div>
                                                        </div>)
                                            })}
                                        </div>
                                    </div>)
                                })}
                            </div>
                        </div>)
                        
                    })}
                </div>
            </div>)
        })
    }</div>
  )
}

export default Display

import React, { useState} from 'react';
import Editor from './components/Editor'
import "./scss/custom.scss"

const initial_html = "<div class='container'>A</div>\n<div class='container2'>B</div>"
// const initial_css = ".container{\n\tbackground-color: blue;\n}"
const initial_css = ".container{\
                    \n\tbackground-color: white;\
                    \n\theight: 100px;\
                    \n\twidth: 100px;\
                    \n\tposition: relative;\
                    \n\ttop: 100px;\
                    \n\tleft: 100px;\
                    \n}\
                    \n\
                    \n.container2{\
                    \n\tbackground-color: orange;\
                    \n\theight: 100px;\
                    \n\twidth: 100px;\
                    \n\tposition: relative;\
                    \n\ttop: 100px;\
                    \n\tleft: 100px;\
                    \n}"

function App() {
  const [html, setHtml] = useState(initial_html)
  const [css, setCss] = useState(initial_css)

  function getProperty(property){
    const start = css.indexOf(property)+property.length+1
    const end   = css.slice(start).indexOf(";") + start
    const value = css.slice(start,end).replace(/\s/g, "")

    return value
  }

  function getProperty(property, selector){
    const selectorStringStart = css.indexOf(selector)
    const selectorStringEnd = css.slice(selectorStringStart).indexOf("}")+selectorStringStart
    const cssString = css.slice(selectorStringStart, selectorStringEnd)
    const start = cssString.indexOf(property)+property.length+1
    const end   = cssString.slice(start).indexOf(";") + start
    const value = cssString.slice(start,end).replace(/\s/g, "")

    return value
  }

  return (
    <div className='app'>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
      </div>

      <div className="pane" >
        <div className="element container2" style={{ backgroundColor:getProperty("background-color", "container2"), 
                                            height:getProperty("height", "container2"),
                                            width:getProperty("width", "container2"),
                                            position:getProperty("position", "container2"),
                                            top:getProperty("top", "container2"),
                                            left:getProperty("left", "container2"),
                                          }}>B
        </div>
        <div className="element container" style={{ backgroundColor:getProperty("background-color", "container"), 
                                            height:getProperty("height", "container"),
                                            width:getProperty("width", "container"),
                                            position:getProperty("position", "container"),
                                            top:getProperty("top", "container"),
                                            left:getProperty("left", "container"),
                                          }}>A
        </div>
      </div>
    </div>
  )
}



export default App;
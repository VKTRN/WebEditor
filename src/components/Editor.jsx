import React, { useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'

export default function Editor({ language, displayName, value, onChange}) {

  const [open, setOpen] = useState(true)

  function handleChange(editor, event) {

    function findLineContainingProperty(property){
      let containingLine 
      let index
      lines.forEach((line, i) => {
        if(line.includes(property)){
          containingLine = line
          index = i
        }
      })
      return [containingLine,index]
    }

    function lineContainsSomeProperty(index){
      return lines[index].includes(":")
    }
    
    function findColon(line){
      return line.indexOf(":")
    }
    
    function findSemicolon(line){
      return line.indexOf(";")
    }

    function insertChange(line){
      const newLine = line.slice(0, charStart) + change + line.slice(charEnd)
      return newLine
    }
    
    function insertLine(index){
      let newValue = ""

      let newLines = lines
      newLines[index] = newLine

      for (let j = 1; j < newLines.length; j++) {
        newLines[j] = "\n" + newLines[j]
        if(newLines[j].includes(":")){
          newLines[j] = "\t" + newLines[j]
        }
      }

      newValue = newLines.join("")
      return newValue
    }

    function getLines(){
      return editor.display.view.map(a => a.line.text)
    }
  
    const lines       = getLines()
    const change      = event.text
    const changeIndex = event.from.line
    const changeLine  = lines[changeIndex]
    const charStart   = event.from.ch
    const charEnd     = event.to.ch


    const colon      = findColon(changeLine)
    const semicolon  = findSemicolon(changeLine)
    const newLine    = insertChange(changeLine)
    const newValue   = insertLine(changeIndex)
    console.log(newValue);

    const validLine       = lineContainsSomeProperty(changeIndex)
    const afterColon      = charStart > colon
    const beforeSemicolon = charEnd <= semicolon
    const hitEnter        = change.length == 2
    
    if ( validLine && afterColon && beforeSemicolon && !hitEnter) {
      onChange(newValue)
    }
  }

  return (
    <div className={`editor-container ${open ? '' : 'collapsed'}`}>
      <div className="editor-title">
        {displayName}
        <button
          type="button"
          className="expand-collapse-btn"
          onClick={() => setOpen(prevOpen => !prevOpen)}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          tabSize:2,
          theme: 'material',
          lineNumbers: true
        }}
      />
    </div>
  )
}
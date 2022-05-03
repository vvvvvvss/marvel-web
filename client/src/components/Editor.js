import { Paper } from "@mui/material"
import ReactMde from "react-mde"
import RenderMarkdown from "./RenderMarkdown"
import "./react-mde-all.css"
import { memo } from "react"

const Editor = ({value, onChange, selectedTab, onTabChange }) => {
  return (
    <Paper className='container'>
        <ReactMde 
        value={value} label='content'
        toolbarCommands={[
          ['header', 'bold', 'italic', 'strikethrough'],
          ['link', 'quote', 'code', 'image'],
          ['unordered-list', 'ordered-list']
        ]}
        onChange={onChange}
        selectedTab={selectedTab}
        onTabChange={onTabChange}
        generateMarkdownPreview={
            markdown =>
            Promise.resolve(
                <RenderMarkdown content={markdown} />
            ).catch(()=>(alert("could not parse your markdown")))
        }
    />
    </Paper>
  )
}

export default memo(Editor)
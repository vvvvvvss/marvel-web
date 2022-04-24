import { memo } from "react"
import Markdown from 'markdown-to-jsx';
import he from 'he';
import sanitizer from "sanitize-html";
import { Typography, Link } from "@mui/material";

const RenderMarkdown = ({content}) => {
  return (
    <Markdown style={{fontFamily: 'Montserrat',fontSize: '14px', lineHeight: '1.5'}} 
            options={{
              wrapper : 'div',
              overrides: {
                  p :{ component: Typography , props: {variant : 'body2', lineHeight:'24px'}}, 
                  a :{ component : Link, props : {target : '_blank',rel:'noopener noreferrer', sx:{color:'primary.light'}} },
                  img : { props : {width : '100%',height:'300px',style:{objectFit:'cover'} }},
                  iframe : { props : {width : '100%', height : '315', frameBorder : '0'}},
                  code : { component:Typography ,props : { variant:'code-small' }},
                  blockquote : {component:Typography ,props : { sx:{backgroundColor:'#132222',borderRadius:'6px', padding:'14px',color:'secondary.light',margin:'12px'}, variant:'body2' }}
              },
          }}>
            {
            he.decode( sanitizer(content, {
                allowedTags: ['iframe','br','strong','blockquote'], allowedAttributes: { 'iframe': ['src'] },
                allowedIframeHostnames: ['www.youtube.com','codesandbox.io','codepen.io','www.thiscodeworks.com'], nestingLimit : 5
              }) ) }
    </Markdown>
  )
}

export default memo(RenderMarkdown);
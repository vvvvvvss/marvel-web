import { memo } from "react"
import Markdown from 'markdown-to-jsx';
import he from 'he';
import sanitizer from "sanitize-html";
import { Typography, Link, Table, TableHead, TableRow, TableBody, TableCell } from "@mui/material";
import Gist from "react-gist";

const RenderMarkdown = ({content, fontSize}) => {

  const Script = (k)=>{
    return <Gist id={k?.src?.split("/")?.[k?.src?.split("/")?.length - 1]?.split(".")?.[0]}
    style={{backgroundColor:'#000'}}
    />
  }

  return (
    <Markdown
    style={{fontFamily: 'Montserrat',fontSize: fontSize || '15px', lineHeight: '1.7'}} 
            options={{
              disableParsingRawHTML:false,
              wrapper : 'div',
              overrides: {
                  p :{ component: Typography , props: {variant : 'body2', lineHeight:'1.7'}}, 
                  a :{ component : Link, props : {target : '_blank',rel:'noopener noreferrer', sx:{color:'primary.light'}} },
                  img : { props : {width : '100%' }},
                  iframe : { props : {width : '100%', frameBorder : '0',style:{maxHeight:'400px'}}},
                  code : { component:Typography ,props : { variant:'code-small' }},
                  blockquote : {component:Typography ,props : { sx:{backgroundColor:'#132222',borderRadius:'6px', padding:'14px',color:'secondary.light',margin:'12px'}, variant:'body2' }},
                  li:{ component: Typography , props: {variant : 'body2', lineHeight:'1.7', component:'li'} },
                  script:{component : Script},
                  table:{component: Table},
                  thead:{component:TableHead},
                  tr:{component:TableRow},
                  tbody:{component:TableBody},
                  td:{component:TableCell}
              },
          }}>
            {
            he.decode(
              sanitizer(content, {
                allowedTags: ['iframe','br','strong','blockquote','script'], 
                allowedAttributes: { 'iframe': ['src','height'], 'script': ['src'] },
                allowedIframeHostnames: ['www.youtube.com','codesandbox.io','codepen.io',
                                        'www.thiscodeworks.com','gist.github.com',
                                        'plot.ly','www.kaggle.com','player.vimeo.com','plotly.com'], 
                nestingLimit : 5,
                allowedScriptDomains: [ 'gist.github.com' ],
                allowedScriptHostnames :['gist.github.com'],
                allowVulnerableTags:true
              }))
            }
    </Markdown>
  )
}

export default memo(RenderMarkdown);
import {Editor} from './Editor'
import { useContext } from 'react'
import {DataContext} from '../context/DataProvider'

export const Code = () =>{
    const {html, setHtml, css, setCss, js, setJs} = useContext(DataContext)
    return (
        <div style={{display:'flex',background:'#060606'}}>
            <Editor heading="HTML" icon='<>' color='red' value={html} onChange={setHtml}/>
            <Editor heading="CSS" icon='#' color='blue' value={css} onChange={setCss}/>
            <Editor heading="Javascript" icon='js' color='yellow' value={js} onChange={setJs}/>
        </div>
    )
}
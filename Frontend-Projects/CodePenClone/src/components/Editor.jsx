import { useState } from 'react';
import Box from '@mui/material/Box';
import {styled} from '@mui/material'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import {Controlled as ControlledEditor} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css'; 
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import '../App.css'

export const Editor = ({heading,icon,color,value,onChange}) =>{
    const Heading = styled(Box)`
        background: #1D1E22;
        display: flex;
        padding: 9px 13px;
    `

    const Header = styled(Box)`
        display: flex;
        background: #060606;
        color: #AAAEBC;
        justify-content: space-between;
        font-weight: 700;
    `

    const Container = styled(Box)`
        flex-grow: 1;
        flex-basic: 0;
        display: flex;
        flex-direction: column;
        padding: 0px 7px;
    `

    const handleChange = (editor,data,value) =>{
        onChange(value);
    }
    const [open,setOpen] = useState(true)
    // style={open ? null : {flexGrow:0}}
    return (
        <Container style={open ? null : {flexGrow:0}}>
            <Container style={{marginTop:74.3}}>
                <Header>
                    <Heading>
                        <Box component="span" style={{background:`${color}`,height:20,width:25,display:'flex',placeContent:'center',borderRadius:5,marginRight:5,paddingBottom:5,color:'#000'}}>{icon}</Box>  
                        {heading}
                    </Heading>
                    <CloseFullscreenIcon fontSize='small' style={{alignSelf:'center'}} onClick={()=> setOpen(prevState => !prevState)} />   
                </Header>
                <ControlledEditor className='controlled-editor' value={value} onBeforeChange={handleChange} options={{
                    theme:'material',
                    lineNumbers: true,
                }}/>
            </Container>
        </Container>
    )
}
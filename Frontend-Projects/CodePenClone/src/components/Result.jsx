import {Box, styled} from '@mui/material'
import { useContext,useState,useEffect } from 'react'
import {DataContext} from '../context/DataProvider'

const Container = styled(Box)`
  height: 41vh;
`

const Result = () => {
  const [src,setSrc] = useState('')
  const {html,css,js} = useContext(DataContext)
  
  const srcCode = `
  <html>
    <body>${html}</body>
    <style>${css}</style>
    <script>${js}</script>
  </html>
  `
  useEffect(()=>{
    const timeout = setTimeout(() => {
      setSrc(srcCode)
    }, 2000);
    return () => clearTimeout(timeout)
  },[html, css, js])

  return (
    <Container>
      <iframe
        srcDoc={src}
        title='Output'
        sandbox='allow-script'
        width="100%"
        height="100%"
        frameBorder={0}
      />
    </Container>
  )
}

export default Result

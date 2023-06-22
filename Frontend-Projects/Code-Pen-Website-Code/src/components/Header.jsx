import {AppBar, Toolbar,styled} from '@mui/material'

const Container = styled(AppBar)`
    background: #060606;
    height: 9vh
`

const Header = () => {
    const logo = '/CodePen.jpeg'
  return (
    <Container>
      <Toolbar>
        <img src={logo} alt="logo" style={{width:50,paddingTop:10}} />
      </Toolbar>
    </Container>
  )
}

export default Header

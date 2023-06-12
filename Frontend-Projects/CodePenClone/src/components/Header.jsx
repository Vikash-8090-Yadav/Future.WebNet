import React from 'react'
import {AppBar, Toolbar,styled} from '@mui/material'

const Container = styled(AppBar)`
    background: #060606;
    height: 9vh
`

const Header = () => {
    const logo = 'https://scontent.fdel25-4.fna.fbcdn.net/v/t39.30808-6/309213762_393363583002370_8900948331416504277_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e3f864&_nc_ohc=PDOzcJ1xjH8AX-QXlh8&_nc_ht=scontent.fdel25-4.fna&oh=00_AfDoEP9bN1MGNGlYib0K7q4Yvg3V0cR2WfkOWDEwbPk9SA&oe=64835D7C'
  return (
    <Container>
      <Toolbar>
        <img src={logo} alt="logo" style={{width:150,paddingTop:10}} />
      </Toolbar>
    </Container>
  )
}

export default Header

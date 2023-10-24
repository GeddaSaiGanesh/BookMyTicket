 import React from 'react'
 import logo from './movielogo.png'
 import './index.css'

 import { styled, alpha } from '@mui/material/styles';
 import SearchIcon from '@mui/icons-material/Search';
 import InputBase from '@mui/material/InputBase';
 import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
 import MenuIcon from '@mui/icons-material/Menu';
 import AccountCircle from '@mui/icons-material/AccountCircle';

 const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


 function Header() {
   return (
     <div className='header-container'>
        <div >
            <img src={logo} alt='applogo' className='app-logo'/>
        </div>
        
        <div className='flex-row-container'>
        <div>

        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </div>
        <div className='flex-row-container dropdown-list'>
          <p>Hydreabad</p>
          <ArrowDropDownIcon />
        </div>
        <div>
          <AccountCircle/>
        </div>
        <div>
        <MenuIcon />
        </div>
        </div>
     </div>
   )
 }
 
 export default Header
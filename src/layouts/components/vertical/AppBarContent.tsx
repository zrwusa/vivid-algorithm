// ** MUI Imports
import Box from '@mui/material/Box'
import {Theme} from '@mui/material/styles'

// import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'

// import InputAdornment from '@mui/material/InputAdornment'
// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'

// import Magnify from 'mdi-material-ui/Magnify'
// ** Type Import
import {Settings} from '../../../context/settingsContext'
import Link from '@mui/material/Link';

// ** Components
// import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
// import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
// import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  // ** Props
  const {hidden, toggleNavVisibility} = props

  // const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const hiddenSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  return (
    <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <Box className="actions-left" sx={{mr: 2, display: 'flex', alignItems: 'center'}}>
        {hidden ? (
          <IconButton
            color="inherit"
            onClick={toggleNavVisibility}
            sx={{ml: -2.75, ...(hiddenSm ? {} : {mr: 3.5})}}
          >
            <Menu/>
          </IconButton>
        ) : null}
        {/*<TextField*/}
        {/*  size='small'*/}
        {/*  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}*/}
        {/*  InputProps={{*/}
        {/*    startAdornment: (*/}
        {/*      <InputAdornment position='start'>*/}
        {/*        <Magnify fontSize='small' />*/}
        {/*      </InputAdornment>*/}
        {/*    )*/}
        {/*  }}*/}
        {/*/>*/}
      </Box>

      <Box className="actions-right" sx={{display: 'flex', alignItems: 'center'}}>
        {hiddenSm ? null : (
          <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': {mr: 4}}}>
            <Link
              target="_blank"
              href="https://github.com/zrwusa/data-structure-typed/blob/main/LICENSE"
            >
              MIT License
            </Link>
            <Link target="_blank" href="https://github.com/zrwusa/data-structure-typed">
              Data Structure Typed
            </Link>
            <Link target="_blank" href="https://github.com/zrwusa/vivid-algorithm">
              Github
            </Link>
            <Link
              target="_blank"
              href="https://data-structure-typed-docs.vercel.app"
            >
              Docs
            </Link>
          </Box>

          // <Box
          //   component='a'
          //   target='_blank'
          //   rel='noreferrer'
          //   sx={{ mr: 4, display: 'flex' }}
          //   href='https://github.com/zrwusa/data-structure-typed'
          // >
          //   <img
          //     height={24}
          //     alt='github stars'
          //     src='https://img.shields.io/github/stars/themeselection/materio-mui-react-nextjs-admin-template-free?style=social'
          //   />
          // </Box>
        )}
        {/*<ModeToggler settings={settings} saveSettings={saveSettings} />*/}
        {/*<NotificationDropdown />*/}
        {/*<UserDropdown />*/}
      </Box>
    </Box>
  )
}

export default AppBarContent

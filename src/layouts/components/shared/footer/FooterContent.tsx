// ** MUI Imports
import Box from '@mui/material/Box';
// import Link from '@mui/material/Link'
import {Theme} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between'}}>
      <Typography sx={{mr: 2}}>
        {`© ${new Date().getFullYear()}, Made `}
        <Box component='span' sx={{color: 'error.main'}}></Box>
        {` by `}
        {/*<Link target='_blank' href='https://themeselection.com/'>*/}
        zrwusa.org
        {/*</Link>*/}
      </Typography>
      {hidden ? null : (
        <></>
        // <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
        //   <Link
        //     target='_blank'
        //     href='https://github.com/zrwusa/data-structure-typed/blob/main/LICENSE'
        //   >
        //     MIT License
        //   </Link>
        //   <Link target='_blank' href='https://github.com/zrwusa/data-structure-typed'>
        //     Data Structure Typed
        //   </Link>
        //   <Link target='_blank' href='https://github.com/zrwusa/vivid-algorithm'>
        //     Github
        //   </Link>
        //   <Link
        //     target='_blank'
        //     href='https://data-structure-typed-docs.vercel.app'
        //   >
        //     Docs
        //   </Link>
        // </Box>
      )}
    </Box>
  );
};

export default FooterContent;

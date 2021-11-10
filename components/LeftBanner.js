import React from 'react';
import Box from '@mui/material/Box';

const LeftBanner = ({title='',showlogin}) => {


    return (
       <Box className='h-screen flex items-start flex-col justify-center'  >
           {
               showlogin ? <>
               <h3 className="text-4xl  font-light pb-2"  >
                    Store Your  <span className='font-normal text-indigo-600'>Mamory</span>
                </h3>
               </> : <>
               <h3 className="text-4xl  font-light pb-2"  >
                    
                    Welcome to  <span className='font-normal text-indigo-600'>{title}</span>
                </h3>
               </>
           }
           
            <p className="text-xl text-gray-600 font-light">
                Save your mamory with different fashion.
            </p>
       </Box>
    );
};

export default LeftBanner;
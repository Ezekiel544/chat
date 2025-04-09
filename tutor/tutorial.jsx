import React from 'react'
import { Fragment } from 'react'
import {createRoot} from 'react-dom/client'
import Headerwork from './head.jsx'
import Contactfile from './contactfile.jsx'

const root = createRoot(document.getElementById('root'))
root.render(
  <Firstwork/>
// {/* <Headerwork/> */}
)
function Firstwork (){
    return(
        <Fragment>
            <Headerwork/>
                 <Myul/>
                 <Contactfile/>
                </Fragment>
                
    )
}


function Myul(){
    return(
        <>
          <ul>
                <li>lets dos this together guys</li>
                <li>lets dos this together guys</li>
                <li>lets dos this together guys</li>
                <li>lets dos this together guys</li>
                <li>lets dos this together guys</li>
            </ul>
        </>
    )
}

import Login from './view/login/login'
import Register from './view/register/register'
import Forget from './view/forget/forget'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function router(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forget' element={<Forget />} />
        </Routes>
        </BrowserRouter>
    )
}
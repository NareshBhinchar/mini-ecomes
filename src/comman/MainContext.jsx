import React, { createContext, useEffect, useState } from 'react'

export let countContext = createContext()

export default function Maincontext({ children }) {

    let [count, setCount] = useState(0)

    let [cart,setCart] = useState(JSON.parse(localStorage.getItem('CART'))?? [])


    useEffect(()=>{
        localStorage.setItem('CART',JSON.stringify(cart))
    },[cart])

    let [remove,setRemove]=useState(false)

    let obj = { count, setCount , cart,setCart ,remove,setRemove}
    

    return (

        <countContext.Provider value={obj}>

            {children}

        </countContext.Provider>
    )
}



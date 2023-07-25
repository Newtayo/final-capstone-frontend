import React from 'react'
import { UseSelector } from 'react-redux/es/hooks/useSelector'

const DeleteLaptop = () => {
    const availableLaptops = useSelector((store) => store.laptops.laptops);
  return (
    <div>DeleteLaptop</div>
  )
}

export default DeleteLaptop
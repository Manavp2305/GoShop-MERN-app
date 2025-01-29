import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {

  const [list,setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success ) {
        setList(response.data.products);
      }
      else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {

      const response = await axios.post(backendUrl + '/api/product/remove',{id} ,{headers: {token}})
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      }
      else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
      fetchList()
  },[])

  return (
    <>
     <p className='mb-2 text-gray-600'>All Product List</p>  
     <div className='flex flex-col gap-2'>
        {/*-------List table title------ */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-200 text-gray-600 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div> 

        {/* ------Product List------- */}
        {
          list.map((item,index)=>(
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-200 text-sm' key={index}>
                <img className='w-12 text-gray-600' src={item.image[0]} alt="" />
                <p className='text-gray-600'>{item.name}</p>
                <p className='text-gray-600'>{item.category}</p>
                <p className='text-gray-600'>{currency}{item.price}</p>
                <p className='text-right md:text-center cursor-pointer text-lg text-red-900 font-semibold' onClick={()=>removeProduct(item._id)}>X</p>
                
            </div>
          ))
        }

     </div> 
    </>
  )
}

export default List

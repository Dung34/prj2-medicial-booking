import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CiEdit } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
const ListEmr = () => {
    const navigate = useNavigate()
    const [emrs, setEmrs] = useState([])
    const apiUrl = import.meta.env.VITE_API_URL
    useEffect(() => {
        const getAllEmr = async () => {
            try {
                const response = await axios.get(`${apiUrl}/emr/`)
                if (response.status == 200) {
                    setEmrs(response.data)
                }
            } catch (error) {

            }
        }
        getAllEmr()
    }, [])
    return (
        <div>
            <div className='p-4'>
                <p className='font-mono'>Danh sách bệnh án</p>

                {emrs && emrs.map((emr, index) => (
                    <div className='border border-gray-500 px-2 py-1 flex flex-row w-fit rounded-md gap-2 items-center' key={emr._id}>

                        <p>Mã số: {emr._id}</p>
                        <CiEdit className='size-4' onClick={(e) => { navigate(`/emr/edit/${emr._id}`) }} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListEmr

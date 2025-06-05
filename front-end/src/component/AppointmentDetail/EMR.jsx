import React from 'react'
import { useNavigate } from 'react-router-dom'
const EMR = (appointment, handleClick) => {
    const navigate = useNavigate()
    return (
        <div>
            {(appointment.isSuccess) ?
                <div>
                    Benh an
                </div>
                :
                <div className='flex items-center justify-center h-[10vh]' >
                    <button className='px-2 py-1 border text-white bg-green-600 rounded-md' onClick={handleClick}>Tạo bệnh án</button>
                </div>}
        </div>
    )
}

export default EMR

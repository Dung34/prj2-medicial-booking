import React, { useState } from 'react'
import { CiUser } from "react-icons/ci";
const DoctorProfileUpload = () => {
    const [image, setImage] = useState(null);
    const handleImageChange = (e) => {
        setImage(null);
        setImage(e.target.files[0]);
    }
    return (
        <div>
            <div>
                <h1>Ảnh hồ sơ </h1>
                <p>Ảnh hồ sơ là ảnh đại diện cho bác sĩ trên trang web</p>
                {image ?
                    <div></div> :
                    <div><CiUser /></div>}
                <div>
                    <p>Chọn file ảnh</p>
                    <input accept='image/*'

                        type="file" name="file" id="file" onChange={handleImageChange} />
                </div>
            </div>
        </div>
    )
}

export default DoctorProfileUpload

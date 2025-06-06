// DateOfBirthPicker.jsx
import React, { useState } from 'react';

const DateOfBirthPicker = ({ value, onChange }) => {
    const [dob, setDob] = useState(value || '');

    const handleChange = (e) => {
        setDob(e.target.value);
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className="flex flex-col gap-1">
            <label className="font-sans text-[16px]">Ngày sinh</label>
            <input
                type="date"
                value={dob}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                max={new Date().toISOString().split('T')[0]} // không cho chọn ngày trong tương lai
            />
        </div>
    );
};

export default DateOfBirthPicker;
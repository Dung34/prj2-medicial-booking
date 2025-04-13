import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const AppointmentSchedule = ({ availbleTime, doctorId }) => {
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/appointment/${doctorId}`, {
            state: {
                date: selectedDate,
                time: selectedSlot
            }
        })
    }
    useEffect(() => {
        const get7DaysWithWeekday = () => {
            const weekDays = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
            const result = [];
            for (let i = 0; i < 7; i++) {
                const date = new Date();
                date.setDate(date.getDate() + i);
                result.push({
                    date: date.toLocaleDateString('vi-VN'),
                    weekday: weekDays[date.getDay()],
                });
            }
            return result;
        };

        const dateList = get7DaysWithWeekday();
        setDates(dateList);
        if (dateList.length > 0) {
            setSelectedDate(dateList[0].date);
        }

        setTimeSlots(availbleTime || []);
        if (availbleTime && availbleTime.length > 0) {
            setSelectedSlot(availbleTime[0]);
        }
    }, [availbleTime]);

    return (
        <div className="mx-auto bg-white rounded-lg space-y-4">
            {/* Nếu chưa có selectedDate thì không render */}
            {!selectedDate ? (
                <p>Đang tải lịch khám...</p>
            ) : (
                <>
                    {/* Chọn ngày khám */}
                    <div className="space-y-2">
                        <label className="text-gray-700 font-medium">Chọn ngày khám</label>
                        <select
                            value={selectedDate}
                            onChange={(e) => {
                                setSelectedDate(e.target.value);
                                setSelectedSlot(null); // reset slot khi đổi ngày
                            }}
                            className="w-full border rounded px-3 py-2"
                        >
                            {dates.map((d, index) => (
                                <option key={`${d.date}-${index}`} value={d.date}>
                                    {d.weekday} - {d.date}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Các khung giờ */}
                    <div>
                        <p className="font-semibold text-blue-700 mb-2">LỊCH KHÁM</p>
                        <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map((slot, index) => (
                                <button
                                    key={slot}
                                    onClick={() => {
                                        setSelectedSlot(slot)
                                    }}
                                    className={`py-2 px-3 text-sm rounded border 
                                ${selectedSlot === slot
                                            ? "bg-blue-100 border-blue-500 text-blue-700 font-semibold"
                                            : "bg-gray-100 hover:bg-gray-200"
                                        }`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            🖱️ Chọn và đặt <span className="text-green-600">(Phí đặt lịch 0đ)</span>
                        </p>
                    </div>

                    {/* Địa chỉ khám */}
                    <div>
                        <h4 className="font-semibold text-gray-700">ĐỊA CHỈ KHÁM</h4>
                        <p className="text-blue-600 font-semibold">Phòng khám Spinetech Clinic</p>
                        <p className="text-gray-600 text-sm">Tòa nhà GP, 257 Giải Phóng, Phương Mai, Đống Đa, Hà Nội</p>
                    </div>

                    {/* Giá khám */}
                    <div>
                        <h4 className="font-semibold text-gray-700">GIÁ KHÁM:</h4>
                        <p className="text-red-500 font-semibold">
                            500.000đ{" "}
                            <a href="#" className="text-blue-600 underline text-sm ml-2">
                                Xem chi tiết
                            </a>
                        </p>
                    </div>
                    <div className='flex justify-center items-center px-8 py-2 shadow-md w-fit hover:bg-green-300 hover:text-white'>
                        <button onClick={handleClick}>Đặt lịch khám</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default AppointmentSchedule

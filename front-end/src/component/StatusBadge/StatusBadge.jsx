import React from 'react'

const StatusBadge = ({ status }) => {
    const statusStyles = {
        pending: "bg-orange-100 text-orange-700",
        confirm: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700",
    };

    return (
        <div>
            <span className={`text-sm px-3 py-1 rounded-full font-medium ${statusStyles[status]}`}>
                {status === "pending" ? "Chờ xác nhận" : status === "confirm" ? "Đã nhận" : "Đã hủy"}
            </span>
        </div>
    )
}

export default StatusBadge

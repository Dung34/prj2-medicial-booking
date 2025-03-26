import React from 'react';

function AppointmentForm() {
    return (
        <div className="flex flex-row justify-center items-center h-screen bg-white">
            <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-2xl ">
                <h2 className="text-2xl font-semibold mb-4">Book an Appointment</h2>
                <p className="text-blue-500 font-bold mb-6">Online, It's Easy.</p>
                <p className="text-gray-600 mb-6">
                    Please fill out the form below and we will set an appointment time for you, or you can just call our HQ and set your time by a call.
                </p>


            </div>
            <div className='w-1/2'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full name</label>
                        <input type="text" className="mt-1 p-2 w-full border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Your phone</label>
                        <input type="tel" className="mt-1 p-2 w-full border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input type="date" className="mt-1 p-2 w-full border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Sickness</label>
                        <input type="text" className="mt-1 p-2 w-full border rounded-md" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Sickness explanation</label>
                        <textarea className="mt-1 p-2 w-full border rounded-md" rows="4"></textarea>
                    </div>
                </div>

                <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
                    Send request
                </button>
            </div>
        </div>
    );
}

export default AppointmentForm;
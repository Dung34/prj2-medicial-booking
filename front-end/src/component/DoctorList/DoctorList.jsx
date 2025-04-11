import React from 'react'
"use client"

import { useState } from "react"
// import Image from "next/image"
import { Clock, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import AppointmentForm from "@/components/appointment-form"
const doctors = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "Cardiologist",
        rating: 4.9,
        reviews: 124,
        location: "New York Medical Center",
        distance: "2.5 miles away",
        availability: ["Today", "Tomorrow"],
        image: "/placeholder.svg?height=200&width=200",
        education: "Harvard Medical School",
        experience: "15 years",
        about:
            "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology and heart failure management.",
    },
    {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "Dermatologist",
        rating: 4.8,
        reviews: 98,
        location: "Downtown Skin Clinic",
        distance: "1.2 miles away",
        availability: ["Tomorrow", "Friday"],
        image: "/placeholder.svg?height=200&width=200",
        education: "Stanford University School of Medicine",
        experience: "10 years",
        about:
            "Dr. Michael Chen is a dermatologist specializing in medical and cosmetic dermatology. He has expertise in treating skin conditions like acne, eczema, and psoriasis.",
    },
    {
        id: 3,
        name: "Dr. Emily Rodriguez",
        specialty: "Pediatrician",
        rating: 4.9,
        reviews: 156,
        location: "Children's Wellness Center",
        distance: "3.0 miles away",
        availability: ["Today", "Thursday", "Friday"],
        image: "/placeholder.svg?height=200&width=200",
        education: "Johns Hopkins University",
        experience: "12 years",
        about:
            "Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing comprehensive care for children from birth through adolescence. She has a special interest in childhood development and preventive care.",
    },
]

const DoctorList = () => {
    const [selectedDoctor, setSelectedDoctor] = useState(null)
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Available Doctors</h2>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                {doctors.map((doctor) => (
                    <div key={doctor.id} className="rounded-lg border bg-white p-6 shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <div className="flex-shrink-0">
                                <Image
                                    src={doctor.image || "/placeholder.svg"}
                                    alt={doctor.name}
                                    width={100}
                                    height={100}
                                    className="rounded-full object-cover"
                                />
                            </div>

                            <div className="flex-1 space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">{doctor.name}</h3>
                                    <p className="text-gray-600">{doctor.specialty}</p>

                                    <div className="mt-1 flex items-center">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                                        <span className="ml-1 text-sm text-gray-500">({doctor.reviews} reviews)</span>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="mr-2 h-4 w-4" />
                                        <span>{doctor.location}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Clock className="mr-2 h-4 w-4" />
                                        <span>Available: {doctor.availability.join(", ")}</span>
                                    </div>
                                </div>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="w-full sm:w-auto" onClick={() => setSelectedDoctor(doctor)}>
                                            Book Appointment
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px]">
                                        <DialogHeader>
                                            <DialogTitle>Book an Appointment</DialogTitle>
                                        </DialogHeader>
                                        <div className="flex items-center gap-4 py-4">
                                            <Image
                                                src={doctor.image || "/placeholder.svg"}
                                                alt={doctor.name}
                                                width={60}
                                                height={60}
                                                className="rounded-full object-cover"
                                            />
                                            <div>
                                                <h3 className="font-medium">{doctor.name}</h3>
                                                <p className="text-sm text-gray-600">{doctor.specialty}</p>
                                            </div>
                                        </div>
                                        <AppointmentForm doctor={doctor} />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DoctorList

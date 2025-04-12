import React from 'react'
import { Search } from "lucide-react"
// import DoctorList from "@/components/doctor-list"
// import SearchFilters from "@/components/search-filters"
// import DoctorList from '../../component/DoctorList/DoctorList'
import SearchFilters from '../../component/SearchFilters/SearchFilters'
const DoctorSelection = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-2xl font-bold text-gray-900">Find a Doctor</h1>
                    <p className="mt-1 text-gray-600">Select a specialist and book your appointment</p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="grid gap-8 md:grid-cols-[300px_1fr]">
                    <aside className="space-y-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <input
                                type="search"
                                placeholder="Search doctors..."
                                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm placeholder:text-gray-500 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                            />
                        </div>
                        <SearchFilters />
                    </aside>

                    <div className="space-y-6">
                        {/* <DoctorList /> */}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DoctorSelection

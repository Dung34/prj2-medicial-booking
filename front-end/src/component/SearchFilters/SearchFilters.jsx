import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const specialties = [
    "Cardiology",
    "Dermatology",
    "Pediatrics",
    "Neurology",
    "Orthopedics",
    "Gynecology",
    "Ophthalmology",
    "Psychiatry",
    "Urology",
    "Oncology",
]

const availabilities = ["Today", "Tomorrow", "This Week", "Next Week", "Morning", "Afternoon", "Evening"]

const insurances = ["Aetna", "Blue Cross", "Cigna", "Humana", "Medicare", "UnitedHealthcare"]

function FilterSection({ title, items, selectedItems, onToggle }) {
    return (
        <Collapsible defaultOpen className="border-b pb-4">
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-left font-medium">
                {title}
                <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
                <div className="space-y-2">
                    {items.map((item) => (
                        <label
                            key={item}
                            className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-gray-100"
                        >
                            <div className="flex h-4 w-4 items-center justify-center rounded border border-gray-300 bg-white">
                                {selectedItems.includes(item) && <Check className="h-3 w-3 text-gray-900" />}
                            </div>
                            <span className="text-sm">{item}</span>
                        </label>
                    ))}
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}


const SearchFilters = () => {
    const [selectedSpecialties, setSelectedSpecialties] = useState([])
    const [selectedAvailabilities, setSelectedAvailabilities] = useState([])
    const [selectedInsurances, setSelectedInsurances] = useState([])

    const toggleSelection = (item, selectedItems, setSelectedItems) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((i) => i !== item))
        } else {
            setSelectedItems([...selectedItems, item])
        }
    }

    return (
        <div className="space-y-6">
            <FilterSection
                title="Specialty"
                items={specialties}
                selectedItems={selectedSpecialties}
                onToggle={(item) => toggleSelection(item, selectedSpecialties, setSelectedSpecialties)}
            />

            <FilterSection
                title="Availability"
                items={availabilities}
                selectedItems={selectedAvailabilities}
                onToggle={(item) => toggleSelection(item, selectedAvailabilities, setSelectedAvailabilities)}
            />

            <FilterSection
                title="Insurance"
                items={insurances}
                selectedItems={selectedInsurances}
                onToggle={(item) => toggleSelection(item, selectedInsurances, setSelectedInsurances)}
            />

            <Button className="w-full" variant="outline">
                Reset Filters
            </Button>
        </div>
    )
}


export default SearchFilters

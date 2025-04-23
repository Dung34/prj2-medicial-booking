"use client"

import { useState } from "react"
import { AlertCircle, Check, Upload, X } from "lucide-react"

// Note: In a real project, you would import these components from your UI library
// This example assumes shadcn/ui style components are available in your project
const Button = ({ children, variant = "default", type = "button", disabled, onClick, className = "" }) => (
    <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
      disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4
      ${variant === "default" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
      ${variant === "outline" ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground" : ""}
      ${variant === "destructive" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}
      ${className}`}
    >
        {children}
    </button>
)

const Input = ({ label, id, type = "text", placeholder, value, onChange, error, required }) => (
    <div className="grid gap-1.5">
        <label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
            {label} {required && <span className="text-destructive">*</span>}
        </label>
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
        file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
        disabled:cursor-not-allowed disabled:opacity-50
        ${error ? "border-destructive ring-destructive" : ""}`}
        />
        {error && (
            <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {error}
            </p>
        )}
    </div>
)

const Select = ({ label, id, options, value, onChange, error, required }) => (
    <div className="grid gap-1.5">
        <label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
            {label} {required && <span className="text-destructive">*</span>}
        </label>
        <select
            id={id}
            value={value}
            onChange={onChange}
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
        disabled:cursor-not-allowed disabled:opacity-50
        ${error ? "border-destructive ring-destructive" : ""}`}
        >
            <option value="">Select {label}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        {error && (
            <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {error}
            </p>
        )}
    </div>
)

const Textarea = ({ label, id, placeholder, value, onChange, error, required }) => (
    <div className="grid gap-1.5">
        <label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
            {label} {required && <span className="text-destructive">*</span>}
        </label>
        <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
        placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50
        ${error ? "border-destructive ring-destructive" : ""}`}
        />
        {error && (
            <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {error}
            </p>
        )}
    </div>
)

const FileUpload = ({ label, id, onChange, error, fileName, required, onRemove }) => (
    <div className="grid gap-1.5">
        <label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
            {label} {required && <span className="text-destructive">*</span>}
        </label>
        {!fileName ? (
            <div className="flex items-center justify-center w-full">
                <label
                    htmlFor={id}
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-accent/50"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">PDF, DOC, or image files (MAX. 10MB)</p>
                    </div>
                    <input id={id} type="file" className="hidden" onChange={onChange} />
                </label>
            </div>
        ) : (
            <div className="flex items-center p-2 border rounded-md bg-muted/50">
                <div className="flex-1 truncate">{fileName}</div>
                <Button variant="outline" onClick={onRemove} className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                </Button>
            </div>
        )}
        {error && (
            <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {error}
            </p>
        )}
    </div>
)

const Card = ({ children, className = "" }) => (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>{children}</div>
)

const CardHeader = ({ children }) => <div className="flex flex-col space-y-1.5 p-6">{children}</div>

const CardTitle = ({ children }) => <h3 className="text-2xl font-semibold leading-none tracking-tight">{children}</h3>

const CardDescription = ({ children }) => <p className="text-sm text-muted-foreground">{children}</p>

const CardContent = ({ children }) => <div className="p-6 pt-0">{children}</div>

const CardFooter = ({ children }) => <div className="flex items-center p-6 pt-0">{children}</div>

const Alert = ({ children, variant = "default", icon }) => (
    <div
        className={`relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11
    ${variant === "success" ? "bg-green-50 text-green-800 border-green-200" : ""}
    ${variant === "error" ? "bg-destructive/15 text-destructive border-destructive/20" : ""}
  `}
    >
        {icon}
        <div>{children}</div>
    </div>
)

const RegisterDoctorForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        specialty: "",
        licenseNumber: "",
        experience: "",
        availability: "",
        bio: "",
    })

    const [files, setFiles] = useState({
        resume: null,
        license: null,
        photo: null,
    })

    const [fileNames, setFileNames] = useState({
        resume: "",
        license: "",
        photo: "",
    })

    const [errors, setErrors] = useState({})
    const [submitStatus, setSubmitStatus] = useState(null) // null, 'success', 'error'

    const specialtyOptions = [
        { value: "cardiology", label: "Cardiology" },
        { value: "dermatology", label: "Dermatology" },
        { value: "endocrinology", label: "Endocrinology" },
        { value: "gastroenterology", label: "Gastroenterology" },
        { value: "neurology", label: "Neurology" },
        { value: "obstetrics", label: "Obstetrics & Gynecology" },
        { value: "oncology", label: "Oncology" },
        { value: "ophthalmology", label: "Ophthalmology" },
        { value: "orthopedics", label: "Orthopedics" },
        { value: "pediatrics", label: "Pediatrics" },
        { value: "psychiatry", label: "Psychiatry" },
        { value: "radiology", label: "Radiology" },
        { value: "urology", label: "Urology" },
    ]

    const experienceOptions = [
        { value: "0-2", label: "0-2 years" },
        { value: "3-5", label: "3-5 years" },
        { value: "6-10", label: "6-10 years" },
        { value: "10+", label: "10+ years" },
    ]

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }))

        // Clear error when user types
        if (errors[id]) {
            setErrors((prev) => ({
                ...prev,
                [id]: null,
            }))
        }
    }

    const handleFileChange = (e, fileType) => {
        const file = e.target.files[0]
        if (file) {
            // Check file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                setErrors((prev) => ({
                    ...prev,
                    [fileType]: "File size exceeds 10MB limit",
                }))
                return
            }

            setFiles((prev) => ({
                ...prev,
                [fileType]: file,
            }))

            setFileNames((prev) => ({
                ...prev,
                [fileType]: file.name,
            }))

            // Clear error when user uploads a file
            if (errors[fileType]) {
                setErrors((prev) => ({
                    ...prev,
                    [fileType]: null,
                }))
            }
        }
    }

    const handleRemoveFile = (fileType) => {
        setFiles((prev) => ({
            ...prev,
            [fileType]: null,
        }))

        setFileNames((prev) => ({
            ...prev,
            [fileType]: "",
        }))
    }

    const validateForm = () => {
        const newErrors = {}

        // Required fields validation
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }

        // Phone validation
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required"
        } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
            newErrors.phone = "Phone number is invalid"
        }

        // Other required fields
        if (!formData.specialty) newErrors.specialty = "Specialty is required"
        if (!formData.licenseNumber.trim()) newErrors.licenseNumber = "License number is required"
        if (!formData.experience) newErrors.experience = "Experience is required"

        // Required files
        if (!files.license) newErrors.license = "License document is required"
        if (!files.resume) newErrors.resume = "Resume is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitStatus(null)

        if (validateForm()) {
            // In a real application, you would send the data to your backend here
            console.log("Form Data:", formData)
            console.log("Files:", files)

            // Simulate API call
            setTimeout(() => {
                setSubmitStatus("success")

                // Reset form after successful submission
                setTimeout(() => {
                    setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        specialty: "",
                        licenseNumber: "",
                        experience: "",
                        availability: "",
                        bio: "",
                    })

                    setFiles({
                        resume: null,
                        license: null,
                        photo: null,
                    })

                    setFileNames({
                        resume: "",
                        license: "",
                        photo: "",
                    })

                    setSubmitStatus(null)
                }, 3000)
            }, 1500)
        } else {
            setSubmitStatus("error")
        }
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Register New Doctor</CardTitle>
                <CardDescription>Add a new doctor to the medical appointment system</CardDescription>
            </CardHeader>
            <CardContent>
                {submitStatus === "success" && (
                    <Alert variant="success" icon={<Check className="h-4 w-4 stroke-green-600" />}>
                        <h5 className="mb-1 font-medium leading-none tracking-tight">Registration Successful</h5>
                        <div className="text-sm">The doctor has been successfully registered in the system.</div>
                    </Alert>
                )}

                {submitStatus === "error" && (
                    <Alert variant="error" icon={<AlertCircle className="h-4 w-4 stroke-destructive" />}>
                        <h5 className="mb-1 font-medium leading-none tracking-tight">Registration Failed</h5>
                        <div className="text-sm">Please check the form for errors and try again.</div>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="First Name"
                            id="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Enter first name"
                            error={errors.firstName}
                            required
                        />

                        <Input
                            label="Last Name"
                            id="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Enter last name"
                            error={errors.lastName}
                            required
                        />

                        <Input
                            label="Email"
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="doctor@example.com"
                            error={errors.email}
                            required
                        />

                        <Input
                            label="Phone Number"
                            id="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+1 (555) 123-4567"
                            error={errors.phone}
                            required
                        />

                        <Select
                            label="Specialty"
                            id="specialty"
                            options={specialtyOptions}
                            value={formData.specialty}
                            onChange={handleInputChange}
                            error={errors.specialty}
                            required
                        />

                        <Input
                            label="License Number"
                            id="licenseNumber"
                            value={formData.licenseNumber}
                            onChange={handleInputChange}
                            placeholder="Enter medical license number"
                            error={errors.licenseNumber}
                            required
                        />

                        <Select
                            label="Experience"
                            id="experience"
                            options={experienceOptions}
                            value={formData.experience}
                            onChange={handleInputChange}
                            error={errors.experience}
                            required
                        />

                        <Input
                            label="Availability"
                            id="availability"
                            value={formData.availability}
                            onChange={handleInputChange}
                            placeholder="e.g., Mon-Fri, 9AM-5PM"
                            error={errors.availability}
                        />
                    </div>

                    <Textarea
                        label="Professional Bio"
                        id="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Enter a brief professional biography"
                        error={errors.bio}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FileUpload
                            label="Resume/CV"
                            id="resume"
                            onChange={(e) => handleFileChange(e, "resume")}
                            fileName={fileNames.resume}
                            error={errors.resume}
                            required
                            onRemove={() => handleRemoveFile("resume")}
                        />

                        <FileUpload
                            label="Medical License"
                            id="license"
                            onChange={(e) => handleFileChange(e, "license")}
                            fileName={fileNames.license}
                            error={errors.license}
                            required
                            onRemove={() => handleRemoveFile("license")}
                        />

                        <FileUpload
                            label="Profile Photo"
                            id="photo"
                            onChange={(e) => handleFileChange(e, "photo")}
                            fileName={fileNames.photo}
                            error={errors.photo}
                            onRemove={() => handleRemoveFile("photo")}
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button variant="outline" type="button">
                            Cancel
                        </Button>
                        <Button type="submit">Register Doctor</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default RegisterDoctorForm

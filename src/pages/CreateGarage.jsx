// src/pages/CreateGarage.jsx
import { useForm } from "react-hook-form";
import "../CSS/Create-Garage.css";

function CreateGarage() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            name: "",
            description: "",
            imageUrl: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            country: "",
            postalCode: "",
            garageType: "BIKE",
            openingTime: "09:00",
            closingTime: "18:00",
            gstNumber: "",
            latitude: "",
            longitude: "",
            licenseDocumentUrl: "",
            gstCertificateUrl: "",
            ownerIdProofUrl: "",
            garagePhotoUrl: "",
            additionalDocUrl: ""
        }
    });

    const onSubmit = (data) => {
        const payload = {
            ...data,
            latitude: data.latitude ? Number(data.latitude) : 0,
            longitude: data.longitude ? Number(data.longitude) : 0
        };

        // For now: just log; later you will call your API here
        console.log("Garage payload for /api/v1/garages/owner:", payload);

        // TODO: replace with axios/fetch POST when backend is ready:
        // await axios.post("/api/v1/garages/owner", payload);

        reset();
    };

    return (
        <div className="page create-garage-page">
            <div className="page-header-bar">
                <h1 className="page-title">Create Garage</h1>
                <p className="page-subtitle">
                    Enter all details to register a new garage in the system.
                </p>
            </div>

            <form
                className="garage-form card"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                {/* BASIC DETAILS */}
                <section className="form-section">
                    <h2 className="section-heading">Basic details</h2>
                    <div className="form-grid-2">
                        <div className="form-field">
                            <label htmlFor="name">
                                Garage name <span className="required">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && (
                                <p className="field-error">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="form-field">
                            <label htmlFor="garageType">
                                Garage type <span className="required">*</span>
                            </label>
                            <select
                                id="garageType"
                                {...register("garageType", { required: true })}
                            >
                                <option value="BIKE">Bike</option>
                                <option value="CAR">Car</option>
                                <option value="BOTH">Both</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-grid-1">
                        <div className="form-field">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                rows={3}
                                {...register("description")}
                            />
                        </div>
                    </div>

                    <div className="form-grid-2">
                        <div className="form-field">
                            <label htmlFor="imageUrl">Cover image URL</label>
                            <input
                                id="imageUrl"
                                type="url"
                                placeholder="https://..."
                                {...register("imageUrl")}
                            />
                        </div>
                    </div>
                </section>

                {/* ADDRESS */}
                <section className="form-section">
                    <h2 className="section-heading">Address</h2>

                    <div className="form-grid-2">
                        <div className="form-field">
                            <label htmlFor="addressLine1">
                                Address line 1 <span className="required">*</span>
                            </label>
                            <input
                                id="addressLine1"
                                type="text"
                                {...register("addressLine1", {
                                    required: "Address line 1 is required"
                                })}
                            />
                            {errors.addressLine1 && (
                                <p className="field-error">{errors.addressLine1.message}</p>
                            )}
                        </div>

                        <div className="form-field">
                            <label htmlFor="addressLine2">Address line 2</label>
                            <input
                                id="addressLine2"
                                type="text"
                                {...register("addressLine2")}
                            />
                        </div>
                    </div>

                    <div className="form-grid-3">
                        <div className="form-field">
                            <label htmlFor="city">
                                City <span className="required">*</span>
                            </label>
                            <input
                                id="city"
                                type="text"
                                {...register("city", { required: "City is required" })}
                            />
                            {errors.city && (
                                <p className="field-error">{errors.city.message}</p>
                            )}
                        </div>

                        <div className="form-field">
                            <label htmlFor="state">
                                State <span className="required">*</span>
                            </label>
                            <input
                                id="state"
                                type="text"
                                {...register("state", { required: "State is required" })}
                            />
                            {errors.state && (
                                <p className="field-error">{errors.state.message}</p>
                            )}
                        </div>

                        <div className="form-field">
                            <label htmlFor="country">
                                Country <span className="required">*</span>
                            </label>
                            <input
                                id="country"
                                type="text"
                                {...register("country", { required: "Country is required" })}
                            />
                            {errors.country && (
                                <p className="field-error">{errors.country.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="form-grid-2">
                        <div className="form-field">
                            <label htmlFor="postalCode">
                                Postal code <span className="required">*</span>
                            </label>
                            <input
                                id="postalCode"
                                type="text"
                                {...register("postalCode", {
                                    required: "Postal code is required"
                                })}
                            />
                            {errors.postalCode && (
                                <p className="field-error">{errors.postalCode.message}</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* TIMINGS */}
                <section className="form-section">
                    <h2 className="section-heading">Timings</h2>
                    <div className="form-grid-2">
                        <div className="form-field">
                            <label htmlFor="openingTime">
                                Opening time <span className="required">*</span>
                            </label>
                            <input
                                id="openingTime"
                                type="time"
                                {...register("openingTime", { required: true })}
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="closingTime">
                                Closing time <span className="required">*</span>
                            </label>
                            <input
                                id="closingTime"
                                type="time"
                                {...register("closingTime", { required: true })}
                            />
                        </div>
                    </div>
                </section>

                {/* GST & LOCATION */}
                <section className="form-section">
                    <h2 className="section-heading">GST & location</h2>

                    <div className="form-grid-3">
                        <div className="form-field">
                            <label htmlFor="gstNumber">GST number</label>
                            <input id="gstNumber" type="text" {...register("gstNumber")} />
                        </div>

                        <div className="form-field">
                            <label htmlFor="latitude">Latitude</label>
                            <input
                                id="latitude"
                                type="number"
                                step="0.000001"
                                {...register("latitude")}
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="longitude">Longitude</label>
                            <input
                                id="longitude"
                                type="number"
                                step="0.000001"
                                {...register("longitude")}
                            />
                        </div>
                    </div>
                </section>

                {/* DOCUMENTS */}
                <section className="form-section">
                    <h2 className="section-heading">Documents</h2>

                    <div className="form-grid-2">
                        <div className="form-field">
                            <label htmlFor="licenseDocumentUrl">License document URL</label>
                            <input
                                id="licenseDocumentUrl"
                                type="url"
                                placeholder="https://..."
                                {...register("licenseDocumentUrl")}
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="gstCertificateUrl">GST certificate URL</label>
                            <input
                                id="gstCertificateUrl"
                                type="url"
                                placeholder="https://..."
                                {...register("gstCertificateUrl")}
                            />
                        </div>
                    </div>

                    <div className="form-grid-2">
                        <div className="form-field">
                            <label htmlFor="ownerIdProofUrl">Owner ID proof URL</label>
                            <input
                                id="ownerIdProofUrl"
                                type="url"
                                placeholder="https://..."
                                {...register("ownerIdProofUrl")}
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="garagePhotoUrl">Garage photo URL</label>
                            <input
                                id="garagePhotoUrl"
                                type="url"
                                placeholder="https://..."
                                {...register("garagePhotoUrl")}
                            />
                        </div>
                    </div>

                    <div className="form-grid-1">
                        <div className="form-field">
                            <label htmlFor="additionalDocUrl">Additional document URL</label>
                            <input
                                id="additionalDocUrl"
                                type="url"
                                placeholder="https://..."
                                {...register("additionalDocUrl")}
                            />
                        </div>
                    </div>
                </section>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => reset()}
                        disabled={isSubmitting}
                    >
                        Reset
                    </button>
                    <button type="submit" className="btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Create garage"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateGarage;

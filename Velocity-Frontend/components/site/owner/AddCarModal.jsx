import { useState } from "react";
import axios from "axios";

import {
  Car,
  X,
  Plus,
  MapPin,
  Upload,
  Fuel,
  Gauge,
  Factory,
  CarFront,
  Shapes,
  Armchair,
} from "lucide-react";

function AddCarModal({ onClose, onAdd }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    type: "Sedan",
    seats: "4",
    year: "",
    pricePerDay: "",
    location: "",
    fuel: "Petrol",
    transmission: "Automatic",
    image: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    setFormData((prev) => ({
      ...prev,
      image: file || null,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.brand.trim()) {
      newErrors.brand = "Brand name is required";
    }

    if (!formData.model.trim()) {
      newErrors.model = "Car model is required";
    }
    if (!formData.type.trim()) {
      newErrors.type = "Car type is required";
    }
    if (!formData.seats.trim()) {
      newErrors.seats = "seats is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.pricePerDay) {
      newErrors.pricePerDay = "Price is required";
    } else if (Number(formData.pricePerDay) <= 0) {
      newErrors.pricePerDay = "Enter a valid price";
    }

    if (!formData.year) {
      newErrors.year = "Year is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!formData.image) {
      alert("Please select a car image");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("brand", formData.brand);
      data.append("model", formData.model);
      data.append("type", formData.type);
      data.append("seats", formData.seats);
      data.append("year", formData.year);
      data.append("pricePerDay", formData.pricePerDay);
      data.append("location", formData.location);
      data.append("fuel", formData.fuel);
      data.append("transmission", formData.transmission);

      data.append("image", formData.image);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cars`,
        data,
        {
          withCredentials: true,
        },
      );

      console.log("Car added:", response.data);

      // IMPORTANT:
      // Send newly created car to OwnerDashboard
      onAdd(response.data.car);

      alert("Car added successfully!");
    } catch (error) {
      console.error("Add car error:", error);

      alert(error.response?.data?.msg || "Failed to add car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/50 p-4
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          max-h-[90vh] w-full max-w-2xl
          overflow-y-auto
          rounded-2xl bg-white
          shadow-2xl
        "
      >
        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-slate-200 p-5 sm:p-6">
          <div>
            <h2 className="text-xl font-bold">Add New Car</h2>

            <p className="mt-1 text-sm text-slate-500">
              Add your vehicle details to list it on Velocity.
            </p>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="
              rounded-lg p-2
              text-slate-400
              hover:bg-slate-100
              hover:text-slate-700
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          {/* BRAND */}

          <div>
            <label className="mb-2 block text-sm font-semibold">Brand</label>

            <div className="relative">
              <Factory className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g. Toyota"
                className={`
                  h-11 w-full rounded-lg
                  border bg-slate-50
                  pl-10 pr-3 text-sm
                  outline-none
                  focus:bg-white
                  focus:ring-2

                  ${
                    errors.brand
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                  }
                `}
              />
            </div>

            {errors.brand && (
              <p className="mt-1 text-xs text-red-500">{errors.brand}</p>
            )}
          </div>

          {/* MODEL */}

          <div>
            <label className="mb-2 block text-sm font-semibold">Model</label>

            <div className="relative">
              <CarFront className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g. Fortuner"
                className={`
                  h-11 w-full rounded-lg
                  border bg-slate-50
                  pl-10 pr-3 text-sm
                  outline-none
                  focus:bg-white
                  focus:ring-2

                  ${
                    errors.model
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                  }
                `}
              />
            </div>

            {errors.model && (
              <p className="mt-1 text-xs text-red-500">{errors.model}</p>
            )}
          </div>

          {/* TYPE + SEATS */}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Car Type
              </label>

              <div className="relative">
                <Shapes className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="
                    h-11 w-full
                    appearance-none
                    rounded-lg
                    border border-slate-200
                    bg-slate-50
                    pl-10 pr-3
                    text-sm
                    outline-none
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-2
                    focus:ring-blue-100
                  "
                >
                  <option value="Sedan">Sedan</option>

                  <option value="SUV">SUV</option>

                  <option value="Luxury">Luxury</option>

                  <option value="Electric">Electric</option>

                  <option value="Convertible">Convertible</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Seats
              </label>

              <div className="relative">
                <Armchair className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <select
                  name="seats"
                  value={formData.seats}
                  onChange={handleChange}
                  className="
                    h-11 w-full
                    appearance-none
                    rounded-lg
                    border border-slate-200
                    bg-slate-50
                    pl-10 pr-3
                    text-sm
                    outline-none
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-2
                    focus:ring-blue-100
                  "
                >
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                  <option value="5">5</option>
                  <option value="7">7</option>
                </select>
              </div>
            </div>
          </div>
         
          {/* LOCATION */}

          <div>
            <label className="mb-2 block text-sm font-semibold">Location</label>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Mumbai"
                className={`
                  h-11 w-full rounded-lg
                  border bg-slate-50
                  pl-10 pr-3 text-sm
                  outline-none
                  focus:bg-white
                  focus:ring-2

                  ${
                    errors.location
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                  }
                `}
              />
            </div>

            {errors.location && (
              <p className="mt-1 text-xs text-red-500">{errors.location}</p>
            )}
          </div>

          {/* PRICE + YEAR */}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Price per Day
              </label>

              <input
                name="pricePerDay"
                type="number"
                min="1"
                value={formData.pricePerDay}
                onChange={handleChange}
                placeholder="e.g. 3000"
                className={`
                  h-11 w-full rounded-lg
                  border bg-slate-50
                  px-3 text-sm
                  outline-none
                  focus:bg-white
                  focus:ring-2

                  ${
                    errors.pricePerDay
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                  }
                `}
              />

              {errors.pricePerDay && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.pricePerDay}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Manufacturing Year
              </label>

              <input
                name="year"
                type="number"
                min="1990"
                max="2030"
                value={formData.year}
                onChange={handleChange}
                placeholder="e.g. 2024"
                className={`
                  h-11 w-full rounded-lg
                  border bg-slate-50
                  px-3 text-sm
                  outline-none
                  focus:bg-white
                  focus:ring-2

                  ${
                    errors.year
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                  }
                `}
              />

              {errors.year && (
                <p className="mt-1 text-xs text-red-500">{errors.year}</p>
              )}
            </div>
          </div>

          {/* FUEL + TRANSMISSION */}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Fuel Type
              </label>

              <div className="relative">
                <Fuel className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <select
                  name="fuel"
                  value={formData.fuel}
                  onChange={handleChange}
                  className="
                    h-11 w-full
                    appearance-none
                    rounded-lg
                    border border-slate-200
                    bg-slate-50
                    pl-10 pr-3
                    text-sm
                    outline-none
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-2
                    focus:ring-blue-100
                  "
                >
                  <option value="Petrol">Petrol</option>

                  <option value="Diesel">Diesel</option>

                  <option value="CNG">CNG</option>

                  <option value="Electric">Electric</option>

                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Transmission
              </label>

              <div className="relative">
                <Gauge className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  className="
                    h-11 w-full
                    appearance-none
                    rounded-lg
                    border border-slate-200
                    bg-slate-50
                    pl-10 pr-3
                    text-sm
                    outline-none
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-2
                    focus:ring-blue-100
                  "
                >
                  <option value="Automatic">Automatic</option>

                  <option value="Manual">Manual</option>
                </select>
              </div>
            </div>
          </div>

          {/* IMAGE */}

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Car Image
            </label>

            <div
              className="
                flex cursor-pointer
                flex-col items-center
                justify-center
                rounded-xl
                border-2 border-dashed
                border-slate-200
                bg-slate-50
                p-8
                text-center
                transition
                hover:border-blue-300
                hover:bg-blue-50/30
              "
            >
              <Upload className="h-8 w-8 text-slate-300" />

              <p className="mt-3 text-sm font-medium text-slate-600">
                {formData.image ? formData.image.name : "Upload car image"}
              </p>

              <p className="mt-1 text-xs text-slate-400">JPG, PNG up to 5MB</p>

              <label
                htmlFor="car-image"
                className="
                  mt-4 cursor-pointer
                  rounded-lg bg-blue-600
                  px-4 py-2
                  text-xs font-semibold
                  text-white
                  hover:bg-blue-700
                "
              >
                Select Car Image
              </label>

              <input
                id="car-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* BUTTONS */}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                rounded-xl
                border border-slate-200
                px-5 py-3
                text-sm font-semibold
                text-slate-600
                hover:bg-slate-50
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                flex items-center
                justify-center gap-2
                rounded-xl
                bg-blue-600
                px-5 py-3
                text-sm font-semibold
                text-white
                shadow-lg
                shadow-blue-600/20
                hover:bg-blue-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <Plus className="h-4 w-4" />

              {loading ? "Adding..." : "Add Car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCarModal;

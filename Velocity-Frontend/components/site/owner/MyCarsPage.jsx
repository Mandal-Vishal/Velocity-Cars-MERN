import {
  Car,
  Plus,
  MapPin,
  Trash2,
  Edit,
} from "lucide-react";

import PageHeader from "./common/PageHeader";
import axios from "axios";

function MyCars({
  cars,
  carsLoading,
  onAddCar,
  onDeleteCar,
}) {

  const deleteCar = async (carId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this car?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/cars/${carId}`,
        {
          withCredentials: true,
        }
      );

      // Tell OwnerDashboard to remove it
      onDeleteCar(carId);

      alert("Car deleted successfully");

    } catch (error) {
      console.error(
        "Delete car error:",
        error
      );

      alert(
        error.response?.data?.msg ||
          "Failed to delete car"
      );
    }
  };

  return (
    <>
      <PageHeader
        title="My Cars"
        description="Manage all vehicles listed on Velocity."
        button="Add New Car"
        onButtonClick={onAddCar}
      />

      {/* LOADING */}

      {carsLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">

          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading your cars...
          </p>

        </div>
      ) : cars.length === 0 ? (

        /* NO CARS */

        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

          <Car className="mx-auto h-12 w-12 text-slate-300" />

          <h3 className="mt-4 text-lg font-semibold">
            No cars listed yet
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Add your first car to start renting it out.
          </p>

          <button
            onClick={onAddCar}
            className="
              mt-5 inline-flex
              items-center gap-2
              rounded-xl
              bg-blue-600
              px-5 py-3
              text-sm font-semibold
              text-white
              hover:bg-blue-700
            "
          >
            <Plus className="h-4 w-4" />

            Add New Car
          </button>

        </div>

      ) : (

        /* CAR LIST */

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {cars.map((car) => (

            <div
              key={car._id}
              className="
                overflow-hidden
                rounded-2xl
                border border-slate-200
                bg-white
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-md
              "
            >

              {/* IMAGE */}

              <div className="relative flex h-50 items-center justify-center">

                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="h-full w-full object-cover"
                />

              </div>

              {/* DETAILS */}

              <div className="p-5">

                <div className="flex items-start justify-between">

                  <div>

                    <h3 className="font-bold">
                      {car.brand} {car.model}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {car.transmission} • {car.fuel}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {car.year}
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">

                      <MapPin className="h-3 w-3" />

                      {car.location}

                    </p>

                  </div>

                </div>

                {/* PRICE + ACTIONS */}

                <div className="mt-5 flex items-center justify-between">

                  <p className="font-bold">

                    ₹
                    {Number(
                      car.pricePerDay
                    ).toLocaleString("en-IN")}

                    <span className="text-xs font-normal text-slate-400">
                      /day
                    </span>

                  </p>

                  <div className="flex gap-2">

                    {/* EDIT */}

                    <button
                      className="
                        rounded-lg
                        border
                        p-2
                        text-slate-500
                        hover:bg-slate-50
                      "
                      title="Edit car"
                    >
                      <Edit className="h-4 w-4" />
                    </button>

                    {/* DELETE */}

                    <button
                      onClick={() =>
                        deleteCar(car._id)
                      }
                      className="
                        rounded-lg
                        border
                        border-red-100
                        p-2
                        text-red-500
                        hover:bg-red-50
                      "
                      title="Delete car"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}
    </>
  );
}

export default MyCars;
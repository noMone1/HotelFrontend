import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";

export default function AddProduct({
  addProductModalSetting,
  handlePageUpdate,
}) {
  const authContext = useContext(AuthContext);
  const [product, setProduct] = useState({
    userId: authContext.user,
    name: "",
    manufacturer: "",
    description: "",
  });
  console.log("----", product)
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const handleImageUpload = (data) => {
    
  };

  const addProduct = () => {
    fetch("http://localhost:4000/api/product/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((result) => {
        alert("Product ADDED");
        handlePageUpdate();
        addProductModalSetting();
      })
      .catch((err) => console.log(err));
  };

  return (
    // Modal
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="bg-white px-4 py-5 sm:p-6 sm:pb-4">
            <Dialog.Title className="text-lg font-semibold leading-6 text-gray-900 flex justify-between">
              Add Room
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setOpen(false)}
              >
                {/* You can use an X icon or any other close icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </Dialog.Title>
            <div className="mt-5">
              <form>
                {/* Room Name */}
                <div className="mb-4">
                  <label
                    htmlFor="roomName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Room Number
                  </label>
                  <input
                    type="text"
                    id="roomName"
                    name="roomName"
                    className="mt-1 p-2 w-full border rounded-md"
                    placeholder="Enter room number"
                  // Add value and onChange handlers as needed
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    className="mt-1 p-2 w-full border rounded-md"
                  // Add value and onChange handlers as needed
                  >
                    <option value="Deluxe">Delixe</option>
                    <option value="Standerd">Standerd</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="Price"
                    name="price"
                    className="mt-1 p-2 w-full border rounded-md"
                    placeholder="Enter price"
                  // Add value and onChange handlers as needed
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="mt-1 p-2 w-full border rounded-md"
                  // Add value and onChange handlers as needed
                  >
                    <option value="Active">Active</option>
                    <option value="Booked">Booked</option>
                    <option value="InService">In-Service</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="mt-1 p-2 w-full border rounded-md"
                    placeholder="Enter room description"
                    rows="3"
                  // Add value and onChange handlers as needed
                  />
                </div>
                <div className="mb-4">
    <label htmlFor="images" className="block text-sm font-medium text-gray-700">
      Images
    </label>
    <input
      type="file"
      id="images"
      name="images"
      className="mt-1 p-2 w-full border rounded-md"
      accept="image/*"
      multiple
      onChange={(e) => handleImageUpload(e.target.files)}
    />
  </div>

                {/* Add any other input boxes as needed */}

                {/* Add Room Button */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={addProduct}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none"
                  >
                    Add Room
                  </button>
                  <button
                    type="button"
                    className="ml-3 px-4 py-2 bg-white text-gray-900 rounded-md hover:bg-gray-50 focus:outline-none"
                    onClick={() => addProductModalSetting()}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

  );
}

import React from 'react'

// Define the type for the props expected by the component
interface ConfirmModalProps {
  isOpen: boolean // Whether the modal is open
  onCancel: () => void // Function to call when cancel is clicked
  onRemove: () => void // Function to call when remove is clicked
}

// Update the component to accept props
const RemoveOrderModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onCancel,
  onRemove,
}) => {
  if (!isOpen) {
    return null // If the modal is not open, don't render anything
  }

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-40 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-2xl leading-6 font-medium text-gray-900">
            Da li si siguran?
          </h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              Želiš da ukloniš ovaj artikal iz korpe?
            </p>
          </div>
          <div className="items-center px-4 py-3 space-x-4">
            <button
              id="cancel-btn"
              onClick={onCancel}
              className="px-2 py-2 bg-blue-500 text-white text-base font-medium rounded-3xl w-24 shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Ne želim
            </button>
            <button
              id="confirm-btn"
              onClick={onRemove}
              className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-3xl w-24 shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Ukloni
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveOrderModal

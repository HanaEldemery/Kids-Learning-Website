import { X } from 'lucide-react';

interface DeleteChildModalProps {
  childName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteChildModal({ childName, onClose, onConfirm }: DeleteChildModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h2>Delete Child Profile</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-8">
          <p className="text-gray-700 mb-4">
            Are you sure you want to remove <span className="font-semibold">{childName}'s</span> profile?
          </p>
          <p className="text-red-600">
            This action cannot be undone. All exercise history and progress will be permanently deleted.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition-colors"
          >
            <span className="block text-center">Cancel</span>
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition-colors"
          >
            <span className="block text-center">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

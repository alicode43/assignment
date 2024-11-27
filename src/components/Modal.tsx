"use client"
import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit?: React.MouseEventHandler<HTMLButtonElement>;
  showSubmitButton?: boolean;
}

export default function Modal({ open, onClose, title, children, onSubmit = () => {}, showSubmitButton = true }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-1/3">
        <div className="border-b p-4">
          <h2 className="text-lg font-bold">{title}</h2>
        </div>
        <div className="p-4">{children}</div>
        <div className="flex justify-end space-x-2 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Cancel
          </button>
          {showSubmitButton && (
            <button
              onClick={onSubmit}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

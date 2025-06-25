import React from "react";

interface TabButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  label,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-4 rounded-md border text-[#1b1655] font-medium transition
        ${
          isSelected
            ? "bg-gray-100 border-gray-300"
            : "bg-white border-gray-300 hover:bg-gray-50"
        }`}
    >
      {label}
    </button>
  );
};

export default TabButton;

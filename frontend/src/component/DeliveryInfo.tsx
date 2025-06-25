import React from "react";

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });
};

const DeliveryInfo: React.FC = () => {
  const today = new Date();

  const expressDate = new Date(today);
  expressDate.setDate(today.getDate() + 7);

  const standardStart = new Date(today);
  standardStart.setDate(today.getDate() + 14);

  const standardEnd = new Date(today);
  standardEnd.setDate(today.getDate() + 16);

  return (
    <div className="border-y mt-6 py-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Delivery</h3>
      <p className="text-sm text-gray-800">
        <span className="text-green-700 font-medium  mr-1">▌▌</span>
        Express by <strong>{formatDate(expressDate)}</strong>
      </p>
      <p className="text-sm text-gray-800 mt-2">
        Standard between{" "}
        <strong>
          {formatDate(standardStart)} - {formatDate(standardEnd)}
        </strong>
      </p>
    </div>
  );
};

export default DeliveryInfo;

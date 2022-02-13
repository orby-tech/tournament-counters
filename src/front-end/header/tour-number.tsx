import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export function TourNumberInfo() {
  const tourNumber = useSelector<RootState>(
    (state) => state.structure.tourNumber
  );

  return (
    <div className="tournament-control">
      <label>Номер тура: {tourNumber}</label>
    </div>
  );
}

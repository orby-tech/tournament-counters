import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export function SectionNumberInfo() {
  const sectionNumber = useSelector<RootState>(
    (state) => state.structure.sectionNumber
  );

  return (
    <div className="tournament-control">
      <label>Номер секции: {sectionNumber}</label>
    </div>
  );
}

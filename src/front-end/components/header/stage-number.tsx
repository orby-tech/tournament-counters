import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export function StageNumberInfo() {
  const stageNumber = useSelector<RootState>(
    (state) => state.structure.stageNumber
  );

  return (
    <div className="tournament-control">
      <label>Номер этапа: {stageNumber}</label>
    </div>
  );
}

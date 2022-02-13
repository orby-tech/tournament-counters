import React from "react";
import { useSelector } from "react-redux";
import { JuryModel } from "../../common/models/jury";
import { RootState } from "../store";

export function JuriesNumberInfo() {
  const activeJuries = useSelector<RootState, JuryModel[]>(
    (state) => state.structure.juries
  ).filter((jury) => jury.active);

  return (
    <div className="tournament-control">
      <label>Количество жюри: {activeJuries.length}</label>
    </div>
  );
}

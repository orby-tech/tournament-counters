import React from "react";
import { useSelector } from "react-redux";
import { JuryModel } from "../../common/models/jury";
import { RootState } from "../store";

export function JuriesNumberInfo() {
  const juries = useSelector<RootState, JuryModel[]>(
    (state) => state.structure.juries
  );
  const activeJuries = juries.filter((jury) => jury.active);

  return (
    <div className="tournament-control">
      <label>Номер секции: {activeJuries.length}</label>
    </div>
  );
}

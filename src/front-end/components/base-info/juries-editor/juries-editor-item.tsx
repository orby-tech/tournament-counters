import React from "react";
import { useAppDispatch } from "../../../hooks";
import { JuryModel } from "../../../../common/models/jury";
import JuryTitle from "./jury-title";

export function JuriesEditorItem({
  jury,
  activeRow,
}: {
  jury: JuryModel;
  activeRow: boolean;
}) {
  const dispatch = useAppDispatch();

  if (activeRow) {
    return <JuryTitle jury={jury} activeRow={activeRow} />;
  } else {
    return <JuryTitle jury={jury} activeRow={activeRow} />;
  }
}

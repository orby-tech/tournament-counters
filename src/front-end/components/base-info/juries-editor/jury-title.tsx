import React from "react";
import { connect } from "react-redux";
import {
  setJuryTitle,
  setTourNumber,
} from "../../../store/slices/structure.slice";
import { JuryModel } from "../../../../common/models/jury";
import { JuriesEditorItemSecondaryAction } from "./juries-editor-item-secondary-action";
import { Button, Input, ListItem, TextField } from "@mui/material";

type JuryTitleProps = {
  jury: JuryModel;

  activeRow: boolean;
  setJuryTitle: (jury: JuryModel) => void;
};

type JuryTitleState = {
  juryTitle: string;
  onEdit: boolean;
};

class JuryTitle extends React.Component<JuryTitleProps, JuryTitleState> {
  state = {
    juryTitle: "",
    onEdit: false,
  };
  saveTimeout: NodeJS.Timeout | null = null;

  constructor(props: JuryTitleProps) {
    super(props);
    this.startEdit = this.startEdit.bind(this);
    this.setNewValue = this.setNewValue.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.saveTimeout);
    if (this.state.juryTitle) {
      this.props.setJuryTitle({
        id: this.props.jury.id,
        title: this.state.juryTitle,
        active: this.props.jury.active,
      });
    }
  }

  startEdit() {
    this.setState({ onEdit: true });

    clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => {
      this.setState({ onEdit: false, juryTitle: "" });
    }, 1500);
  }

  setNewValue(e: any) {
    this.setState({ juryTitle: e.target.value });

    clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => {
      this.props.setJuryTitle({
        id: this.props.jury.id,
        title: this.state.juryTitle,
        active: this.props.jury.active,
      });
      this.setState({ onEdit: false, juryTitle: "" });
    }, 600);
  }

  render() {
    const { jury, activeRow } = this.props;
    if (this.state.onEdit) {
      return (
        <ListItem
          key={jury.id}
          onClick={this.startEdit}
          secondaryAction={
            <JuriesEditorItemSecondaryAction
              jury={jury}
              activeRow={activeRow}
            />
          }
        >
          <TextField
            inputProps={{ inputMode: "text" }}
            defaultValue={jury.title}
            onChange={this.setNewValue}
          />
        </ListItem>
      );
    } else {
      return (
        <ListItem
          key={jury.id}
          onClick={this.startEdit}
          secondaryAction={
            <JuriesEditorItemSecondaryAction
              jury={jury}
              activeRow={activeRow}
            />
          }
        >
          {this.props.jury.title}
        </ListItem>
      );
    }
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setJuryTitle: (jury: JuryModel) =>
      dispatch(setJuryTitle({ action: "", payload: jury })),
  };
};
export default connect(null, mapDispatchToProps)(JuryTitle);

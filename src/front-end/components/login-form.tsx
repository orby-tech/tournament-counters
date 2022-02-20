import * as React from "react";
import { Input, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";
import { ipcRenderer } from "electron";
import { UserRule } from "../../common/models/user.model";
import { useAppDispatch } from "../hooks";
import { setUserStatus } from "../store/slices/tabs.slice";
import { locMap } from "../locale/i18n";
import { useTranslation } from "react-i18next";

let errorTimer: NodeJS.Timeout | null = null;
let updateTimer: NodeJS.Timeout | null = null;

export function LoginForm() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [errorTime, setErrorTime] = useState(0);
  const [wrongIteration, setWrongIteration] = useState(0);

  const tickTimer = (nextTime: number) => {
    errorTimer = setTimeout(() => {
      if (nextTime < 0) {
        clearTimeout(errorTimer);
        clearTimeout(updateTimer);

        return;
      }
      setErrorTime(nextTime);

      tickTimer(nextTime - 1);
    }, 1000);
  };

  const onLogin = (e: any) => {
    if (e.key === "Enter") {
      ipcRenderer.on("change-user-status", (e, userStatus: UserRule) => {
        dispatch(setUserStatus({ type: "commandsСount", payload: userStatus }));
      });

      ipcRenderer.on("change-user-status-error", () => {
        clearTimeout(updateTimer);

        updateTimer = setTimeout(() => {
          if (!errorTime) {
            setWrongIteration(wrongIteration + 1);
            tickTimer(3 ** wrongIteration);
          }
        }, 300);
      });

      ipcRenderer.send("set-user-status", { password: e.target.value });
    }
  };

  if (errorTime > 0) {
    return (
      <>
        {t(locMap.support_info.wrong_pass_wait)}: {errorTime}
      </>
    );
  }
  clearTimeout(errorTimer);
  clearTimeout(updateTimer);

  return (
    <FormControl>
      <InputLabel htmlFor="password-input">
        {t(locMap.headers.login)}:
      </InputLabel>
      <Input id="password-input" type="password" onKeyPress={onLogin} />
    </FormControl>
  );
}

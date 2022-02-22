export const IPC_SERVER_SIDE_EVENTS = {
  hello: "hello",
  set_state: "set-state",
  set_base_state: "set-base-state",
  set_user_status: "set-user-status",
  get_all_devices: "get-all-devices",
  select_divices_directories: "select-divices-directories",
  build_app: "build-app",
  write_app_to_flash: "write-app-to-flash",
} as const;

export const IPC_CLIENT_SIDE_EVENTS = {
  initial_state: "initial-state",
  initial_base_state: "initial-base-state",
  change_user_status_error: "change-user-status-error",
  change_user_status: "change-user-status",
  all_devices: "all-devices",
  new_devices: "new-devices",
  build_app_finish: "build-app-finish",
  write_app_to_flash_finish: "write-app-to-flash-finish",
} as const;

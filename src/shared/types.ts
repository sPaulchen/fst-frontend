export enum Severity {
  error = "error",
  info = "info",
  success = "success",
  warning = "warning"
}
export type Message = {
  severity: Severity;
  message: string;
  eventType?: EventType;
};
export enum EventType {
  delete = "delete",
  create = "create",
  update = "update",
  upload = "upload",
  load = "load"
}

export interface IUnhandledErr {
  level: string;
  errorName: Error['name'];
  errorStack: Error['stack'];
  message: Error['message'];
}

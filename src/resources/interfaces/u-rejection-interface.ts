export interface IURejection {
  level: string;
  name: string;
  message: Error['message'];
  stack: string | undefined;
}

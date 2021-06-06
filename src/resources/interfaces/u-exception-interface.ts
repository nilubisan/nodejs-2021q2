export interface IUException {
    level: string,
    uException: Error["name"],
    uExceptionOrigin: string,
    message: Error["message"],
    uExceptionStack: Error["stack"]
}
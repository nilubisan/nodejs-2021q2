export interface IUException {
    level: string,
    name: Error["name"],
    origin: string,
    message: Error["message"],
    stack: Error["stack"]
}
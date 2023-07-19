export function BufferToObject(message: Buffer): any {
  return JSON.parse(message.toString());
}
export function ObjectToString(obj: any): String {
  return JSON.stringify(obj);
}

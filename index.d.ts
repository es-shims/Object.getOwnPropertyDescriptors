export default function getOwnPropertyDescriptors<T>(
  o: T
): { [P in keyof T]: TypedPropertyDescriptor<T[P]> } & { [x: string]: PropertyDescriptor };

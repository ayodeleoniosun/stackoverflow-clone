export const dasherizeCamelCase = (word: string) =>
  word.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase();

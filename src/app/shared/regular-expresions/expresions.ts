export class Expressions {
  public static get alphaSpaces(): string {
    return '[a-zA-Z]';
  }

  public static get email(): string {
    return '^[^@]+@[^@]+\\.[a-zA-Z]{2,}$';
  }

  public static get url(): string {
    return '^https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+[/#?]?.*$';
  }
}

export const userName = () => {
  return '[\\w\\-]+(\\.[\\w \\-]+)';
}

export class LocalStorageService {
  private static instance: LocalStorageService;

  private constructor() {}

  // Singleton pattern to ensure only one instance is created
  public static getInstance(): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }
    return LocalStorageService.instance;
  }

  // Check if window is defined (ensures this is running on the client side)
  private isBrowser(): boolean {
    return typeof window !== "undefined";
  }

  // Getters and setters for token
  get token(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem("sohojogtoken");
    }
    return null; // Return null if not in the browser
  }

  set token(value: string | null) {
    if (this.isBrowser()) {
      if (value) {
        localStorage.setItem("sohojogtoken", value);
      } else {
        localStorage.removeItem("sohojogtoken");
      }
    }
  }

  // Getters and setters for otpToken
  get otpToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem("sohojogotpToken");
    }
    return null; // Return null if not in the browser
  }

  public deleteTokens(): void {
    if (this.isBrowser()) {
      localStorage.removeItem("sohojogtoken");
      localStorage.removeItem("sohojogotpToken");
    }
  }

  set otpToken(value: string | null) {
    if (this.isBrowser()) {
      if (value) {
        localStorage.setItem("sohojogotpToken", value);
      } else {
        localStorage.removeItem("sohojogotpToken");
      }
    }
  }
}

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

  // Getters and setters for token
  get token(): string | null {
    return localStorage.getItem("sohojogtoken");
  }

  set token(value: string | null) {
    if (value) {
      localStorage.setItem("sohojogtoken", value);
    } else {
      localStorage.removeItem("sohojogtoken");
    }
  }

  // Getters and setters for otpToken
  get otpToken(): string | null {
    return localStorage.getItem("sohojogotpToken");
  }

  set otpToken(value: string | null) {
    if (value) {
      localStorage.setItem("sohojogotpToken", value);
    } else {
      localStorage.removeItem("sohojogotpToken");
    }
  }
}

export {};

declare global {
  interface Window {
    widget: {
      setSettings: (data: object) => void;
    };
  }
}

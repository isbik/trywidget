export {};

declare global {
  interface Window {
    widget: {
      setSettings: (data: object) => void;
    };

    VK?: any;
    dataLayer?: any;
    ym?: any;
  }
}

// custom.d.ts

// PNG 이미지
declare module "*.png" {
  const value: string;
  export default value;
}

// JPEG 이미지
declare module "*.jpg" {
  const value: string;
  export default value;
}

// GIF 이미지
declare module "*.gif" {
  const value: string;
  export default value;
}

// SVG 이미지
declare module "*.svg" {
  const value: string;
  export default value;
}

declare interface Window {
  ReactNativeWebView: any;
}
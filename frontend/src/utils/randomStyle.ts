import { LightStyle } from "@/type";

let lightStyle: LightStyle[] = [];

export default function randomStyle(len: number) {
  for (let i = 0; i < len; i++) {
    let color = `color${Math.floor(Math.random() * 6)}`;
    let height = Math.floor(Math.random() * 48) + 24;
    let width = height;
    let top: number = 0,
      left: number = 0;
    let flag = true;
    while (flag) {
      flag = false;
      top = 64 + Math.floor(Math.random() * (window.innerHeight - 200));
      left = 64 + Math.floor(Math.random() * (window.innerWidth / 2));
      for (let j = 0; j < i; j++) {
        if (
          Math.abs(top - lightStyle[j].top) <=
            Math.abs(height - lightStyle[j].height) + 24 ||
          Math.abs(left - lightStyle[j].left) <=
            Math.abs(width - lightStyle[j].width)
        ) {
          flag = true;
          break;
        }
      }
    }
    lightStyle.push({
      color,
      height,
      width,
      top,
      left,
    });
    console.log(lightStyle);
  }

  return lightStyle;
}

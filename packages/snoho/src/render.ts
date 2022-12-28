import { Template } from "./Template";

export const X_NAME = "x-name";
export const X_RENDER = "x-render";

export function render() {
  const nodes = document.querySelectorAll(`[${X_NAME}]`);

  nodes.forEach((node) => {
    new Template(node as HTMLElement);
  });
}

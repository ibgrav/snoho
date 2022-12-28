/// <reference lib="dom" />

import { X_NAME, X_RENDER } from "./render";

type Prop = string | number | boolean;
type Props = Record<string, Prop>;

export class Template {
  public name: string;
  public tagName: string;
  public props: Props = {};

  constructor(public root: HTMLElement) {
    this.name = root.getAttribute(X_NAME) || "";
    this.tagName = root.tagName.toLowerCase();

    this.setProps();
    this.renderAll();
  }

  public setProps() {
    for (const attr of this.root.getAttributeNames()) {
      if (attr.startsWith("x-prop-")) {
        this.props[attr.replace("x-prop-", "")] = this.root.getAttribute(attr) || "";
      }
    }
  }

  public renderAll() {
    document.querySelectorAll(`template[${X_RENDER}='${this.name}']`).forEach((node) => {
      this.render(node as HTMLTemplateElement);
    });
  }

  public render(node: HTMLTemplateElement) {
    let html = this.root.innerHTML;

    for (const [key, val] of Object.entries(this.props)) {
      const prop = node.getAttribute(`x-prop-${key}`) || val;
      html = html.split(`{{${key}}}`).join(String(prop));
    }

    const el = document.createElement(this.tagName);
    el.innerHTML = html;

    node.replaceWith(el);
  }
}

class Collabsible extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("collapsible-wrapper");
    const dataId = this.getAttribute("data-id");
    const content = this.querySelector<HTMLDivElement>("div");

    if (!content)
      throw new Error("Collabsible content not found for " + dataId);

    content.classList.add("collapsible-content");
    if (!content) return;

    const toggle = document.createElement("input");
    toggle.id = "collapsible" + dataId;
    toggle.classList.add("collapsible-toggle");
    toggle.type = "checkbox";
    toggle.checked = true;
    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        content.style.maxWidth = "100vh";
        content.style.opacity = "1";
        content.style.scale = "1";
        content.style.translate = "0 0";
      } else {
        content.style.maxWidth = "0";
        content.style.opacity = "0";
        content.style.scale = "0";
        content.style.translate = "0 100%";
      }
    });
    this.appendChild(toggle);

    const labelClass = this.getAttribute("data-label-class");
    const label = document.createElement("label");
    label.htmlFor = toggle.id;
    label.classList.add("collapsible-toggle-lbl");
    labelClass && label.classList.add(labelClass);

    const labelIcon = this.querySelector<HTMLImageElement>("img");

    if (!labelIcon)
      throw new Error("Collabsible label icon not found for " + dataId);

    labelIcon.remove();
    label.appendChild(labelIcon);
    this.appendChild(label);
  }
}

customElements.define("collabsible-wrapper", Collabsible);

export {};

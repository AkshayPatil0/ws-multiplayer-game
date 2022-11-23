class Collabsible extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("collapsible-wrapper");
    const dataId = this.getAttribute("data-id");
    const content = this.firstElementChild as HTMLDivElement;
    content.classList.add("collapsible-content");
    if (!content) return;

    const toggle = document.createElement("input");
    toggle.id = "collapsible" + dataId;
    toggle.classList.add("collapsible-toggle");
    toggle.type = "checkbox";
    toggle.addEventListener("change", (ev) => {
      if (toggle.checked) {
        content.style.maxHeight = "100vh";
      } else {
        content.style.maxHeight = "0";
      }
    });
    this.appendChild(toggle);

    const label = document.createElement("label");
    label.htmlFor = toggle.id;
    label.classList.add("collapsible-toggle-lbl");

    const labelIcon = document.createElement("img");
    labelIcon.src = this.getAttribute("data-icon-src") || "";

    label.appendChild(labelIcon);
    this.appendChild(label);
    // const toggle = this.children.item(0) as HTMLInputElement;
  }
}

customElements.define("collabsible-wrapper", Collabsible);

export {};

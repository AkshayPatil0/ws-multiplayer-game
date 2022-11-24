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
        // content.style.maxHeight = "100vh";
        content.style.maxWidth = "100vh";
        content.style.opacity = "1";
        // content.style.display = "grid";
        content.style.scale = "1";
        content.style.translate = "0 0";
      } else {
        // content.style.maxHeight = "0";

        content.style.maxWidth = "0";
        content.style.opacity = "0";

        // content.style.display = "none";
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

    const labelIcon = document.createElement("img");
    labelIcon.src = this.getAttribute("data-icon-src") || "";

    label.appendChild(labelIcon);
    this.appendChild(label);
    // const toggle = this.children.item(0) as HTMLInputElement;
  }
}

customElements.define("collabsible-wrapper", Collabsible);

export {};

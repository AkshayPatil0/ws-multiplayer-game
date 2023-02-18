class Popup extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("popup");
    const dataId = this.getAttribute("data-id");
    const body = this.querySelector<HTMLDivElement>(".body");
    const footer = this.querySelector<HTMLDivElement>(".footer");
    const closeIcon = this.querySelector<HTMLImageElement>(".close");

    this.childNodes.forEach((node) => node.remove());

    if (!body) throw new Error("Popup content not found for " + dataId);

    if (dataId) this.id = dataId;

    const content = document.createElement("div");
    content.classList.add("popup-content");
    this.appendChild(content);

    const header = document.createElement("div");
    header.classList.add("popup-header");

    const close = document.createElement("span");
    close.classList.add("popup-close");

    close.addEventListener("click", () => {
      this.style.display = "none";
    });

    if (!closeIcon) {
      close.appendChild(document.createTextNode("X"));
    } else {
      closeIcon.remove();
      close.appendChild(closeIcon);
    }

    header.appendChild(close);
    content.appendChild(header);

    body.classList.add("popup-body");

    content.appendChild(body);

    if (footer) {
      footer.classList.add("popup-footer");
      content.appendChild(footer);
    }
  }
}

customElements.define("popup-wrapper", Popup);

export {};

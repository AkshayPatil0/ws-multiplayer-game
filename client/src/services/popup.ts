export const showPopup = (id: string) => {
  const popupRef = document.querySelector(`#${id}`) as HTMLDivElement;
  popupRef.style.display = "block";
};

export const hidePopup = (id: string) => {
  const closeRef = document.querySelector(
    `#${id} .popup-close`
  ) as HTMLDivElement;
  closeRef.click();
};

// const closeButtonRef = document.querySelector(
//   "#popup-close"
// ) as HTMLButtonElement;

// closeButtonRef.addEventListener("click",(e) => hidePopup);

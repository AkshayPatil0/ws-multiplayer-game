export const getOrCreateRef = (
  id: string,
  className: string
): HTMLDivElement => {
  const groundRef = document.querySelector<HTMLDivElement>(
    "#ground"
  ) as HTMLDivElement;

  let ref = document.querySelector(`#${id}`);
  if (!ref) {
    ref = document.createElement("div");
    ref.id = id;
    ref.classList.add(className);
    groundRef.appendChild(ref);
  }
  return ref as HTMLDivElement;
};

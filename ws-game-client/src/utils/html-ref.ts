export const getOrCreateRef = <P extends Element>(
  id: string,
  className: string,
  parentRef: P,
  createRef: (id: string, className: string) => HTMLDivElement = (
    id,
    className
  ) => {
    const ref = document.createElement("div");
    ref.id = id;
    ref.classList.add(className);
    return ref;
  }
) => {
  let ref = document.querySelector<HTMLDivElement>(`#${id}`);
  if (!ref) {
    ref = createRef(id, className);
    parentRef.appendChild(ref);
  }
  return ref;
};

export const getOrCreatePlayerRef = (id: string): HTMLDivElement => {
  const groundRef = document.querySelector<HTMLDivElement>(
    "#ground"
  ) as HTMLDivElement;

  return getOrCreateRef(id, "player", groundRef, (id, className) => {
    const ref = document.createElement("div");
    ref.id = id;
    ref.classList.add(className);

    const avatarRef = document.createElement("img");
    avatarRef.classList.add("avatar");
    ref.appendChild(avatarRef);

    return ref;
  });
};

export const getOrCreateStarRef = () => {
  const groundRef = document.querySelector<HTMLDivElement>(
    "#ground"
  ) as HTMLDivElement;

  return getOrCreateRef("ball", "ball", groundRef);
};

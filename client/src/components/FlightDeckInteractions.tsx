import { useEffect } from "react";

export default function FlightDeckInteractions() {
  useEffect(() => {
    const deck = document.querySelector<HTMLElement>(".flight-deck");
    if (!deck) return;

    const magnetic = Array.from(document.querySelectorAll<HTMLElement>(".magnetic"));
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".system-card"));

    const onMove = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button, .magnetic") as HTMLElement | null;
      deck.style.setProperty("--cursor-speed", `${Math.min(20, Math.hypot(event.movementX, event.movementY))}px`);

      magnetic.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const distance = Math.hypot(event.clientX - (rect.left + rect.width / 2), event.clientY - (rect.top + rect.height / 2));
        if (distance < 110 && !element.matches(":disabled")) {
          const strength = Math.max(0, 1 - distance / 110);
          const x = (event.clientX - (rect.left + rect.width / 2)) * 0.12 * strength;
          const y = (event.clientY - (rect.top + rect.height / 2)) * 0.12 * strength;
          element.style.setProperty("--mag-x", `${x}px`);
          element.style.setProperty("--mag-y", `${y}px`);
        } else {
          element.style.setProperty("--mag-x", "0px");
          element.style.setProperty("--mag-y", "0px");
        }
      });

      if (interactive) deck.classList.add("cursor-locked");
      else deck.classList.remove("cursor-locked");
    };

    const onCardMove = (event: MouseEvent) => {
      const card = (event.currentTarget as HTMLElement);
      const rect = card.getBoundingClientRect();
      const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
      const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
      card.style.setProperty("--tilt-x", `${rotateX}deg`);
      card.style.setProperty("--tilt-y", `${rotateY}deg`);
    };

    const resetCard = (event: MouseEvent) => {
      const card = event.currentTarget as HTMLElement;
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    cards.forEach((card) => {
      card.addEventListener("mousemove", onCardMove);
      card.addEventListener("mouseleave", resetCard);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cards.forEach((card) => {
        card.removeEventListener("mousemove", onCardMove);
        card.removeEventListener("mouseleave", resetCard);
      });
    };
  }, []);

  return null;
}

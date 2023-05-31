import React, { useEffect, useRef } from "react";

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function MagicCard({ children, ...props }: MagicCardProps) {
  return (
    <div {...props} magic-card="">
      <div magic-card-inner="">{children}</div>
      <div className="invisible">{children}</div>
    </div>
  );
}

interface MagicCardWrapper extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function MagicCardWrapper({ children, ...props }: MagicCardWrapper) {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(
        "[magic-card]"
      ) as NodeListOf<HTMLElement>;

      const handleMouseMove = (e: MouseEvent) => {
        for (const card of cards) {
          const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        }
      };

      document.addEventListener("mousemove", handleMouseMove);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <div ref={cardsRef} magic-card-wrapper="" {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return <MagicCard>{child}</MagicCard>;
        }
      })}
    </div>
  );
}

import React, { useEffect, useState } from "react";

interface Position {
  x: number;
  y: number;
}

const DraggableComponent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const offsetX = e.clientX - dragStart.x;
      const offsetY = e.clientY - dragStart.y;
      setPosition((prevPosition) => ({
        x: prevPosition.x + offsetX,
        y: prevPosition.y + offsetY,
      }));
      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
      className={className}
    >
      {children}
    </div>
  );
};

export default DraggableComponent;

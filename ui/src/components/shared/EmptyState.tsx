import React from "react";
import { Button } from "../primitives/Button";

type Action = {
  text: string;
  onClick: () => void;
};

type Props = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  actions?: Action[];
};

function EmptyState({ title, subtitle, icon, actions }: Props) {
  return (
    <div className="flex h-80 w-full max-w-7xl flex-col items-center justify-center gap-4 rounded-xl border border-gray-3 text-center">
      {icon}
      <div className="flex flex-col gap-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm  text-white-64">{subtitle}</p>
      </div>
      {actions && (
        <div className="flex flex-row-reverse gap-3">
          {actions.map((action, index) => (
            <Button
              key={action.text}
              intent={index === 0 ? "primary" : "mauve"}
              size="medium"
              rounded="full"
              onClick={action.onClick}
            >
              {action.text}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmptyState;

import React from "react";

type Props = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
};

function PageTitle({ title, subtitle, actions }: Props) {
  return (
    <div className="flex w-full max-w-7xl justify-between gap-4 mb-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-medium">{title}</h1>
        {subtitle && <p className="text-sm text-white-64">{subtitle}</p>}
      </div>
      {actions && <div className="flex gap-4">{actions}</div>}
    </div>
  );
}

export default PageTitle;

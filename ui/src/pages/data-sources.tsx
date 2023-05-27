import Layout from "@/components/_other/Layout";
import {
  IconDependify,
  IconGithub,
  IconGitlab,
  IconSettings,
} from "@/components/_other/Icons";
import { DataSourceType } from "@/types/data-source";

export default function Page() {
  return (
    <Layout>
      <header className="flex h-fit w-full flex-col items-center border-b border-black-10 px-8 dark:border-white-10">
      </header>
      <div className="flex w-full flex-col items-center gap-8 p-8">
        <div className="flex w-full max-w-7xl flex-col gap-6">
          <DataSource
            name="Local"
            url="/var/lib/dependify"
            editable={false}
            type="local"
          />
          <hr className="w-full border-gray-2" />
          <ul className="flex w-full flex-col gap-4">
            <DataSource
              name="Purple Unicorn"
              url="https://github.com/purple-unicorn/purple-unicorn"
              type="github"
              labels={["SPDX", "CycloneDX"]}
            />
            <DataSource
              name="Cosmic Jellyfish"
              url="https://github.com/cosmic-jellyfish/cosmic-jellyfish"
              type="github"
              labels={["SPDX", "CycloneDX"]}
            />
            <DataSource
              name="Enchanted Tiger"
              url="https://github.com/enchanted-tiger/enchanted-tiger"
              type="github"
              labels={["SPDX", "CycloneDX"]}
            />
          </ul>
        </div>
      </div>
    </Layout>
  );
}

function DataSource({
  name,
  url,
  labels,
  type,
  editable = true,
}: {
  name: string;
  url: string;
  labels?: string[];
  type: DataSourceType;
  editable?: boolean;
}) {
  const iconClassName = "w-6 ml-0.5 text-white";

  const icon = {
    github: <IconGithub className={iconClassName} />,
    gitlab: <IconGitlab />,
    s3: <IconGithub />,
    local: <IconDependify className={iconClassName} />,
  } as const;

  const getIcon = icon[type];

  return (
    <li className="flex w-full items-start overflow-hidden rounded-xl border border-gray-5">
      <div className="flex p-4">{getIcon}</div>
      <div className="flex border-l border-gray-5 w-full items-start justify-between bg-gray-1 px-4 py-3">
        <div className="flex w-full flex-col">
          <h2 className="font-medium text-base">{name}</h2>
          <span className="text-sm font-medium text-gray-10">{url}</span>
          {labels && (
            <div className="mt-3 flex gap-3">
              {labels.map((label) => (
                <label
                  key={label}
                  className="rouded-full rounded-full border border-white-10 px-3 py-1 text-xs font-medium text-white-92"
                >
                  {label}
                </label>
              ))}
            </div>
          )}
        </div>

        {editable && (
          <button>
            <IconSettings className="w-6 text-gray-9" />
          </button>
        )}
      </div>
    </li>
  );
}

import Layout from "@/components/_other/Layout";
import {
  IconCheck,
  IconDatabase,
  IconDependify,
  IconGithub,
  IconGitlab,
  IconPlus,
  IconPower,
  IconRefresh,
  IconWarning,
} from "@/components/_other/Icons";
import {
  DataSource,
  DataSourceStatus,
  DataSourceType,
} from "@/types/data-source";
import BodyBase from "@/components/text/BodyBase";
import TitleLarge from "@/components/text/TitleLarge";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/input/Button";
import { TextField } from "@/components/input/TextField";
import Link from "next/link";
import { motion } from "framer-motion";
import { MagicCardWrapper } from "@/components/motion/MagicCard";
import { capitalize, getDateDifferenceText } from "@/utils/formatting";
import Tooltip from "@/components/status_info/Tooltip";

const fakeDataSources: Array<DataSource> = [
  {
    id: "1",
    name: "Example Repository 1",
    label: "Repository 1",
    type: "github",
    status: "connected",
    uri: "https://github.com/example/repository1",
    enabled: true,
    labels: ["label1", "label2"],
    lastSync: "2023-05-30",
    lastSyncStatus: "synced",
    lastSyncError: "",
  },
  {
    id: "2",
    name: "Example Repository 2",
    label: "Repository 2",
    type: "github",
    status: "connected",
    uri: "https://gitlab.com/example/repository2",
    enabled: false,
    labels: ["label3"],
    lastSync: "2023-05-31T13:32:19+00:00",
    lastSyncStatus: "synced",
    lastSyncError: "Connection timeout",
  },
  {
    id: "3",
    name: "Example Repository 3",
    label: "Repository 3",
    type: "github",
    status: "error",
    uri: "https://bitbucket.org/example/repository3",
    enabled: true,
    labels: ["label4", "label5"],
    lastSync: "2023-05-31T13:32:19+00:00",
    lastSyncStatus: "synced",
    lastSyncError: "",
  },
  {
    id: "4",
    name: "Example Repository 4",
    label: "Repository 4",
    type: "github",
    status: "connected",
    uri: "https",
    enabled: true,
    labels: ["label6"],
    lastSync: "2023-05-31T13:32:19+00:00",
    lastSyncStatus: "synced",
    lastSyncError: "",
  },
  {
    id: "5",
    name: "Example Repository 5",
    label: "Repository 5",
    type: "github",
    status: "connected",
    uri: "https://github.com/example/repository5",
    enabled: true,
    labels: ["label1", "label2"],
    lastSync: "2023-05-30",
    lastSyncStatus: "synced",
    lastSyncError: "",
  },
  {
    id: "6",
    name: "Example Repository 6",
    label: "Repository 6",
    type: "github",
    status: "connected",
    uri: "https://gitlab.com/example/repository2",
    enabled: false,
    labels: ["label3"],
    lastSync: "2023-05-31T13:32:19+00:00",
    lastSyncStatus: "synced",
    lastSyncError: "Connection timeout",
  },
  {
    id: "7",
    name: "Example Repository 7",
    label: "Repository 7",
    type: "github",
    status: "error",
    uri: "https://bitbucket.org/example/repository3",
    enabled: true,
    labels: ["label4", "label5"],
    lastSync: "2023-05-31T13:32:19+00:00",
    lastSyncStatus: "synced",
    lastSyncError: "",
  },
  {
    id: "8",
    name: "Example Repository 8",
    label: "Repository 8",
    type: "github",
    status: "connected",
    uri: "https",
    enabled: true,
    labels: ["label6"],
    lastSync: "2023-05-31T13:32:19+00:00",
    lastSyncStatus: "synced",
    lastSyncError: "",
  },
  {
    id: "9",
    name: "Example Repository 9",
    label: "Repository 9",
    type: "github",
    status: "connected",
    uri: "https",
    enabled: true,
    labels: ["label6"],
    lastSync: "2023-05-31T13:32:19+00:00",
    lastSyncStatus: "synced",
    lastSyncError: "",
  },
  {
    id: "10",
    name: "Example Repository 10",
    label: "Repository 10",
    type: "github",
    status: "connected",
    uri: "https",
    enabled: true,
    labels: ["label6"],
    lastSync: "2023-05-31T13:32:19+00:00",
    lastSyncStatus: "synced",
    lastSyncError: "",
  },
  {
    id: "11",
    name: "Example Repository 11",
    label: "Repository 11",
    type: "github",
    status: "connected",
    uri: "https",
    enabled: true,
    labels: ["label6"],
    lastSync: "2023-05-31T13:32:19+00:00",
    lastSyncStatus: "synced",
    lastSyncError: "",
  },
  {
    id: "12",
    name: "Example Repository 12",
    label: "Repository 12",
    type: "github",
    status: "connected",
    uri: "https",
    enabled: true,
    labels: ["label6"],
    lastSync: "2023-05-31T13:32:19+00:00",
    lastSyncStatus: "synced",
    lastSyncError: "",
  },
  {
    id: "13",
    name: "Example Repository 13",
    label: "Repository 13",
    type: "github",
    status: "connected",
    uri: "https",
    enabled: true,
    labels: ["label6"],
    lastSync: "2023-05-31T13:32:19+00:00",
    lastSyncStatus: "synced",
    lastSyncError: "",
  },
];

export default function Page() {
  const [dataSources, setDataSources] = useState<DataSource[]>(fakeDataSources);
  const [filteredDataSources, setFilteredDataSources] =
    useState<DataSource[]>();
  const [query, setQuery] = useState("");

  function handleFilterDataSources(query: string) {
    const filteredDataSources = dataSources.filter((dataSource) => {
      return query === ""
        ? true
        : dataSource.name.toLowerCase().includes(query.toLocaleLowerCase());
    });

    setFilteredDataSources(filteredDataSources);
  }

  useEffect(() => {
    handleFilterDataSources(query);
  }, [query]);

  useEffect(() => {
    setFilteredDataSources(dataSources);
  }, []);

  return (
    <Layout className="">
      <div className="flex h-full w-full max-w-7xl flex-col gap-16 pt-8">
        <div className="flex w-full flex-col gap-8">
          <div>
            <TitleLarge className="mb-2">Manage your data sources</TitleLarge>
            <BodyBase className="text-white-56">
              Data sources are the places where your SBOM's are stored.
            </BodyBase>
          </div>
        </div>

        <div className="flex w-full flex-col gap-8">
          <div className="flex items-center gap-4">
            <TextField
              as="input"
              name="name"
              style="icon"
              label="Name"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
              placeholder="Search by name.."
              icon={<IconDatabase className="w-4 text-white-48" />}
            />
            <Link href="/data-sources/new" className="h-full">
              <Button intent="white" className="h-full">
                <IconPlus className="w-4 text-black" />
                Add data source
              </Button>
            </Link>
          </div>
          {filteredDataSources && filteredDataSources.length > 0 && (
            <MagicCardWrapper className="-ml-2 grid w-full grid-cols-3 gap-5">
              {filteredDataSources.map((dataSource) => (
                <DataSource
                  key={dataSource.id}
                  status={dataSource.status}
                  label={dataSource.label}
                  type={dataSource.type}
                  lastSync={dataSource.lastSync}
                  enabled={dataSource.enabled}
                />
              ))}
            </MagicCardWrapper>
          )}
        </div>
      </div>
    </Layout>
  );
}

function DataSource({
  label,
  status,
  type,
  lastSync,
  enabled,
}: {
  label: string;
  status: DataSourceStatus;
  type: DataSourceType;
  lastSync: string | undefined;
  enabled: boolean;
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
    <li className="group flex w-full cursor-pointer flex-col items-start justify-between gap-8 rounded-lg bg-gray-DARK p-6 transition-all duration-200 hover:bg-gray-1">
      <span
        className={`absolute right-4 top-4 flex gap-1.5 rounded-md px-3 py-1 text-xs transition-colors duration-200
      ${
        status === "connected"
          ? "bg-gray-2 text-white-48 group-hover:bg-gray-3"
          : "bg-red-1 text-red-10 group-hover:bg-red-2"
      }
      `}
      >
        {status === "connected" ? (
          <IconCheck className="w-3" />
        ) : (
          <IconWarning className="w-3" />
        )}
        {capitalize(status)}
      </span>
      <div className="flex w-full items-center gap-3">
        <IconGithub className={iconClassName} />
        <BodyBase className="font-medium text-white">{label}</BodyBase>
      </div>
      <div className="flex gap-5">
        <span className="flex items-center gap-1.5 text-white-48">
          <Tooltip text="Last update">
            <IconRefresh className="w-4" />
          </Tooltip>
          <span className="text-sm">
            {lastSync ? (
              <span>
                {getDateDifferenceText(new Date(lastSync || ""), new Date())}
              </span>
            ) : (
              <span>Never</span>
            )}
          </span>
        </span>
        <span className="flex items-center gap-1.5 text-white-48">
          <Tooltip text="Last update">
            <IconPower className="w-4" />
          </Tooltip>
          <span className="text-sm">
            {enabled ? <span>Enabled</span> : <span>Disabled</span>}
          </span>
        </span>
      </div>
    </li>
  );
}

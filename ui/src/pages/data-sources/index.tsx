import Layout from "@/components/_other/Layout";
import {
  IconCheck,
  IconDatabase,
  IconDependify,
  IconGithub,
  IconGitlab,
  IconPlus,
  IconRefresh,
  IconWarning,
  IconX,
} from "@/components/_other/Icons";
import { DataSource } from "@/types/data-source";
import BodyBase from "@/components/text/BodyBase";
import TitleLarge from "@/components/text/TitleLarge";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/input/Button";
import { TextField } from "@/components/input/TextField";
import Link from "next/link";
import { MagicCardWrapper } from "@/components/motion/MagicCard";
import { capitalize, getDateDifferenceText } from "@/utils/formatting";
import Tooltip from "@/components/status_info/Tooltip";
import withAuth from "@/components/_other/auth/WithAuth";
import ComponentWrapper from "@/components/_other/auth/ComponentWrapper";
import { DataSourceService } from "@/services/DataSourceService";

function Page() {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
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

  async function handleGetDataSources() {
    try {
      const res = await DataSourceService.getDataSources();
      setDataSources(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteDataSource(name: string) {
    try {
      await DataSourceService.deleteDataSource({ name });
      handleGetDataSources();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleFilterDataSources(query);
  }, [query]);

  useEffect(() => {
    handleGetDataSources();
  }, []);

  useEffect(() => {
    setFilteredDataSources(dataSources);
  }, [dataSources]);

  return (
    <Layout className="">
      <div className="flex h-full w-full max-w-7xl flex-col gap-16 pt-8">
        <div className="flex w-full flex-col gap-8">
          <div>
            <TitleLarge className="mb-2">Manage your data sources</TitleLarge>
            <BodyBase className="text-white-56">
              {"Data sources are the places where your SBOM's are stored."}
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
                  key={dataSource.key}
                  name={dataSource.name}
                  url={dataSource.url}
                  lastSync={dataSource.lastSync}
                  error={dataSource.error}
                  description={dataSource.description}
                  onDelete={() => handleDeleteDataSource(dataSource.name)}
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
  name,
  url,
  key,
  lastSync,
  error,
  onDelete,
}: DataSource & { onDelete: () => void }) {
  return (
    <li className="group flex w-full cursor-pointer flex-col items-start justify-between gap-8 rounded-lg bg-gray-DARK p-6 transition-all duration-200 hover:bg-gray-1">
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full items-center gap-3">
          <IconGithub className="ml-0.5 w-6 text-white" />
          <BodyBase className="flex items-center gap-3 font-medium text-white">
            {name}
            <Tooltip
              text={
                !error
                  ? "No problems found"
                  : "There is a problem with this data source"
              }
              className={`flex gap-1.5 rounded-md p-1.5 text-xs transition-colors duration-200
                ${
                  !error
                    ? "bg-gray-2 text-white-48 group-hover:bg-gray-3"
                    : "bg-red-1 text-red-10 group-hover:bg-red-2"
                }
                `}
            >
              {!error ? (
                <IconCheck className="w-3" />
              ) : (
                <IconWarning className="w-3" />
              )}
              {capitalize(status)}
            </Tooltip>
          </BodyBase>
        </div>
        <Tooltip text="Delete data source">
          <Button onClick={onDelete} size="icon" intent="transparent">
            <IconX className="w-4" />
          </Button>
        </Tooltip>
      </div>
      <div className="flex w-full items-center justify-between gap-5">
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
      </div>
    </li>
  );
}

export default ComponentWrapper(withAuth(Page));

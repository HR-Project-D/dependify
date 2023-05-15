import DataSourceRow from "@/components/other/search/DataSourceRow";
import SearchingIcon from "@/components/other/search/SearchingIcon";
import { Button } from "@/components/primitives/Button";
import SelectDropdown from "@/components/primitives/SelectDropdown";
import InputError from "@/components/primitives/input/InputError";
import { InputField } from "@/components/primitives/input/InputField";
import InputLabel from "@/components/primitives/input/InputLabel";
import EmptyState from "@/components/shared/EmptyState";
import {
  IconCheck,
  IconDatabase,
  IconDependify,
  IconSpinner,
} from "@/components/shared/Icons";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { APIResponseSearch } from "@/types/api/search";
import { sampleSearchResults } from "@/utils/sampleSearchResponse";
import { VersionType, validateVersion } from "@/utils/version";
import { Formik, Form } from "formik";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Page() {
  const [searchResults, setSearchResults] = useState<APIResponseSearch>();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPhase, setSearchPhase] = useState("configure"); // configure, running, results
  const [searchType, setSearchType] = useState<VersionType>("exact"); // exact, range, below, above

  //const [dataSources, setDataSources] = useState([]);
  const [dataSources, setDataSources] = useState([
    "all",
    "Purple Unicorn",
    "Green Dragon",
    "Blue Whale",
  ]);

  function resetSearch() {
    setSearchResults(undefined);
    setSearchQuery("");
    setSearchPhase("configure");
    setSearchType("exact");
  }

  useEffect(() => {
    const setResults = async () => {
      if (searchPhase === "running") {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        if (searchPhase === "running") {
          setSearchResults(sampleSearchResults);
          setSearchPhase("results");
        }
      }
    };

    setResults();
  }, [searchPhase]);

  return (
    <Layout>
      <header className="flex h-fit w-full flex-col items-center border-b border-black-10 dark:border-white-10 px-8 pt-8">
        <PageTitle
          title="Search"
          subtitle="Please follow the steps to configure the search and run it."
          actions={
            searchPhase === "running" ? (
              <>
                <Button
                  onClick={resetSearch}
                  intent="primary"
                  rounded="full"
                  size="medium"
                >
                  Cancel
                </Button>
              </>
            ) : (
              searchPhase === "results" && (
                <>
                  <Button
                    onClick={resetSearch}
                    intent="primary"
                    rounded="full"
                    size="medium"
                  >
                    New Search
                  </Button>
                </>
              )
            )
          }
        />
      </header>
      <div className="flex w-full flex-col items-center gap-8 p-8">
        {dataSources.length === 0 ? (
          <EmptyState
            title="No data sources found"
            subtitle="To get started, add a data source or upload a SBOM"
            icon={<IconDatabase className="w-8 text-gray-10" />}
            actions={[
              {
                text: "Upload SBOM",
                onClick: () => {},
              },
              {
                text: "Add Data Source",
                onClick: () => {},
              },
            ]}
          />
        ) : (
          <MotionConfig
            transition={{
              type: "easeInOut",
              duration: 0.3,
            }}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {searchPhase === "configure" && (
                <motion.div
                  key="configure"
                  {...searchSectionAnimations}
                  className="w-full max-w-7xl"
                >
                  <div className="flex flex-col gap-4 rounded-xl border dark:border-gray-5 bg-black-2 border-black-8 dark:bg-gray-1 p-6">
                    <h2 className="text-lg font-medium">Configure Search</h2>
                    <hr className="border-black-8 dark:border-gray-5" />
                    <Formik
                      initialValues={{
                        dependencyName: "",
                        version: "",
                      }}
                      onSubmit={async (values, errors) => {
                        await new Promise((r) => setTimeout(r, 3000));
                        setSearchPhase("running");
                      }}
                      validateOnMount={false}
                      validateOnBlur={false}
                      validateOnChange={true}
                    >
                      {({ errors, isSubmitting }) => (
                        <Form className="flex w-full flex-col gap-5">
                          <div className="flex w-full flex-col gap-5">
                            <div className="flex w-full gap-5">
                              <div className="flex w-full flex-col gap-2">
                                <InputLabel htmlFor="dependencyName">
                                  Data Source
                                </InputLabel>
                                <SelectDropdown
                                  defaultValue="all"
                                  icon={
                                    <IconDatabase className="w-4 text-gray-10 transition-all duration-300" />
                                  }
                                  onChange={(value) => {}}
                                  options={dataSources}
                                />
                              </div>
                              <div className="flex w-full flex-col gap-2">
                                <InputLabel htmlFor="dependencyName">
                                  Dependency Name
                                </InputLabel>
                                <InputField
                                  id="dependencyName"
                                  name="dependencyName"
                                  style="icon"
                                  icon={
                                    <IconDependify className="w-4 text-gray-10 transition-all duration-300" />
                                  }
                                  type="text"
                                  placeholder="Log4j"
                                />
                              </div>
                            </div>
                            <div className="flex w-full gap-5">
                              <div className="flex w-full flex-col gap-2">
                                <InputLabel htmlFor="dependencyName">
                                  Version Type
                                </InputLabel>
                                <SelectDropdown
                                  defaultValue="exact"
                                  onChange={(value) =>
                                    setSearchType(value as VersionType)
                                  }
                                  options={["exact", "range", "below", "above"]}
                                />
                              </div>
                              <div className="flex w-full flex-col gap-2">
                                <InputLabel htmlFor="dependencyName">
                                  Version
                                </InputLabel>
                                <InputField
                                  id="version"
                                  name="version"
                                  validate={async (value: string) => {
                                    if (!validateVersion(value, searchType)) {
                                      return "Invalid version format";
                                    }
                                  }}
                                  style="iconless"
                                  type="text"
                                  placeholder={
                                    searchType === "exact"
                                      ? "0.0.0"
                                      : searchType === "range"
                                      ? "0.0.0-0.0.0"
                                      : searchType === "below"
                                      ? "=<0.0.0"
                                      : searchType === "above"
                                      ? ">=0.0.0"
                                      : "0.0.0"
                                  }
                                />
                                <InputError name="version" />
                              </div>
                            </div>
                          </div>
                          <hr className="dark:border-gray-5 border-black-8" />
                          <div className="flex gap-3">
                            <Button
                              disabled={isSubmitting}
                              intent="primary"
                              size="medium"
                              rounded="full"
                              type="submit"
                            >
                              {isSubmitting && <IconSpinner className="w-4" />}
                              Search
                            </Button>
                            <Button
                              disabled={isSubmitting}
                              intent="noBG"
                              size="medium"
                              rounded="full"
                              type="reset"
                            >
                              Clear filters
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </motion.div>
              )}
              {searchPhase === "running" && (
                <motion.div
                  key="running"
                  className="w-full max-w-7xl"
                  {...searchSectionAnimations}
                >
                  <EmptyState
                    title="Searching..."
                    subtitle="We're looking through your data sources for the dependency you're looking for."
                    icon={<SearchingIcon className="w-8 text-gray-10" />}
                  />
                </motion.div>
              )}
              {searchPhase === "results" && (
                <motion.div
                  key="results"
                  {...searchSectionAnimations}
                  className="w-full max-w-7xl rounded-xl border border-black-10 dark:border-gray-5"
                >
                  <div className="flex w-full items-center justify-between rounded-t-xl border-b border-black-10 dark:border-gray-5 bg-black-5 dark:bg-gray-1 px-6 py-4">
                    <h3 className="text-sm font-medium">Search Summary</h3>
                    <div className="flex items-center gap-3 text-sm dark:text-white-64 text-black-64">
                      23s
                      <div className="w-fit rounded-full bg-gray-DARK dark:bg-primary-11 p-1">
                        <IconCheck className="w-4 text-white dark:text-gray-DARK" />
                      </div>
                    </div>
                  </div>
                  {sampleSearchResults.data.map((dataSource) => (
                    <DataSourceRow
                      key={dataSource.label}
                      label={dataSource.label}
                      results={dataSource.results}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </MotionConfig>
        )}
      </div>
    </Layout>
  );
}

const searchSectionAnimations = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

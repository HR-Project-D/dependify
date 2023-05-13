import { Button } from "@/components/primitives/Button";
import SelectDropdown from "@/components/primitives/SelectDropdown";
import InputError from "@/components/primitives/input/InputError";
import { InputField } from "@/components/primitives/input/InputField";
import InputLabel from "@/components/primitives/input/InputLabel";
import EmptyState from "@/components/shared/EmptyState";
import { IconDatabase, IconDependify, IconSpinner } from "@/components/shared/Icons";
import Layout from "@/components/shared/Layout";
import PageTitle from "@/components/shared/PageTitle";
import { Formik, Form } from "formik";
import { useState } from "react";

const versionRegex = {
  exact: /^[0-9]+\.[0-9]+\.[0-9]+$/,
  range: /^[0-9]+\.[0-9]+\.[0-9]+-[0-9]+\.[0-9]+\.[0-9]+$/,
  below: /^=<[0-9]+\.[0-9]+\.[0-9]+$/,
  above: /^>=[0-9]+\.[0-9]+\.[0-9]+$/,
} as const;

type VersionType = keyof typeof versionRegex;

function validateVersion(version: string, type: VersionType) {
  return versionRegex[type].test(version);
}

export default function Page() {
  const [searchResults, setSearchResults] = useState([]);
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

  return (
    <Layout>
      <header className="flex h-fit w-full flex-col items-center border-b border-white-10 px-8 pt-8">
        <PageTitle
          title="Search"
          subtitle="Please follow the steps to configure the search and run it."
          actions={
            searchPhase === "running" && (
              <>
                <Button intent="primary" rounded="full" size="medium">
                  Cancel
                </Button>
              </>
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
                text: "Add Data Source",
                onClick: () => {},
              },
              {
                text: "Add Data Source",
                onClick: () => {},
              },
            ]}
          />
        ) : (
          <div className="w-full max-w-7xl">
            <div className="flex flex-col gap-4 rounded-xl border border-gray-5 bg-gray-1 p-6">
              <h2 className="text-lg font-medium">Configure Search</h2>
              <hr className="border-gray-5" />
              <Formik
                initialValues={{
                  dependencyName: "",
                  version: "",
                }}
                onSubmit={async (values, errors) => {
                  await new Promise((r) => setTimeout(r, 3000));
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
                              <IconDatabase className="transition-all text-gray-10 duration-300 w-4" />
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
                              <IconDependify className="transition-all text-gray-10 duration-300 w-4" />
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
                            validate={async (value) => {
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
                    <hr className="border-gray-5" />
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
          </div>
        )}
      </div>
    </Layout>
  );
}

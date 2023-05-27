import { CheckboxLabel, Checkbox } from "@/components/input/Checkbox";
import { InputField } from "@/components/input/input/InputField";
import InputLabel from "@/components/input/input/InputLabel";
import {
  IconChevron,
  IconDependify,
  IconMinusCircle,
  IconSpinner,
} from "@/components/_other/Icons";
import BodyLarge from "@/components/text/BodyLarge";
import { Formik, Form } from "formik";
import React, { ChangeEvent, useEffect, useState } from "react";
import { VersionType, getVersionPlaceholder } from "@/utils/version";
import ResizablePanel from "@/components/motion/ResizablePanel";
import { Button } from "@/components/input/Button";
import SelectDropdown from "@/components/input/SelectDropdown";
import InputError from "@/components/input/input/InputError";
import { capitalize } from "@/utils/formatting";
import { AnimatePresence } from "framer-motion";
import { versions } from "process";
import { scanFormToQuery, addRecentQuery, saveQuery } from "@/utils/query";
import { ScanResult } from "@/utils/fakeApi";
import { VersionGuard, type ScanFormValues, Query } from "@/types/scan";

type Props = {
  setSearchResults: React.Dispatch<
    React.SetStateAction<ScanResult | undefined>
  >;
};

function ScanForm({ setSearchResults }: Props) {
  const [versionGuards, setVersionGuards] = useState<VersionGuard[]>([]);

  const [isOpen, setIsOpen] = useState(true);
  const [versionType, setVersionType] = useState<VersionType>("exact");

  const [initialValues, setInitialValues] = useState<ScanFormValues>({
    dependencyName: "",
    exactMatch: false,
    versionType: "exact",
    version: "",
  });

  async function handleSearch(formValues: ScanFormValues) {
    addRecentQuery(scanFormToQuery(formValues, versionGuards));

    setSearchResults(ScanResult);
    await new Promise((r) => setTimeout(r, 1000)); // React doesn't have enough time to remove dom nodes? It glitches out with the emptystate
  }

  function importQuery(query: Query) {
    setVersionGuards(query.versions);
    setInitialValues({
      dependencyName: query.dependencyName,
      exactMatch: query.exactMatch,
      versionType: "exact",
      version: "",
    });
  }

  useEffect(() => {
    window.addEventListener("importQuery", (event: CustomEventInit<Query>) => {
      importQuery(event.detail as Query);
    });

    return () => {
      window.removeEventListener(
        "importQuery",
        (event: CustomEventInit<Query>) => {
          importQuery(event.detail as Query);
        }
      );
    };
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={async (values, errors) => {
        await new Promise((r) => setTimeout(r, 4000));
        console.log(values);
        handleSearch(values);
      }}
      validateOnMount={false}
      validateOnBlur={false}
      validateOnChange={true}
    >
      {({ isSubmitting, setFieldValue, values, setValues }) => (
        <Form className="flex w-full flex-col gap-4">
          {/* Query */}
          <div className="flex w-full flex-col gap-8 rounded-lg border border-white-8 bg-gray-1 py-8">
            <header className="flex w-full items-center justify-between px-8">
              <BodyLarge className="font-medium">Query</BodyLarge>
            </header>

            <div className="flex w-full flex-col gap-5 px-8">
              <div className="flex w-full flex-col gap-2">
                <InputLabel htmlFor="dependencyName">
                  Dependency Name
                </InputLabel>
                <div className="flex w-full items-center gap-3">
                  <InputField
                    disabled={isSubmitting}
                    id="dependencyName"
                    name="dependencyName"
                    required
                    style="icon"
                    icon={
                      <IconDependify className="w-4 text-gray-10 transition-all duration-300" />
                    }
                    type="text"
                    placeholder="Log4j"
                  />
                  <CheckboxLabel className="flex h-full justify-center gap-2 rounded-lg border border-b border-white-8 px-3">
                    <Checkbox
                      disabled={isSubmitting}
                      onClick={(e: ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("exactMatch", e.target.checked);
                      }}
                      id="exactMatch"
                      name="exactMatch"
                    />
                    Only exact match
                  </CheckboxLabel>
                </div>
              </div>
            </div>
          </div>

          {/* Version Guards */}
          <div className="flex w-full flex-col rounded-lg border border-white-8 bg-gray-1 pb-8 pt-8">
            <div
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex w-full cursor-pointer select-none items-center gap-2 px-8 text-white"
            >
              <IconChevron
                className={`w-5 -rotate-90  ${
                  isOpen && "rotate-0"
                } transition-all duration-300`}
              />
              <BodyLarge className="font-medium">Version Guards</BodyLarge>
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <ResizablePanel className="w-full px-8" key={"content"}>
                  <div className="flex w-full gap-3 pt-8">
                    <div className="flex w-full flex-col gap-2">
                      <InputLabel htmlFor="dependencyName">
                        Version Type
                      </InputLabel>
                      <SelectDropdown
                        disabled={isSubmitting}
                        defaultValue="exact"
                        onChange={(value) => {
                          setFieldValue("version", "");
                          setFieldValue("versionType", value);
                        }}
                        options={["exact", "range", "below", "above"]}
                      />
                    </div>

                    <div className="flex w-full flex-col gap-2">
                      <InputLabel htmlFor="dependencyName">
                        Version (Example: {getVersionPlaceholder(versionType)})
                      </InputLabel>

                      <InputField
                        id="version"
                        name="version"
                        style="iconless"
                        disabled={isSubmitting}
                        type="text"
                        placeholder={getVersionPlaceholder(versionType)}
                        onKeyDown={(
                          e: React.KeyboardEvent<HTMLInputElement>
                        ) => {
                          if (e.key === "Enter") {
                            e.preventDefault();

                            if (values.version) {
                              setVersionGuards((prev) => [
                                ...prev,
                                {
                                  type: versionType,
                                  version: values.version,
                                },
                              ]);
                              setFieldValue("version", "");
                            }
                          }
                        }}
                      />
                      <InputError name="version" />
                    </div>

                    <Button
                      className="mt-6"
                      disabled={isSubmitting}
                      intent="white"
                      size="compact"
                      type="button"
                      onClick={() => {
                        if (values.version) {
                          setVersionGuards((prev) => [
                            ...prev,
                            {
                              type: versionType,
                              version: values.version,
                            },
                          ]);
                          setFieldValue("version", "");
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  {versions && versions && (
                    <div className="w-full pt-6">
                      <table
                        cellSpacing={0}
                        className="w-full table-fixed border-collapse border-spacing-0 whitespace-nowrap text-left"
                      >
                        <thead className="border-b border-white-8 text-xs uppercase">
                          <tr className="w-full">
                            <th className="relative w-full overflow-hidden rounded-l-lg py-3 font-normal text-white-56">
                              <span className="pl-3">Type</span>
                            </th>
                            <th className="relative w-full overflow-hidden py-3 font-normal text-white-56">
                              <span>Version</span>
                            </th>
                            <th className="relative w-[28px] overflow-hidden rounded-r-lg py-3"></th>
                          </tr>
                        </thead>

                        <tbody className="text-sm">
                          {versionGuards &&
                            versionGuards.map((version, index) => (
                              <tr
                                className="group border-b border-white-8 last:border-b-0"
                                key={version.version + index}
                              >
                                <td className="py-3 pl-3 text-gray-DARK dark:text-white">
                                  {capitalize(version.type)}
                                </td>
                                <td className="py-3 text-gray-DARK dark:text-white">
                                  {version.version}
                                </td>
                                <td className="w-fit py-3">
                                  <Button
                                    size="icon"
                                    rounded="full"
                                    disabled={isSubmitting}
                                    intent="noBG"
                                    onClick={() => {
                                      setVersionGuards((prev) =>
                                        prev.filter(
                                          (v) => v !== versionGuards[index]
                                        )
                                      );
                                    }}
                                  >
                                    <IconMinusCircle className="w-4 text-white-48 transition-all duration-300 group-hover:text-white" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </ResizablePanel>
              )}
            </AnimatePresence>
          </div>

          <div className="flex w-full justify-end gap-3 rounded-lg border border-white-8 bg-gray-0 px-8 py-6">
            <Button
              fullWidth
              disabled={isSubmitting}
              intent="primary"
              type="submit"
            >
              {isSubmitting && <IconSpinner className="w-4" />}
              Scan
            </Button>
            <Button
              fullWidth
              disabled={isSubmitting}
              intent="mauve"
              onClick={() => {
                if (values.dependencyName) {
                  saveQuery(scanFormToQuery(values, versionGuards));
                }
              }}
              type="button"
            >
              Save query
            </Button>
            <Button
              fullWidth
              onClick={() => {
                setVersionGuards([]);
                setInitialValues({
                  dependencyName: "",
                  exactMatch: false,
                  versionType: "exact",
                  version: "",
                });
              }}
              disabled={isSubmitting}
              intent="mauve"
              type="reset"
            >
              Clear all
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ScanForm;

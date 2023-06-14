import { CheckboxLabel, Checkbox } from "@/components/input/Checkbox";
import { TextField, TextFieldError } from "@/components/input/TextField";
import InputLabel from "@/components/input/InputLabel";
import {
  IconChevron,
  IconDependify,
  IconMinusCircle,
  IconSpinner,
} from "@/components/_other/Icons";
import BodyLarge from "@/components/text/BodyLarge";
import { Formik, Form } from "formik";
import React, { ChangeEvent, useEffect, useState } from "react";
import { getVersionPlaceholder } from "@/utils/version";
import { Button } from "@/components/input/Button";
import SelectDropdown from "@/components/input/SelectDropdown";
import { capitalize } from "@/utils/formatting";
import { AnimatePresence, motion } from "framer-motion";
import { scanFormToQuery, addRecentQuery, saveQuery } from "@/utils/query";
import { VersionGuard, type ScanFormValues, Query } from "@/types/scan";
import { APIResponseScan } from "@/types/api/api-scan";
import Body from "@/components/text/Body";
import useMeasure from "react-use-measure";
import Tooltip from "@/components/status_info/Tooltip";

type Props = {
  setSearchResults: React.Dispatch<
    React.SetStateAction<APIResponseScan | undefined>
  >;
  handleSubmit: (
    formValues: ScanFormValues,
    versionGuards: VersionGuard[]
  ) => void;
};

function ScanForm({ setSearchResults, handleSubmit }: Props) {
  const [guardsRef, guardsBounds] = useMeasure();

  const [versionGuards, setVersionGuards] = useState<VersionGuard[]>([]);
  const [versionsExpanded, setVersionsExpanded] = useState(true);

  const [initialValues, setInitialValues] = useState<ScanFormValues>({
    dependencyName: "",
    exactMatch: false,
    versionType: "exact",
    version: "",
  });

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
    function handleImportQuery(event: CustomEventInit<Query>) {
      importQuery(event.detail as Query);
    }

    window.addEventListener("importQuery", handleImportQuery);

    return () => {
      window.removeEventListener("importQuery", handleImportQuery);
    }
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={async (values, errors) => {
        addRecentQuery(scanFormToQuery(values, versionGuards));
        await new Promise((r) => setTimeout(r, 500));
        await handleSubmit(values, versionGuards);
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
                  <TextField
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
                  <Tooltip
                    className="h-full"
                    text="Dependency name must be identical to input"
                  >
                    <CheckboxLabel className="flex h-full justify-center gap-2 rounded-lg border border-b border-white-8 px-3">
                      <Checkbox
                        checked={values.exactMatch}
                        disabled={isSubmitting}
                        onClick={(e: ChangeEvent<HTMLInputElement>) => {
                          setFieldValue("exactMatch", e.target.checked);
                        }}
                        id="exactMatch"
                        name="exactMatch"
                      />
                      Only exact match
                    </CheckboxLabel>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>

          {/* Version Guards */}
          <div
            key="version-guards"
            className="flex w-full flex-col overflow-hidden rounded-lg border border-white-8 bg-gray-1 pb-8 pt-8"
          >
            <div className="flex w-full cursor-pointer select-none items-center gap-2 px-8 text-white">
              <BodyLarge className="font-medium">Version Guards</BodyLarge>
            </div>

            <div className="flex w-full gap-3 px-8 pt-8">
              <div className="flex w-full flex-col gap-2">
                <InputLabel htmlFor="dependencyName">Version Type</InputLabel>
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
                  Version (Example: {getVersionPlaceholder(values.versionType)})
                </InputLabel>

                <TextField
                  id="version"
                  name="version"
                  style="iconless"
                  disabled={isSubmitting}
                  type="text"
                  placeholder={getVersionPlaceholder(values.versionType)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                      e.preventDefault();

                      if (values.version) {
                        setVersionGuards((prev) => [
                          ...prev,
                          {
                            type: values.versionType,
                            version: values.version,
                          },
                        ]);
                        setFieldValue("version", "");
                      }
                    }
                  }}
                />
                <TextFieldError name="version" />
              </div>

              <Button
                className="mt-6"
                disabled={isSubmitting || !values.version}
                intent="primary"
                size="compact"
                type="button"
                onClick={() => {
                  if (values.version) {
                    setVersionGuards((prev) => [
                      ...prev,
                      {
                        type: values.versionType,
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

            <motion.div
              animate={{
                height:
                  guardsBounds.height > 0 ? guardsBounds.height : undefined,
              }}
              className="overflow-hidden"
              transition={{ duration: 0.3 }}
            >
              <div
                ref={guardsRef}
                className="flex w-full flex-col gap-3 overflow-hidden rounded-lg px-8 pt-8"
              >
                <button
                  type="button"
                  onClick={() => setVersionsExpanded((prev) => !prev)}
                  className="flex w-full items-center gap-2 text-white-56"
                >
                  <IconChevron
                    className={`w-5 -rotate-90  ${
                      versionsExpanded && "rotate-0"
                    } transition-all duration-300`}
                  />
                  <Body>Added</Body>
                </button>

                <AnimatePresence initial={false} mode="popLayout">
                  {versionsExpanded && (
                    <motion.table
                      key={"version-guards"}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      cellSpacing={0}
                      className="w-full table-fixed border-separate border-spacing-0 overflow-hidden whitespace-nowrap text-left"
                    >
                      <thead className="bg-gray-4 text-xs uppercase">
                        <tr className="w-full rounded-lg">
                          <th className="w-full rounded-l-lg border-b border-l border-t border-white-8 py-3 font-normal text-white-56">
                            <span className="pl-3">Type</span>
                          </th>
                          <th className="w-full border-b border-t border-white-8 py-3 font-normal text-white-56">
                            <span>Version</span>
                          </th>
                          <th className="w-[28px] overflow-hidden rounded-r-lg border-b border-r border-t border-white-8 py-3"></th>
                        </tr>
                      </thead>

                      <tbody className="text-sm">
                        <AnimatePresence initial={false}>
                          {versionGuards &&
                            versionGuards.map((version, index) => (
                              <motion.tr
                                transition={{ duration: 0.3 }}
                                className="group"
                                key={
                                  version.version + index + version.type + index
                                }
                              >
                                <td className="py-1 pl-3 text-white-56 group-first-of-type:pt-4">
                                  {capitalize(version.type)}
                                </td>
                                <td className="py-1 text-white-56 group-first-of-type:pt-4">
                                  {version.version}
                                </td>
                                <td className="w-fit py-1 group-first-of-type:pt-4">
                                  <Button
                                    size="icon"
                                    rounded="full"
                                    disabled={isSubmitting}
                                    intent="noBG"
                                    type="button"
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
                              </motion.tr>
                            ))}
                        </AnimatePresence>
                      </tbody>
                    </motion.table>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <div className="flex w-full justify-end gap-3 rounded-lg border border-white-8 bg-gray-0 px-8 py-6">
            <Button
              fullWidth
              disabled={isSubmitting || !values.dependencyName}
              intent="primary"
              type="submit"
            >
              {isSubmitting && <IconSpinner className="w-4" />}
              Scan
            </Button>
            <Button
              fullWidth
              disabled={isSubmitting || !values.dependencyName}
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
              disabled={isSubmitting || !values.dependencyName}
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

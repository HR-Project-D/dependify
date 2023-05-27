import ResizablePanel from "@/components/motion/ResizablePanel";
import { Button } from "@/components/input/Button";
import SelectDropdown from "@/components/input/SelectDropdown";
import InputError from "@/components/input/input/InputError";
import { InputField } from "@/components/input/input/InputField";
import InputLabel from "@/components/input/input/InputLabel";
import { IconChevron, IconSpinner } from "@/components/_other/Icons";
import Body from "@/components/text/Body";
import BodyLarge from "@/components/text/BodyLarge";
import { VersionGuard } from "@/types/scan";
import { capitalize } from "@/utils/formatting";
import { VersionType, getVersionPlaceholder } from "@/utils/version";
import { Formik, Form } from "formik";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

function VersionGuards({
  versions,
  addVersionGuard,
  removeVersionGuard,
}: {
  versions: Array<VersionGuard>;
  addVersionGuard: (value: VersionGuard) => void;
  removeVersionGuard: (value: VersionGuard) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [versionType, setVersionType] = useState<VersionType>("exact"); // exact, range, below, above

  return (
    <>
      <div className="flex w-full flex-col items-center justify-between rounded-lg border border-white-8 bg-gray-1 pb-8 pt-8">
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
              <div className="flex w-full flex-col pt-8">
                <Formik
                  initialValues={{
                    type: "exact",
                    version: "",
                  }}
                  onSubmit={async (values, errors) => {
                    if (values.version) {
                      addVersionGuard({
                        type: versionType,
                        version: values.version,
                      });
                    }
                  }}
                  validateOnMount={false}
                  validateOnBlur={false}
                  validateOnChange={true}
                >
                  {({ isSubmitting, setFieldValue, values }) => (
                    <Form className="flex w-full gap-3">
                      <div className="flex w-full flex-col gap-2">
                        <InputLabel htmlFor="dependencyName">
                          Version Type
                        </InputLabel>
                        <SelectDropdown
                          defaultValue="exact"
                          onChange={(value) => {
                            setFieldValue("version", "");
                            setVersionType(value as VersionType);
                          }}
                          options={["exact", "range", "below", "above"]}
                        />
                      </div>

                      <div className="flex w-full flex-col gap-2">
                        <InputLabel htmlFor="dependencyName">
                          Version (Example: {getVersionPlaceholder(versionType)}
                          )
                        </InputLabel>

                        <InputField
                          id="version"
                          name="version"
                          style="iconless"
                          type="text"
                          placeholder={getVersionPlaceholder(versionType)}
                        />
                        <InputError name="version" />
                      </div>

                      <Button
                        className="mt-6"
                        disabled={isSubmitting}
                        intent="white"
                        size="compact"
                        type="submit"
                      >
                        {isSubmitting && <IconSpinner className="w-4" />}
                        Add
                      </Button>
                    </Form>
                  )}
                </Formik>
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
                        <th className="relative w-[70px] overflow-hidden rounded-r-lg py-3"></th>
                      </tr>
                    </thead>

                    <tbody className="text-sm">
                      {versions.map((version, index) => (
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
                              size="compact"
                              intent="noBG"
                              onClick={() => {
                                removeVersionGuard(version);
                              }}
                            >
                              Remove
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
    </>
  );
}

export default VersionGuards;

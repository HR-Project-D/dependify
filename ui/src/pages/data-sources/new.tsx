import { IconSpinner } from "@/components/_other/Icons";
import Layout from "@/components/_other/Layout";
import { Button } from "@/components/input/Button";
import { TextField, TextFieldError } from "@/components/input/TextField";
import BodyBase from "@/components/text/BodyBase";
import BodyLarge from "@/components/text/BodyLarge";
import TitleLarge from "@/components/text/TitleLarge";
import { Formik, Form } from "formik";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useState } from "react";
import { formAnimationProps } from "../setup";

export default function Page() {
  const [step, setStep] = useState<"configure" | "add-key" | "clone">(
    "configure"
  );
  const [SSHKey, setSSHKey] = useState("");

  async function handleAddDataSource(values: { label: string; url: string }) {
    // TODO: Add data source

    setStep("add-key");
  }

  return (
    <Layout>
      <div className="flex h-full w-full max-w-7xl flex-col gap-16 pt-8">
        <div className="flex w-full flex-col gap-8">
          <div>
            <TitleLarge className="mb-2">Add a new data source</TitleLarge>
            <BodyBase className="text-white-56">
              Add a new data source by filling in the form below and clicking
              the "Add" button. After confirming the data source you will need
              to add the SSH key that is shown to your GitHub repository as a
              deploy key.
            </BodyBase>
          </div>
        </div>

        <div className="flex w-full gap-16">
          <aside className="flex h-fit min-w-[320px] flex-col gap-8 rounded-lg pt-2.5">
            <div className="flex flex-col gap-0">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex h-1.5 w-1.5 items-center justify-center rounded-full bg-white"></div>
                  <div
                    className={`flex h-12 w-px items-center justify-center rounded-full transition-colors duration-300
                  ${step === "add-key" || step === "clone" ? "bg-white" : "bg-white-16"}
                  `}
                  ></div>
                </div>
                <span className="-mt-2">Configure data source</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-1.5 w-1.5 items-center justify-center rounded-full transition-colors duration-300
                    ${step === "add-key" || step === "clone" ? "bg-white" : "bg-white-16"}
                  `}
                  ></div>
                  <div className={`flex h-12 w-px items-center justify-center rounded-full
                  ${step === "clone" ? "bg-white" : "bg-white-16"}
                  `}></div>
                </div>
                <span className="-mt-2">Add deploy key</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-1.5 w-1.5 items-center justify-center rounded-full transition-colors duration-300
                    ${step === "clone" ? "bg-white" : "bg-white-16"}
                  `}
                  ></div>
                </div>
                <span className="-mt-2">Start cloning</span>
              </div>
            </div>

            <hr className="border-black-8 dark:border-white-8" />
          </aside>

          <MotionConfig
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100,
            }}
          >
            <AnimatePresence>
              {step === "configure" && (
                <Formik
                  initialValues={{
                    label: "",
                    url: "",
                  }}
                  onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 3000));
                    handleAddDataSource(values);
                  }}
                  validateOnBlur={false}
                  validateOnChange={false}
                >
                  {({ values, isValidating, isSubmitting }) => (
                    <Form className="flex w-full flex-col items-center gap-8">
                      <div className="flex w-full flex-col gap-5">
                        <TextField
                          id="label"
                          name="label"
                          validate={(value: string) => {
                            if (value === "") {
                              return "Label is required";
                            }

                            if (!/^[a-zA-Z0-9 -]*$/.test(value)) {
                              return "Label can only contain letters, numbers, spaces and hyphens";
                            }

                            if (value.length < 3) {
                              return "Label must be at least 3 characters";
                            }

                            if (value.length > 32) {
                              return "Label must be less than 32 characters";
                            }
                          }}
                          style="iconless"
                          type="text"
                          placeholder="Label"
                        />
                        <TextFieldError name="label" />
                        <TextField
                          id="uri"
                          name="uri"
                          style="iconless"
                          type="text"
                          placeholder="URI"
                        />
                      </div>
                      <div className="flex w-full gap-4">
                        <Button
                          disabled={isSubmitting || isValidating}
                          intent="white"
                          fullWidth
                          type="submit"
                        >
                          {(isSubmitting || isValidating) && (
                            <IconSpinner className="w-4" />
                          )}
                          Continue
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}

              {step === "add-key" && (
                <motion.div
                  {...formAnimationProps}
                  className="flex h-full w-full flex-col justify-between gap-16 rounded-lg bg-gray-1 p-8"
                >
                  <div>
                    <div className="flex flex-col gap-4 px-2">
                      <BodyLarge>
                        Add the following SSH key to your GitHub repository as a
                        deploy key.
                      </BodyLarge>
                      <BodyBase>SHA256: </BodyBase>
                    </div>
                  </div>

                  <Button
                    className="z-20"
                    fullWidth
                    onClick={() => setStep("clone")}
                    intent="white"
                  >
                    Continue
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </MotionConfig>
        </div>
      </div>
    </Layout>
  );
}

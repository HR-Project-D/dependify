import { Button } from "@/components/input/Button";
import { InputField } from "@/components/input/input/InputField";
import { IconDependify, IconKey, IconSpinner } from "@/components/_other/Icons";
import { Form, Formik } from "formik";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useState } from "react";

export default function Page() {
  const [currentStep, setCurrentStep] = useState(0);

  const textAnimationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  } as const;

  const formAnimationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  } as const;

  const steps = [
    {
      text: "Welcome",
      paragraph:
        "Please enter the key that was displayed in the console when you created the docker container.",
    },
    {
      text: "Create Admin",
      paragraph:
        "Please enter the information for the first admin user. You can always create more users later.",
    },
    {
      text: "Setup Completed",
      paragraph: "Dependify is ready for you!",
    },
  ] as const;

  return (
      <div className="dark bg-gray-DARK flex min-h-screen  w-full flex-col items-center justify-center gap-16 p-4">
        <MotionConfig
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 100,
          }}
        >
          <header className="flex max-w-md flex-col items-center gap-12">
            <IconDependify className="w-24 text-gray-6" />
            <div className="flex flex-col items-center gap-2 text-center">
              <AnimatePresence mode="popLayout">
                {steps.map(
                  (step, index) =>
                    currentStep === index && (
                      <motion.h1
                        key={`step-${index}-h1`}
                        {...textAnimationProps}
                        className="text-3xl font-semibold text-white"
                      >
                        {step.text}
                      </motion.h1>
                    )
                )}
                {steps.map(
                  (step, index) =>
                    currentStep === index && (
                      <motion.p
                        key={`step-${index}-p`}
                        {...textAnimationProps}
                        className="text-gray-10"
                      >
                        {step.paragraph}
                      </motion.p>
                    )
                )}
              </AnimatePresence>
            </div>
          </header>

          <AnimatePresence mode="popLayout">
            {currentStep === 0 && (
              <motion.div
                key={"step-0-form"}
                {...formAnimationProps}
                className="w-full max-w-sm"
              >
                <Formik
                  initialValues={{
                    key: "",
                  }}
                  onSubmit={async (values, errors) => {
                    await new Promise((r) => setTimeout(r, 3000));
                    setCurrentStep((prev) => prev + 1);
                  }}
                  validateOnBlur={false}
                  validateOnChange={false}
                >
                  {({ errors, isSubmitting }) => (
                    <Form className="flex w-full flex-col items-center gap-8">
                      <InputField
                        icon={<IconKey className="w-5 text-gray-10" />}
                        id="key"
                        name="key"
                        style="icon"
                        type="text"
                        placeholder="Enter your key here"
                      />
                      <div className="flex gap-4">
                        <Button
                          disabled={isSubmitting}
                          intent="mauveDark"
                          rounded="full"
                        >
                          What is this?
                        </Button>
                        <Button
                          disabled={isSubmitting}
                          intent="white"
                          rounded="full"
                          type="submit"
                        >
                          {isSubmitting && <IconSpinner className="w-4" />}
                          Continue
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </motion.div>
            )}
            {currentStep === 1 && (
              <motion.div
                key={"step-1-form"}
                {...formAnimationProps}
                className="w-full max-w-sm"
              >
                <Formik
                  initialValues={{
                    fullName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  }}
                  onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 3000));
                    setCurrentStep((prev) => prev + 1);
                  }}
                  validateOnBlur={false}
                  validateOnChange={false}
                >
                  {({ errors, touched, isValidating, isSubmitting }) => (
                    <Form className="flex w-full flex-col items-center gap-8">
                      <div className="flex w-full flex-col gap-5">
                        <InputField
                          id="fullName"
                          name="fullName"
                          style="iconless"
                          type="text"
                          placeholder="Full Name"
                        />
                        <InputField
                          id="email"
                          name="email"
                          style="iconless"
                          type="email"
                          placeholder="Email"
                        />
                        <InputField
                          id="password"
                          name="password"
                          style="iconless"
                          type="password"
                          placeholder="Password"
                        />
                        <InputField
                          id="confirmPassword"
                          name="confirmPassword"
                          style="iconless"
                          type="password"
                          placeholder="Confirm Password"
                        />
                      </div>
                      <div className="flex gap-4">
                        <Button
                          disabled={isSubmitting}
                          intent="mauveDark"
                          rounded="full"
                        >
                          What is this?
                        </Button>
                        <Button
                          disabled={isSubmitting}
                          intent="white"
                          rounded="full"
                          type="submit"
                        >
                          {isSubmitting && <IconSpinner className="w-4" />}
                          Continue
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </motion.div>
            )}
            {currentStep === 2 && (
              <motion.div
                key={"step-2-form"}
                {...formAnimationProps}
                className="w-full max-w-sm flex items-center justify-center"
              >
                <div className="flex gap-4">
                  <Button
                    intent="white"
                    rounded="full"
                    type="submit"
                  >
                    Get Started
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </MotionConfig>
      </div>
  );
}

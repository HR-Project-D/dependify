import { Button } from "@/components/input/Button";
import { TextField } from "@/components/input/TextField";
import { IconDependify, IconKey, IconSpinner } from "@/components/_other/Icons";
import { Form, Formik } from "formik";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useState } from "react";
import { AuthService } from "@/services/AuthService";
import Link from "next/link";

export const textAnimationProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
} as const;

export const formAnimationProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
} as const;

export default function Page() {
  const [currentStep, setCurrentStep] = useState(0);
  const [registrationKey, setRegistrationKey] = useState("");

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

  async function handleSubmitKey(values: { key: string }) {
    try {
      const response = await AuthService.setup({ key: values.key });

      if (response.status === "fail") {
        alert("Invalid key provided. Please try again.");
        return;
      }

      if (response.registration_key) {
        setRegistrationKey(response.registration_key);
        setCurrentStep((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRegister(values: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    if (values.password !== values.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await AuthService.setup_registration({
        name: values.fullName,
        email: values.email,
        password: values.password,
        role: "admin",
        key: registrationKey,
      });

      if (response.error) {
        alert(response.error);
        return;
      }

      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="dark invert flex min-h-screen w-full  flex-col items-center justify-center gap-16 bg-gray-DARK p-4">
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
                  handleSubmitKey(values);
                }}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ errors, isSubmitting }) => (
                  <Form className="flex w-full flex-col items-center gap-8">
                    <TextField
                      icon={<IconKey className="w-5 text-gray-10" />}
                      id="key"
                      name="key"
                      style="icon"
                      type="text"
                      placeholder="Enter your key here"
                    />
                    <div className="flex w-full gap-4">
                      <Button
                        disabled={isSubmitting}
                        fullWidth
                        intent="transparent"
                      >
                        What is this?
                      </Button>
                      <Button
                        disabled={isSubmitting}
                        intent="white"
                        fullWidth
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
                  handleRegister(values);
                }}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ errors, touched, isValidating, isSubmitting }) => (
                  <Form className="flex w-full flex-col items-center gap-8">
                    <div className="flex w-full flex-col gap-5">
                      <TextField
                        id="fullName"
                        name="fullName"
                        style="iconless"
                        type="text"
                        placeholder="Full Name"
                      />
                      <TextField
                        id="email"
                        name="email"
                        style="iconless"
                        type="email"
                        placeholder="Email"
                      />
                      <TextField
                        id="password"
                        name="password"
                        style="iconless"
                        type="password"
                        placeholder="Password"
                      />
                      <TextField
                        id="confirmPassword"
                        name="confirmPassword"
                        style="iconless"
                        type="password"
                        placeholder="Confirm Password"
                      />
                    </div>
                    <div className="flex w-full gap-4">
                      <Button
                        disabled={isSubmitting}
                        intent="transparent"
                        fullWidth
                      >
                        What is this?
                      </Button>
                      <Button
                        disabled={isSubmitting}
                        intent="white"
                        fullWidth
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
              className="flex w-full max-w-sm items-center justify-center"
            >
              <div className="flex w-full gap-4">
                <Link className="w-full" href="/login">
                  <Button intent="white" fullWidth type="submit">
                    Get Started
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
}

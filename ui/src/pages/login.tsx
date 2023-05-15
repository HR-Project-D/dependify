import { Button } from "@/components/primitives/Button";
import { InputField } from "@/components/primitives/input/InputField";
import { IconDependify, IconKey, IconSpinner } from "@/components/shared/Icons";
import { Form, Formik } from "formik";
import { AnimatePresence, steps, motion } from "framer-motion";

export default function Page() {
  //const session = useSession();

  return (
    <div className="dark bg-gray-DARK flex min-h-screen w-full flex-col items-center justify-center gap-16 p-4">
      <header className="flex max-w-md flex-col items-center gap-12">
        <IconDependify className="w-24 text-gray-6" />
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-semibold text-white">Welcome</h1>

          <p className="text-gray-10">
            If you have previously skipped the setup of an admin user: use the
            username: “admin” and the admin password you used to access the
            setup
          </p>
        </div>
      </header>
      <div className="w-full max-w-sm">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values, errors) => {
            await new Promise((r) => setTimeout(r, 3000));
          }}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ errors, isSubmitting }) => (
            <Form className="flex w-full flex-col items-center gap-8">
              <div className="flex w-full flex-col gap-5">
                <InputField
                  id="email"
                  name="email"
                  style="iconless"
                  type="text"
                  placeholder="Email"
                />
                <InputField
                  id="password"
                  name="password"
                  style="iconless"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="flex gap-4">
                <Button
                  disabled={isSubmitting}
                  intent="mauveDark"
                  size="large"
                  rounded="full"
                >
                  Forgot Password?
                </Button>
                <Button
                  disabled={isSubmitting}
                  intent="white"
                  size="large"
                  rounded="full"
                  type="submit"
                >
                  {isSubmitting && <IconSpinner className="w-4" />}
                  Sign In
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

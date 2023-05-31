import { Button } from "@/components/input/Button";
import { TextField } from "@/components/input/TextField";
import { IconDependify, IconSpinner } from "@/components/_other/Icons";
import Body from "@/components/text/Body";
import Title from "@/components/text/Title";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-8">
      <div className="z-10 flex w-full max-w-7xl items-center justify-center">
        <div className="flex w-full max-w-md flex-col items-center gap-16 rounded-lg p-8 pt-20">
          <header className="flex w-full flex-col items-center gap-8">
            <IconDependify className="w-16 text-white" />
            <div className="flex flex-col items-center gap-4">
              <Title>Sign in to Dependify</Title>
              <Body className="text-center text-white-48">
                If you have previously skipped the setup of an admin user: use
                the username: “admin” and the admin password you used to access
                the setup
              </Body>
            </div>
          </header>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values, errors) => {
              await new Promise((r) => setTimeout(r, 3000));
              router.push("/");
            }}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ errors, isSubmitting }) => (
              <Form className="flex w-full flex-col items-center gap-10">
                <div className="flex w-full flex-col gap-5">
                  <TextField
                    id="email"
                    name="email"
                    style="iconless"
                    type="text"
                    placeholder="Email"
                  />
                  <TextField
                    id="password"
                    name="password"
                    style="iconless"
                    type="password"
                    placeholder="Password"
                  />
                  {/* <Button
                    className="text-white-48 -mt-1"
                    intent="hyperlink"
                    size="hyperlink"
                    disabled={isSubmitting}
                    type="button"
                  >
                    {isSubmitting && <IconSpinner className="w-4" />}
                    Forgot Password?
                  </Button> */}
                </div>
                <div className="flex w-full flex-col gap-3">
                  <Button
                    intent="transparent"
                    fullWidth
                    disabled={isSubmitting}
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
    </div>
  );
}

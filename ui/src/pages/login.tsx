import { Button } from "@/components/input/Button";
import { InputField } from "@/components/input/input/InputField";
import { IconDependify, IconKey, IconSpinner } from "@/components/_other/Icons";
import Body from "@/components/text/Body";
import BodyBase from "@/components/text/BodyBase";
import Subtitle from "@/components/text/Subtitle";
import Title from "@/components/text/Title";
import TitleLarge from "@/components/text/TitleLarge";
import { Form, Formik } from "formik";
import { AnimatePresence, steps, motion } from "framer-motion";
import { useRouter } from "next/router";

export default function Page() {
  //const session = useSession();
  const router = useRouter();

  return (
    <div className="dark flex min-h-screen w-full flex-col items-center justify-center bg-gray-DARK p-8">
      <div className="flex w-full max-w-7xl items-center justify-center">
        <div className="flex w-full max-w-md flex-col items-center gap-16 rounded-lg p-8 pt-20">
          <header className="flex w-full flex-col items-center gap-8">
            <IconDependify className="w-16 text-white" />
            <div className="flex flex-col items-center gap-4">
              <Title>Sign in to Dependify</Title>
              <Body className="text-white-56 text-center">
                If you have previously skipped the setup of an admin user: use
                the username: “admin” and the admin password you used to access
                the setup
              </Body>

              {/* <BodyBase>
                If you have previously skipped the setup of an admin user: use
                the username: “admin” and the admin password you used to access
                the setup
              </BodyBase> */}
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
              <Form className="flex w-full flex-col items-center gap-8">
                <div className="mb-12 flex w-full flex-col gap-5">
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
                <div className="flex w-full gap-4">
                  <Button disabled={isSubmitting} fullWidth type="submit">
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

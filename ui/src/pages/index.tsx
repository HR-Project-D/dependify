import Layout from "@/components/_other/Layout";
import { Button } from "@/components/input/Button";
import { IconGithub } from "@/components/_other/Icons";
import BodyBase from "@/components/text/BodyBase";
import BodyLarge from "@/components/text/BodyLarge";
import Subtitle from "@/components/text/Subtitle";
import TitleLarge from "@/components/text/TitleLarge";
import Link from "next/link";
import withAuth from "@/components/_other/auth/WithAuth";
import { MagicCardWrapper } from "@/components/motion/MagicCard";
import ComponentWrapper from "@/components/_other/auth/ComponentWrapper";
import { useSession } from "@/utils/session";
import { useRouter } from "next/router";

function Page() {
  const router = useRouter();

  return (
    <Layout>
      <div className="flex h-full w-full max-w-7xl flex-col gap-24 pt-8">
        <header className="flex flex-col gap-5">
          <div className="flex flex-col">
            <Subtitle>Welcome to Dependify</Subtitle>
            <TitleLarge>Start managing your dependencies</TitleLarge>
          </div>
          <div className="flex flex-col gap-5">
            <BodyBase className="max-w-lg">
              Follow the streamlined process to setup your first data sources
              and start using Dependify to get insights into your
              vulnerabilities.
            </BodyBase>
            <Link href="data-sources" className="max-w-xs">
              <Button fullWidth>Get Started</Button>
            </Link>
          </div>
        </header>

        <MagicCardWrapper className="grid w-full grid-cols-3 gap-3">
          <GridItem
            title="Connect your data sources"
            description="Data sources are the places where your SBOM's are stored. You can add multiple repositories."
            image="/images/dashboard-datasources.png"
            action={{
              text: "Add source",
              onClick: () => {
                router.push("/data-sources");
              },
            }}
          />
          <GridItem
            title="Scan your data sources"
            description="You can scan your data sources to find out if you are using certain dependencies."
            image="/images/dashboard-scan.png"
            action={{
              text: "Scan",
              onClick: () => {
                router.push("/scans");
              },
            }}
          />
          {/* <GridItem
            title="Setup alerts"
            description="You can configure alerts to be notified when a combination of dependency and version is found."
            icon={<IconGithub />}
            action={{
              text: "Add alert",
              onClick: () => {},
            }}
          /> */}
        </MagicCardWrapper>
      </div>
    </Layout>
  );
}

export default ComponentWrapper(withAuth(Page));

export function GridItem({
  title,
  description,
  image,
  action,
}: {
  title: string;
  description: string;
  image: string;
  action: {
    text: string;
    onClick: () => void;
  };
}) {
  return (
    <li className="flex h-full flex-col justify-between gap-16 p-6 rounded-lg bg-gray-1">
      <div>
        <img
          className="mb-6 aspect-[4/2] rounded-lg object-cover object-center drop-shadow"
          src={image}
          width={1600}
          height={1200}
        />

        <div className="flex flex-col gap-4 px-2">
          <BodyLarge>{title}</BodyLarge>
          <BodyBase>{description}</BodyBase>
        </div>
      </div>

      <Button
        className="z-20"
        onClick={action.onClick}
        intent="mauve"
        fullWidth
      >
        {action.text}
      </Button>
    </li>
  );
}

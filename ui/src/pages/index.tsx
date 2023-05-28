import Layout from "@/components/_other/Layout";
import { Button } from "@/components/input/Button";
import { IconGithub } from "@/components/_other/Icons";
import BodyBase from "@/components/text/BodyBase";
import BodyLarge from "@/components/text/BodyLarge";
import Subtitle from "@/components/text/Subtitle";
import TitleLarge from "@/components/text/TitleLarge";
import Link from "next/link";
import withAuth from "@/components/_other/auth/WithAuth";
import { MagicCard, MagicCardGrid } from "@/components/motion/MagicCard";

function Page() {
  return (
    <Layout>
      <div className="flex h-full w-full max-w-7xl flex-col gap-32 pt-8">
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

        <MagicCardGrid className="grid-cols-3 gap-3">
          <GridItem
            title="Create more users"
            description="You can create more users to collaborate with your team."
            icon={<IconGithub />}
            action={{
              text: "Create user",
              onClick: () => {},
            }}
          />
          <GridItem
            title="Connect your data sources"
            description="Data sources are the places where your SBOM's are stored. You can add multiple repositories."
            icon={<IconGithub />}
            action={{
              text: "Add source",
              onClick: () => {},
            }}
          />
          <GridItem
            title="Configure alerts"
            description="You can configure alerts to be notified when a combination of dependency and version is found."
            icon={<IconGithub />}
            action={{
              text: "Add alert",
              onClick: () => {},
            }}
          />
        </MagicCardGrid>
      </div>
    </Layout>
  );
}

export default withAuth(Page);

export function GridItem({
  title,
  description,
  icon,
  action,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: {
    text: string;
    onClick: () => void;
  };
}) {
  return (
    <li className="flex h-full flex-col justify-between gap-16 bg-gray-1 rounded-lg p-8">
      <div className="flex flex-col gap-4">
        <BodyLarge>{title}</BodyLarge>
        <BodyBase>{description}</BodyBase>
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

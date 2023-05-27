import { Command } from "cmdk";
import Item from "../CMDKItem";
import { ProjectsIcon, PlusIcon, TeamsIcon, DocsIcon, FeedbackIcon, ContactIcon } from "../Icons";
import { useUserContext } from "@/state/User";
import { IconMonitor, IconLogout } from "@/components/_other/Icons";

type HomeProps = {
  searchDataSources: Function;
  searchThemes: Function;
};

function Home({ searchDataSources, searchThemes }: HomeProps) {
  const { state: userState, dispatch: userDispatch } = useUserContext();
  
  return (
    <>
      <Command.Group heading='Data Sources'>
        <Item shortcut='⇧ D' onSelect={() => searchDataSources()}>
          <ProjectsIcon />
          Search Data Sources...
        </Item>
        <Item>
          <PlusIcon />
          Add Data Source
        </Item>
      </Command.Group>
      <Command.Group heading='Users'>
        <Item shortcut='⇧ U'>
          <TeamsIcon />
          Search Users...
        </Item>
        <Item>
          <PlusIcon />
          Create New User
        </Item>
      </Command.Group>
      <Command.Group heading='General'>
        <Item onSelect={() => searchThemes()}>
          <IconMonitor />
          Change Theme...
        </Item>
        <Item onSelect={() => window.open("https://github.com/HR-Project-D/dependify")}>
          <DocsIcon />
          View Documentation
        </Item>
        <Item onSelect={() => window.open("https://github.com/HR-Project-D/dependify/issues")}>
          <FeedbackIcon />
          Report an Issue
        </Item>
        <Item onSelect={() => userDispatch({ type: "LOGOUT" })}>
          <IconLogout />
          Sign Out
        </Item>
      </Command.Group>
    </>
  );
}

export default Home;

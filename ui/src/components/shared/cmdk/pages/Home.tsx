import { Command } from "cmdk";
import Item from "../CMDKItem";
import { IconLogout, IconMonitor } from "../../Icons";
import { ProjectsIcon, PlusIcon, TeamsIcon, DocsIcon, FeedbackIcon, ContactIcon } from "../Icons";

type HomeProps = {
  searchDataSources: Function;
  searchThemes: Function;
};

function Home({ searchDataSources, searchThemes }: HomeProps) {
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
        <Item>
          <DocsIcon />
          View Documentation
        </Item>
        <Item>
          <FeedbackIcon />
          Report an Issue
        </Item>
        <Item>
          <IconLogout />
          Sign Out
        </Item>
      </Command.Group>
    </>
  );
}

export default Home;

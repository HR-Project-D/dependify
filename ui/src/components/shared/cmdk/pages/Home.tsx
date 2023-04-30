import { Command } from "cmdk";
import { ProjectsIcon, PlusIcon, TeamsIcon, FeedbackIcon, DocsIcon, ContactIcon } from "../../Icons";
import Item from "../CMDKItem";

function Home({ searchProjects }: { searchProjects: Function }) {
  return (
    <>
      <Command.Group heading='Data Sources'>
        <Item
          shortcut='⇧ D'
          onSelect={() => {
            searchProjects();
          }}
        >
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
        <Item>
          <FeedbackIcon />
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
          <ContactIcon />
          Sign Out
        </Item>
      </Command.Group>
    </>
  );
}

export default Home;
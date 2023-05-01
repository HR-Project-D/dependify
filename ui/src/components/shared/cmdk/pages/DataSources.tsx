import { GitHubIcon } from "../../Icons";
import Item from "../CMDKItem";

function DataSources() {
  return (
    <>
      <Item>
        <GitHubIcon className="w-4 dark:fill-white fill-black" />
        Purple Unicorn
      </Item>
      <Item>
        <GitHubIcon />
        Cosmic Jellyfish
      </Item>
      <Item>
        <GitHubIcon />
        Enchanted Tiger
      </Item>
      <Item>
        <GitHubIcon />
        Magical Narwhal
      </Item>
    </>
  );
}

export default DataSources;
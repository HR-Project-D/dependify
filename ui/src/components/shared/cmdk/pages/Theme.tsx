import { useTheme } from "next-themes";
import { IconMonitor, IconMoon, IconSun } from "../../Icons";
import Item from "../CMDKItem";

function Theme({ onClose }: { onClose: Function }) {
  const { setTheme } = useTheme();

  return (
    <>
      <Item
        onSelect={() => {
          onClose();
          setTheme("dark");
        }}
      >
        <IconMoon />
        Change theme to Dark
      </Item>
      <Item
        onSelect={() => {
          onClose();
          setTheme("light");
        }}
      >
        <IconSun />
        Change theme to Light
      </Item>
      <Item
        onSelect={() => {
          onClose();
          setTheme("system");
        }}
      >
        <IconMonitor />
        Change theme to System
      </Item>
    </>
  );
}

export default Theme;

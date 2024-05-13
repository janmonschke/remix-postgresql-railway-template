import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { IconButton, IconButtonProps } from "@radix-ui/themes";
import { useFetcher } from "@remix-run/react";
import clsx from "clsx";
import { MouseEvent, useCallback, useState } from "react";
import { useInitialTheme } from "~/helpers/initial-theme-context";

import "./ThemeSwitcher.css";

export function ThemeSwitcher({
  variant = "soft",
  size = "2",
}: {
  variant?: "soft" | "ghost";
  size?: IconButtonProps["size"];
}) {
  const { submit } = useFetcher();
  const initialTheme = useInitialTheme();
  const [theme, setTheme] = useState(initialTheme);

  const onToggleTheme = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      const currentTheme = document.body.classList.contains("dark")
        ? "dark"
        : "light";

      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.body.classList.remove(currentTheme);
      document.body.classList.add(newTheme);
      submit(
        { theme: newTheme },
        {
          action: "/user-preferences",
          method: "post",
          navigate: false,
        }
      );
      setTheme(newTheme);
    },
    [submit]
  );

  const title = `Current theme: ${theme}. Press to switch to ${
    theme === "dark" ? "light" : "dark"
  } theme.`;

  return (
    <IconButton
      className={clsx("ThemeSwitcher", theme)}
      variant={variant}
      onClick={onToggleTheme}
      radius="full"
      title={title}
      size={size}
    >
      <MoonIcon className="DarkTheme" />
      <SunIcon className="LightTheme" />
    </IconButton>
  );
}

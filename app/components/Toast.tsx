import { Box, Flex, IconButton } from "@radix-ui/themes";
import { Form, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import cx from "clsx";
import { Cross2Icon } from "@radix-ui/react-icons";
import type { Toast as ToastType } from "~/helpers/types";
import "./Toast.css";

export function Toast({ toast }: { toast?: ToastType }) {
  const location = useLocation();
  const [isInDOM, setIsInDOM] = useState(false);
  useEffect(() => {
    if (toast) {
      requestAnimationFrame(() => setIsInDOM(true));
    } else {
      requestAnimationFrame(() => setIsInDOM(false));
    }
  }, [toast]);

  if (!toast) {
    return null;
  }

  return (
    <Box
      className={cx(
        "Toast",
        isInDOM && "m-isInDom",
        toast.type === "success" && "m-success",
        toast.type === "error" && "m-error"
      )}
      role="alert"
      aria-labelledby="toast-label"
    >
      <Flex
        justify="center"
        align="center"
        gap="2"
        p="4"
        className="ToastContent"
      >
        <span id="toast-label">{toast.message}</span>
        <Form method="get" action={location.pathname}>
          <IconButton
            color={toast.type === "error" ? "bronze" : "blue"}
            type="submit"
            radius="medium"
            variant="soft"
            aria-label="Dismiss"
            size="1"
          >
            <Cross2Icon />
          </IconButton>
        </Form>
      </Flex>
    </Box>
  );
}

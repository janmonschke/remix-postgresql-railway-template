import { type PropsWithChildren } from "react";
import { Link as RemixLink } from "@remix-run/react";
import { Link as RadixLink } from "@radix-ui/themes";

interface Props extends PropsWithChildren {
  to: string;
  reloadDocument?: boolean;
}

export function Link({ children, to, reloadDocument = false }: Props) {
  return (
    <RadixLink asChild>
      <RemixLink reloadDocument={reloadDocument} to={to}>
        {children}
      </RemixLink>
    </RadixLink>
  );
}

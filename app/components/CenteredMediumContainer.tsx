import type { PropsWithChildren } from "react";
import "./CenteredMediumContainer.css";

export function CenteredMediumContaner({ children }: PropsWithChildren) {
  return (
    <div className="CenteredMediumContainer">
      <div className="CenteredMediumContainerContent">{children}</div>
    </div>
  );
}

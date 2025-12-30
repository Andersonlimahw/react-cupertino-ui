import * as React from "react";
import { User } from "lucide-react";

import { cn } from "@/lib/utils";

import "./index.scss";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "sm" | "lg" | "xl";
  src?: string;
  alt?: string;
  fallback?: string;
  icon?: React.ReactNode;
  shape?: "circle" | "rounded" | "square";
  glow?: boolean;
  status?: "online" | "offline" | "busy" | "away";
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      size = "default",
      src,
      alt = "Avatar",
      fallback,
      icon,
      shape = "circle",
      glow = false,
      status,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);
    const initials = fallback
      ? fallback
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "";
    const showImage = src && !imageError;

    return (
      <div
        ref={ref}
        className={cn(
          "react-cupertino-ui-avatar",
          `size-${size}`,
          `shape-${shape}`,
          glow && "has-glow",
          className
        )}
        data-status={status}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className="react-cupertino-ui-avatar__image"
            onError={() => setImageError(true)}
          />
        ) : initials ? (
          <span className="react-cupertino-ui-avatar__fallback">{initials}</span>
        ) : icon ? (
          <span className="react-cupertino-ui-avatar__icon">{icon}</span>
        ) : (
          <User className="react-cupertino-ui-avatar__icon" />
        )}

        {status && <span className="react-cupertino-ui-avatar__status" aria-hidden="true" />}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };

export default Avatar;

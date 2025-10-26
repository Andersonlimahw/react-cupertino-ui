import * as React from "react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

import "./index.scss";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  size?: "default" | "sm" | "lg" | "xl";
  src?: string;
  alt?: string;
  fallback?: string;
  icon?: React.ReactNode;
  shape?: "circle" | "rounded" | "square";
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
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    const showImage = src && !imageError;
    const initials = fallback
      ? fallback
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "";

    return (
      <div
        ref={ref}
        className={cn(
          "react-cupertino-ui-avatar",
          `size-${size}`,
          `shape-${shape}`,
          className
        )}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className="react-cupertino-ui-avatar-image"
            onError={handleImageError}
          />
        ) : fallback ? (
          <span className="react-cupertino-ui-avatar-fallback">{initials}</span>
        ) : icon ? (
          <span className="react-cupertino-ui-avatar-icon">{icon}</span>
        ) : (
          <User className="react-cupertino-ui-avatar-default-icon" />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };

export default Avatar;

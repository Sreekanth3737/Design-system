import * as React from "react";
import { cn } from "../../../utils/cn";
import { Avatar } from "../../atoms/Avatar";
import { Badge } from "../../atoms/Badge";

export interface UserProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  email?: string;
  role?: string;
  avatar?: string;
  status?: "online" | "offline" | "away";
  avatarSize?: "sm" | "default" | "lg" | "xl";
  layout?: "horizontal" | "vertical";
}

const UserProfile = React.forwardRef<HTMLDivElement, UserProfileProps>(
  (
    {
      className,
      name,
      email,
      role,
      avatar,
      status,
      avatarSize = "default",
      layout = "horizontal",
      ...props
    },
    ref
  ) => {
    const statusColors = {
      online: "bg-green-500",
      offline: "bg-gray-400",
      away: "bg-yellow-500",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3",
          layout === "vertical" && "flex-col text-center",
          className
        )}
        {...props}
      >
        <div className="relative">
          <Avatar
            src={avatar}
            alt={name}
            fallback={name.charAt(0).toUpperCase()}
            size={avatarSize}
          />
          {status && (
            <div
              className={cn(
                "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background",
                statusColors[status]
              )}
            />
          )}
        </div>

        <div
          className={cn(
            "flex flex-col",
            layout === "vertical" && "items-center"
          )}
        >
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">{name}</span>
            {role && (
              <Badge variant="secondary" className="text-xs">
                {role}
              </Badge>
            )}
          </div>
          {email && (
            <span className="text-sm text-muted-foreground">{email}</span>
          )}
        </div>
      </div>
    );
  }
);
UserProfile.displayName = "UserProfile";

export { UserProfile };

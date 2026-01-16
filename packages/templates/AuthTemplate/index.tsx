import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import { Button } from "@react-cupertino-ui/button";

import "./index.scss";

type AuthVariant = "login" | "register" | "forgot";

export interface AuthTemplateProps
  extends Omit<BaseProps<HTMLDivElement>, "children" | "variant" | "size"> {
  variant?: AuthVariant;
  logo?: React.ReactNode;
  onSubmit: (data: Record<string, string>) => void;
  onSocialLogin?: (provider: string) => void;
  onSwitch?: () => void;
}

const AuthTemplate = React.forwardRef<HTMLDivElement, AuthTemplateProps>((props, ref) => {
  const { variant = "login", logo, onSubmit, onSocialLogin, onSwitch, className, ...rest } = props;

  const [formState, setFormState] = React.useState<Record<string, string>>({ email: "", password: "" });

  const updateField = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formState);
  };

  const renderSwitchLabel = () => {
    if (!onSwitch) return null;
    if (variant === "login") {
      return (
        <p>
          New here? <button onClick={onSwitch}>Create account</button>
        </p>
      );
    }
    else if (variant === "register") {
      return (
        <p>
          Already have an account? <button onClick={onSwitch}>Sign in</button>
        </p>
      );
    }
    return (
      <p>
        Remembered your password? <button onClick={onSwitch}>Sign in</button>
      </p>
    );
  };

  return (
    <div ref={ref} className={cn("react-cupertino-ui-auth-template", className)} {...rest}>
      {logo ? <div className="react-cupertino-ui-auth-template__logo">{logo}</div> : null}
      <form className="react-cupertino-ui-auth-template__card" onSubmit={handleSubmit}>
        <h1>{variant === "login" ? "Sign in" : variant === "register" ? "Create account" : "Reset password"}</h1>
        <label>
          Email
          <input
            type="email"
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
            required
          />
        </label>
        {variant !== "forgot" ? (
          <label>
            Password
            <input
              type="password"
              value={formState.password}
              onChange={(event) => updateField("password", event.target.value)}
              required
            />
          </label>
        ) : null}
        <Button type="submit" fullWidth>
          {variant === "login" ? "Sign in" : variant === "register" ? "Create account" : "Send link"}
        </Button>
        {onSocialLogin ? (
          <div className="react-cupertino-ui-auth-template__socials">
            <button type="button" onClick={() => onSocialLogin("apple")}>
              Continue with Apple
            </button>
            <button type="button" onClick={() => onSocialLogin("google")}>
              Continue with Google
            </button>
          </div>
        ) : null}
      </form>
      <div className="react-cupertino-ui-auth-template__switch">{renderSwitchLabel()}</div>
    </div>
  );
});

AuthTemplate.displayName = "AuthTemplate";

export { AuthTemplate };

import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import { PageControl } from "@react-cupertino-ui/page-control";

import "./index.scss";

export interface OnboardingStep {
  image: string;
  title: string;
  description: string;
}

export interface OnboardingTemplateProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  steps: OnboardingStep[];
  onComplete: () => void;
  onSkip?: () => void;
}

const OnboardingTemplate = React.forwardRef<HTMLDivElement, OnboardingTemplateProps>((props, ref) => {
  const { steps, onComplete, onSkip, className, ...rest } = props;
  const [index, setIndex] = React.useState(0);

  const current = steps[index];
  const isLast = index === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    onSkip?.();
  };

  return (
    <div ref={ref} className={cn("react-cupertino-ui-onboarding-template", className)} {...rest}>
      <div className="react-cupertino-ui-onboarding-template__media">
        <img src={current.image} alt="Onboarding" />
      </div>
      <div className="react-cupertino-ui-onboarding-template__content">
        <h2>{current.title}</h2>
        <p>{current.description}</p>
      </div>
      <PageControl total={steps.length} current={index} />
      <div className="react-cupertino-ui-onboarding-template__actions">
        {onSkip ? (
          <button type="button" onClick={handleSkip} className="ghost">
            Skip
          </button>
        ) : null}
        <button type="button" onClick={handleNext}>
          {isLast ? "Done" : "Next"}
        </button>
      </div>
    </div>
  );
});

OnboardingTemplate.displayName = "OnboardingTemplate";

export { OnboardingTemplate };

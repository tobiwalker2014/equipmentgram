import { IconChevronDown } from "@tabler/icons-react";
import classNames from "classnames";

export enum Step {
  Request = "Request",
  Schedule = "Schedule",
  Inspection = "Inspection",
  Results = "Results",
  Complete = "Complete",
}

interface StepWizardProps {
  step: Step;
}

export function StepWidget(props: StepWizardProps) {
  const steps = Object.values(Step).slice(0, Object.values(Step).length - 1);

  return (
    <div className="-mx-3 flex items-center justify-center sm:-mx-7 md:-mx-10 lg:-mx-[50px]">
      {steps.map((step, index) => {
        const completedAllSteps = props.step === Step.Complete;
        const isCurrentStep = step === props.step;
        const isCompletedStep = steps.indexOf(step) < steps.indexOf(props.step);
        const isLastStep = index === steps.length - 1;

        return (
          <div className="relative px-3 text-center sm:px-7 md:px-10 lg:px-[50px]" key={`StepWidget-${step}`}>
            {!isLastStep && (
              <span className="bg-blue-700 absolute right-[-45px] top-[17px] block h-[2px] w-[80px] sm:right-[-60px] sm:top-[25px] sm:w-[120px]"></span>
            )}
            {isCurrentStep && !completedAllSteps && (
              <span className="absolute bottom-[45px] md:bottom-[65px] left-[63px] right-0 transform md:scale-[1] scale-[0.6]">
                <IconChevronDown className="text-blue-700 animate-bounce" />
              </span>
            )}
            <span
              className={classNames(
                "border-blue-700 bg-gray-100 text-blue-700 relative z-10 mx-auto mb-[10px] flex h-9 w-9 items-center justify-center rounded-full border-2 text-base font-medium sm:h-[50px] sm:w-[50px] sm:text-xl",
                isCompletedStep || completedAllSteps ? "bg-blue-700 text-black" : "bg-gray-100 text-blue-700"
              )}
            >
              {index + 1}
            </span>
            <span className="text-[10px] font-medium text-body-color sm:text-base md:text-xl absolute left-0 right-0">
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}

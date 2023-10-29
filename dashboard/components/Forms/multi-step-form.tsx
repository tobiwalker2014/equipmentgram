import { Select, Button, Group, Image, Radio, SimpleGrid, TextInput, Textarea, rem, Text } from "@mantine/core";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import UploadFileField from "./upload-file-field";
import { useAuth } from "@/lib/authContext";
import { USStates } from "@/utils/formUtils";
import { DateInput, TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import { QuestionForm } from "@/lib/network/forms";
import { useRouter } from "next/navigation";

type Props = {
  questionForm: QuestionForm;
  onSubmit: (formData: QuestionForm) => void;
};

const MultiStepForm = ({ questionForm, onSubmit }: Props) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: questionForm });
  const navigation = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const onFormSubmit = (data: QuestionForm) => {
    console.log("Final Form Data:", data);
    onSubmit(data);
    navigation.push("/forms");
  };

  const currentQuestions = questionForm.pages[currentStep - 1];

  const { user } = useAuth();

  const genUSAStates = () => {
    const states = Object.entries(USStates);
    return states.map(([statekey, state]) => (
      <option key={state} value={state}>
        {state}
      </option>
    ));
  };

  return (
    <div>
      <form className="max-w-[600px] mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
        <h2 className="mb-2 text-xl font-bold">{currentQuestions ? currentQuestions.name : "Inspection Report"}</h2>
        {currentQuestions?.comment && <Text className="mb-4">{currentQuestions.comment}</Text>}{" "}
        <ul className="space-y-4">
          {currentStep === 0 && (
            <>
              <TextInput name="inspector" label="Inspector Name" value={user?.displayName!} disabled />
              <TextInput label="Name Of Business at Which Inspection Took Place" {...register("nameOfBusiness")} />
              <TextInput label="Customer Email" {...register("customerEmail")} />
              <h1 className="text-sm font-bold">Address Of Inspection Location: </h1>
              <TextInput label="Address Line 1" {...register("address.line1")} />
              <TextInput label="Address Line 2" {...register("address.line2")} />
              <div className="grid grid-cols-3 gap-2">
                <TextInput label="City" {...register("address.city")} />
                <Controller
                  control={control}
                  name="address.state"
                  render={({ field }) => (
                    <Select
                      label="States"
                      data={Object.entries(USStates).map(([stateKey, state]) => state)}
                      {...field}
                    />
                  )}
                />
                <TextInput label="Zip" {...register("address.zip")} />
              </div>
              <Controller
                control={control}
                name="dateOfInspection"
                defaultValue={new Date()}
                render={({ field }) => <DateInput label="Date of Inspection" placeholder="Date input" {...field} />}
              />
              <Controller
                control={control}
                name="timeOfInspection"
                render={({ field }) => (
                  <TimeInput
                    label="Time at Which Inspection Took Place"
                    leftSection={<IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                    {...field}
                  />
                )}
              />
            </>
          )}
          {currentStep > 0 &&
            questionForm.pages[currentStep - 1].questions.map((question, i) => (
              <div className="p-4 space-y-4  border-gray-200 border border-solid" key={question.key}>
                <div className="radio-group">
                  <Controller
                    name={`pages.${currentStep - 1}.questions.${i}.value`}
                    control={control}
                    defaultValue="Good"
                    //   rules={{ required: true }} // Add validation rule for required questions
                    render={({ field }) => (
                      <Radio.Group label={question.label} {...field}>
                        <Group mt="xs">
                          <Radio value="Good" label="Good" />
                          <Radio value="Issues" label="Issues" />
                          <Radio value="N/A" label="N/A" />
                        </Group>
                      </Radio.Group>
                    )}
                  />
                </div>

                {watch(`pages.${currentStep - 1}.questions.${i}.value`) === "Issues" && (
                  <div>
                    <UploadFileField
                      fileName={question.key}
                      onUploadComplete={(url) => {
                        setValue(`pages.${currentStep - 1}.questions.${i}.imageUrl`, url);
                      }}
                    />
                    {watch(`pages.${currentStep - 1}.questions.${i}.imageUrl`) && (
                      <Image className="mt-4" src={watch(`pages.${currentStep - 1}.questions.${i}.imageUrl`)} />
                    )}
                    {/* <SimpleGrid className="mt-4" cols={{ base: 1, sm: 4 }}>
                    </SimpleGrid> */}
                  </div>
                )}
                {watch(`pages.${currentStep - 1}.questions.${i}.value`) === "N/A" && (
                  <Textarea label="Comment" {...register(`pages.${currentStep - 1}.questions.${i}.comment`)} />
                )}
              </div>
            ))}
        </ul>
        <div className="pb-10 my-4 space-x-4">
          {currentStep > 0 && <Button onClick={prevStep}>Previous</Button>}
          {currentStep < questionForm.pages.length && <Button onClick={nextStep}>Next</Button>}
          {currentStep === questionForm.pages.length && (
            <Button type="submit" loading={isSubmitting}>
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;

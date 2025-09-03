import React, { useMemo, useState } from "react";
import { algoButton } from "@/app/components/buttons/buttons";
import { algoInputs } from "@/app/components/inputs/algoInputs.tsx";
import { iconify } from "@/app/assets/icon/iconify.tsx";
import { information } from "./info.tsx";
import {
  ValidationUseCase,
  IErrEntryFeedback,
} from "@/app/useCases/entryFeedback/validationUseCase.ts";
import { SubmitUseCase } from "@/app/useCases/entryFeedback/submitUseCase.ts";
import { EntryfeedbackHelper } from "./entryfeedback.ts";

// 1) info is a React node (matches algoInputs.input1 prop)
type IInputDetails = {
  id: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  value: string;
  info: React.ReactNode;
};

const Entryfeedback = () => {
  const [buttonActive, setButtonActive] = useState(false);
  const [errors, setErrors] = useState<IErrEntryFeedback[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const entryfeedbackHelper = useMemo(
    () => new EntryfeedbackHelper(new ValidationUseCase(), new SubmitUseCase()),
    []
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "name") setName(value);
    else if (id === "email") setEmail(value);
    else if (id === "phone") setPhone(value);
    setButtonActive(true);
  };


  const INPUT_DETAILS: IInputDetails[] = [
    {
      id: "name",
      onchange: handleOnChange,
      placeholder: "Enter Your Name",
      type: "text",
      value: name,
      info: information.name({ isReturning: false }),
    },
    {
      id: "email",
      onchange: handleOnChange,
      placeholder: "Enter Your Email",
      type: "text",
      value: email,
      info: information.email(), 
    },
    {
      id: "phone",
      onchange: handleOnChange,
      placeholder: "Enter Your Phone Number",
      type: "text",
      value: phone,
      info: information.phone(), 
    },
  ];

  
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const result = await entryfeedbackHelper.validateAndSubmit(
      name,
      email,
      phone
    );
    if (result.kind === "errors") {
      setErrors(result.errors);
      console.log(result.errors);
    } else {
      setErrors([]);
      setButtonActive(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-2 bg-black border-dashed border-white border-2 rounded-xl w-[40%] *:text-white"
    >
      <label className="text-white w-full text-center text-2xl font-bold tracking-wider p-2">
        feedback details
      </label>

      <div className="flex flex-col gap-6">
        {INPUT_DETAILS.map((input) => (
          <div key={input.id} className="flex flex-col gap-5 w-full">
            <algoInputs.input1
              id={input.id}
              onchange={input.onchange}
              type={input.type}
              placeholder={input.placeholder}
              value={input.value}
              info={input.info}
            />

            {errors.some((error) => error.id === input.id) && (
              <div className="bg-gradient-to-b from-red-500 to-red-700 rounded-md p-2 text-white italic opacity-40 w-1/2 flex gap-2">
                {iconify.exclamationTriangle}
                <div>
                  {errors.find((error) => error.id === input.id)?.message}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 5) make the button an actual submit button (no double-calls) */}
      <algoButton.button1 handleClick={(e: React.FormEvent<HTMLButtonElement>) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)} txt="Submit" active={buttonActive} />

      <div>
        <p className="text-sm text-white">
          Already filled up the form? Click the <a href="#find-me" className="text-lime-300/90 hover:cursor-pointer">find me</a>.
        </p>
        <p className="text-sm text-slate-300/50">
          * Filled up the form to submit the feedback to continue the process.
        </p>
      </div>
    </form>
  );
};

export default Entryfeedback;

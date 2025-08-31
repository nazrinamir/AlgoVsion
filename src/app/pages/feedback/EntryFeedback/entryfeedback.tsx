import { algoButton } from '@/app/components/buttons/buttons'
import React, { useState, useMemo } from 'react'
import { EntryfeedbackHelper } from './entryfeedback.ts';
import { algoInputs } from '@/app/components/inputs/algoInputs.tsx';
import { iconify } from '@/app/assets/icon/iconify.tsx';
import { ValidationUseCase } from '@/app/useCases/entryFeedback/validationUseCase.ts';
import { SubmitUseCase } from '@/app/useCases/entryFeedback/submitUseCase.ts';
import { IErrEntryFeedback } from '@/app/useCases/entryFeedback/validationUseCase.ts';

type IInputDetails = {
  id: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  value: string;
}

const Entryfeedback = () => {

  const [buttonActive, setButtonActive] = useState(false);
  const [errors, setErrors] = useState<IErrEntryFeedback[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const entryfeedbackHelper = new EntryfeedbackHelper(new ValidationUseCase(), new SubmitUseCase());


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'name':
        setName(e.target.value);
        setButtonActive(true);
        break;
      case 'email':
        setEmail(e.target.value);
        setButtonActive(true);
        break;
      case 'phone':
        setPhone(e.target.value);
        setButtonActive(true);
        break;
      default:
        break;
    }
  }

  const INPUT_DETAILS = [{
    id: 'name',
    onchange: handleOnChange,
    placeholder: 'Enter Your Name',
    type: 'text',
    value: name
  }, {
    id: 'email',
    onchange: handleOnChange,
    placeholder: 'Enter Your Email',
    type: 'text',
    value: email
  }, {
    id: 'phone',
    onchange: handleOnChange,
    placeholder: 'Enter Your Phone Number',
    type: 'text',
    value: phone
  }]

  const handleSubmit = () => {
    setErrors(entryfeedbackHelper.validateAndSubmit(name, email, phone) as IErrEntryFeedback[]);
    if (entryfeedbackHelper.validateAndSubmit(name, email, phone) === "success") {
      setButtonActive(false);
    } else {
      console.warn(errors);
    }
  }



  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-2 bg-zinc-950 rounded-md w-[40%] *:text-white'>
      <label className='text-white w-full text-center text-2xl font-bold tracking-wider p-2'>feedback details</label>
      <div className='flex flex-col gap-6'>
        {INPUT_DETAILS.map((input: IInputDetails, index: number) => (
          <div key={index} className='flex flex-col gap-5 w-full'>
            <algoInputs.input1 key={input.id} id={input.id} onchange={input.onchange} type={input.type} placeholder={input.placeholder} value={input.value} />
            {errors.some(error => error.id === input.id) && (
              <div className='bg-gradient-to-b from-red-500 to-red-700 rounded-md p-2 text-white italic opacity-40 w-1/2 flex gap-2'>
                {iconify.exclamationTriangle}
                <div className=''>{errors.find(error => error.id === input.id)?.message}</div>
              </div>
            )}
          </div>))}
      </div>
      <algoButton.button1 txt='Submit' handleClick={handleSubmit} active={buttonActive} />
    </form>
  )
}

export default Entryfeedback
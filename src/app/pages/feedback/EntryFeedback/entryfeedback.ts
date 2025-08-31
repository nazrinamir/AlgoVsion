import { SubmitUseCase } from "@/app/useCases/entryFeedback/submitUseCase";
import { IErrEntryFeedback, ValidationUseCase } from "@/app/useCases/entryFeedback/validationUseCase";

  
  export class EntryfeedbackHelper {
    constructor(private validationUseCase: ValidationUseCase, private submitUseCase: SubmitUseCase) {}
  
    validateAndSubmit(name: string, email: string, phone: string): IErrEntryFeedback[]|string {
      this.validate(name, email, phone);
      this.submit(name, email, phone);
    }

    private validate(name: string, email: string, phone: string): IErrEntryFeedback[] {
      const errors = this.validationUseCase.validate(name, email, phone);
      if (errors.length > 0) {
        return errors;
      }
      return [];
    }

    private submit(name: string, email: string, phone: string): string {
      this.submitUseCase.execute(name, email, phone);
      return "success";
    }
  
  }
  
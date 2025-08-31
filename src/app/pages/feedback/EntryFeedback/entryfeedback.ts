import { SubmitUseCase } from "@/app/useCases/entryFeedback/submitUseCase";
import { IErrEntryFeedback, ValidationUseCase } from "@/app/useCases/entryFeedback/validationUseCase";

type SubmitResult = { kind: "errors"; errors: IErrEntryFeedback[] } | { kind: "success" };
  
  export class EntryfeedbackHelper {
    constructor(private validationUseCase: ValidationUseCase, private submitUseCase: SubmitUseCase) {}
  
    async validateAndSubmit(name: string, email: string, phone: string): Promise<SubmitResult> {
      const errors = this.validationUseCase.validate(name, email, phone);
      if (errors.length > 0) return { kind: "errors", errors };
      await this.submitUseCase.execute(name, email, phone);
      return { kind: "success" };
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
  
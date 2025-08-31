export type IErrEntryFeedback = {
    id: "allFieldsFilled" | "name" | "email" | "phone";
    message: string;
  };
  
export class ValidationUseCase {
    private errors: IErrEntryFeedback[] = [];
    private MY_MOBILE_DIGITS = /^(?:60|0)1(?:1\d{8}|[02-9]\d{7})$/;
    
    validate(name: string, email: string, phone: string): IErrEntryFeedback[] {
        const allFieldsFilled = this.isAllFieldsFilledOrFail(name, email, phone);
        const nameValid  = this.isNameValid(name);
        const emailValid = this.isEmailValid(email);
        const phoneValid = this.isPhoneValid(phone);
    
        // reset then keep only the ones with a message
        this.errors = [allFieldsFilled, nameValid, emailValid, phoneValid]
          .filter(e => e.message && e.message.trim().length > 0);
    
        return this.errors;
    }
    
    private isNameValid(name: string): IErrEntryFeedback {
        return this.isValidNameOrFail(name);
      }
      private isEmailValid(email: string): IErrEntryFeedback {
        return this.isValidEmailOrFail(email);
      }
      private isPhoneValid(phone: string): IErrEntryFeedback {
        return this.isValidPhoneOrFail(phone);
      }
    
      private isAllFieldsFilledOrFail(name: string, email: string, phone: string): IErrEntryFeedback {
        // any missing field
        if (name.length === 0 || email.length === 0 || phone.length === 0) {
          return { id: "allFieldsFilled", message: "Please fill in all fields" };
        }
        return { id: "allFieldsFilled", message: "" };
      }
    
      private isValidNameOrFail(name: string): IErrEntryFeedback {
        if (name.length === 0) return { id: "name", message: "Name is required" };
        if (name.length < 3)  return { id: "name", message: "Name must be at least 3 characters long e.g: John Doe" };
        return { id: "name", message: "" };
      }
    
      private isValidEmailOrFail(email: string): IErrEntryFeedback {
        if (email.length === 0) return { id: "email", message: "Email is required" };
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
          return { id: "email", message: "Please enter a valid email e.g: example@gmail.com" };
        }
        return { id: "email", message: "" };
      }
    
      private isValidPhoneOrFail(phone: string): IErrEntryFeedback {
        const raw = phone.trim();
        if (!raw) {
          return { id: "phone", message: "Phone number is required" };
        }
        
        const digits = raw.replace(/\D/g, "");
      
        if (!this.MY_MOBILE_DIGITS.test(digits)) {
          return {
            id: "phone",
            message:
              "Enter a valid Malaysian mobile number (10–11 digits), e.g. 0123456789 or +60123456789",
          };
        }
      
        return { id: "phone", message: "" };
      }
}
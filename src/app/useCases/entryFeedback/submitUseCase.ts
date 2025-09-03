export class SubmitUseCase {
    private excel: Excel;
    execute (name: string, email: string, phone: string) {
        console.log(name, email, phone);
    }

    private initializeExcel(){
        const excel = new Excel();
        excel.initialize();
        return excel;
    }


}   
export const log = (data: any) => {
    console.log(data);
};

export const printHandler = {
   printLog: (label: string, data: any) => {
        console.log(`${label}:`, data);
    }
};

// Export printLog directly for easier use
export const printLog = printHandler.printLog;

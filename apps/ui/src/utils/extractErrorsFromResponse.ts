import { AxiosError } from "axios";

export const extractErrorsFromResponse = (error: any): string[] => {
  const e = error as AxiosError;

  console.log('error', e);
  

  const errorMessages: string[] = (e.response?.data as any)?.errors
        ? Object.values((e.response?.data as any).errors).flat() as string[]
        : ["Ocurrió un error inesperado"];

  console.log('errorMessages', errorMessages);
  

  return errorMessages;
}
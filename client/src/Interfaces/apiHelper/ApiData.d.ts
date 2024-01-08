import { AxiosResponse } from 'axios';
export default interface ApiHelperType {
    path?: string,
    method?: string,
    body?: any,
    baseurl?: string,
}

export interface ApiHelperInitialStateType {
    isLoading: boolean,
    isError: boolean,
    data: AxiosResponse | null,
    error: any,
}
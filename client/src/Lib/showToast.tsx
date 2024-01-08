import { Id, toast } from 'react-toastify';

export function showAsyncToast(loadingTitle = "Please wait...") {
    toast.dismiss();
    const id: Id = toast.loading(loadingTitle);
    return id;
}

export function showAsyncToastError(id: Id, errorText: string) {

    toast.update(id, { render: errorText, type: "error", isLoading: false, autoClose: 3000 });
}
export function showAsyncToastSuccess(id: Id, successText: string) {

    toast.update(id, { render: successText, type: "success", isLoading: false, autoClose: 3000 });
}

export default (message: string) => {
    toast.dismiss();
    toast(message);
}

export const successToast = (message: string) => {
    toast.dismiss();
    toast.success(message);
}

export const errorToast = (message: string) => {
    toast.dismiss();
    toast.error(message);
}

export const infoToast = (message: string) => {
    toast.dismiss();
    toast.info(message);
}


export const warnToast = (message: string) => {
    toast.dismiss();
    toast.warning(message);
}
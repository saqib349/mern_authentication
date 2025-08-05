import { toast } from "react-toastify"

export const handleSuccess = (Msg) => {
    toast.success(Msg,{
        position: "top-right",
        autoClose: 3000,
        theme: "colored"
    })
}

export const handleFailure = (Msg) => {
    toast.error(Msg,{
        position: "top-right",
        autoClose: 3000,
        theme: "colored"
    })
}
import { createContext } from "react";

export type authType = {
    status: boolean,
    user: ""
}
export const AuthContext = createContext<[authType, React.Dispatch<React.SetStateAction<authType>>]>([
    {
        status: false,
        user: ''
    }, () => { }
]) 

// import { LocalStorageService } from "@/lib/helpers/access/Access";
import { ReactNode } from "react";

type Props = {
    children: ReactNode
}
const HomeLayout = ({ children }: Props) => {
    // if(LocalStorageService.getInstance().token){

    // }else{

    // }
    return (
        <div>
            {children}
        </div>
    );
};

export default HomeLayout;
import { toast } from "../ui/use-toast";
import { IAlert } from "./interfaces/alert.interface";

export const errorAlert = (data: IAlert) => {
  return toast({ ...data, variant: "destructive" });
};

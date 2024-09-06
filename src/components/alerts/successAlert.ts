import { toast } from "../ui/use-toast";
import { IAlert } from "./interfaces/alert.interface";

export const successAlert = (data: IAlert) => {
  return toast({
    title: data.title,
    description: data.description,
    className: "bg-green-500 text-white",
  });
};

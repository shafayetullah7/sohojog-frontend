"use client"

import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { TheroIcon } from "@/lib/types/heroIcon";

type FormInputProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    placeholder: string;
    type?: string;
    className?: string;
    message?: string;
    Icon?: TheroIcon;
}


const AuthTextInput = <T extends FieldValues>({ control, name, placeholder, type = "text", className, message, Icon }: FormInputProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <div className="w-fit relative">
                            <Input placeholder={placeholder} type={type} {...field} className={className ? className : `bg-gray-100 w-[25rem] h-[4rem] rounded-xl border border-gray-300 placeholder:text-gray-500 px-5 ${Icon ? 'pl-12' : ''}`} />
                            {Icon && <Icon className="size-6 text-gray-500 absolute top-1/2 -translate-y-1/2 left-[0.85rem]" />}
                        </div>
                    </FormControl>
                    {message && <FormDescription>
                        {message}
                    </FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default AuthTextInput;
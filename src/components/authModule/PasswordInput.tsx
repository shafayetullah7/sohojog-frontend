import { TheroIcon } from "@/app/lib/types/heroIcon";
import { Control, FieldValues, Path } from "react-hook-form";
import AuthTextInput from "./AuthTextInput";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from "react";


type PasswordInputProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    placeholder: string;
    className?: string;
    message?: string;
    Icon?: TheroIcon;
}

const PasswordInput = <T extends FieldValues>({ control, name, placeholder, className, message, Icon }: PasswordInputProps<T>) => {
    const [seePass, setSeePass] = useState<boolean>(false)

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <div className="w-fit relative">
                            <Input placeholder={placeholder} type={seePass ? 'text' : 'password'} {...field} className={className ? className : `bg-gray-100 w-[25rem] h-[4rem] rounded-xl border border-gray-300 placeholder:text-gray-500 px-5 ${Icon ? 'pl-12' : ''}`} />
                            {Icon && <Icon className="size-6 text-gray-500 absolute top-1/2 -translate-y-1/2 left-[0.85rem]" />}
                            <span onClick={() => setSeePass(!seePass)} className="absolute top-1/2 -translate-y-1/2 right-[0.85rem] hover:cursor-pointer block">
                                {seePass ? <EyeSlashIcon className="size-6 text-gray-500" /> : <EyeIcon className="size-6 text-gray-500 " />}
                            </span>
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

export default PasswordInput;
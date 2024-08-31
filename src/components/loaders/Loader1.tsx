import Image from "next/image";
import React from "react";

type Tprops = {
    size: number,
}

const Loader1: React.FC<Tprops> = ({ size }) => {
    return (
        <div className="border w-fit p-2 origin-center">
            <Image src={'/loaders/loader.svg'} height={size} width={size} alt="loader img" />
        </div>
    );
};

export default Loader1;
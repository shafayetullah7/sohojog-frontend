import { useGetUser } from "@/hooks/getUser";

const UserNav = () => {
    const { isLoading, error, data: user } = useGetUser()
    return (
        <div className="w-full flex justify-between items-center px-6 py-5">
            <h1 className="text-lavender-blush-600 font-black text-3xl">SOHOJOG</h1>
            <input type="text" name="search" className="px-5 py-3 rounded-lg w-[400px]" placeholder="type here" />
            <div>
                <p>
                    {isLoading
                        ? 'loading...'
                        : user?.name
                            ? user.name
                            : 'not found'}
                </p>
            </div>
        </div>
    );
};

export default UserNav;
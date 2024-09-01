
const UserNav = () => {
    return (
        <div className="w-full flex justify-between bg-gray-100 px-5 py-4">
            <h1>SOHOJOG</h1>
            <input type="text" name="search" className="px-5 py-2 rounded-lg" placeholder="type here" />
            <div>
                <p>user</p>
            </div>
        </div>
    );
};

export default UserNav;
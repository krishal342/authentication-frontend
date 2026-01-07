const AuthLayout = ({ children }) => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-[30%]">
                {children}
            </div>
        </div>
    );
}

export default AuthLayout
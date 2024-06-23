type LayoutProps = {
    children: React.ReactNode
};

export const Layout = ({ children }: LayoutProps) => {

    return (
        <>
            <header className="bg-[#3C3C3B] text-white font-normal text-2xl p-4">
                Sistema de cadastro
            </header>
            <div className="p-4">
                { children }
            </div>
        </>
    )

}
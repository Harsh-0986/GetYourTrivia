import {ModeToggle} from "@/components/mode-toggle";

const Header = () => {
    return (
        <header className={"flex mx-4 md:mx-16 my-6 items-center justify-between"}>
            <a href={"/"}>
                <h3 className={"font-bold text-xl border-b hover:border-gray-600 lg:text-2xl font-sans cursor-pointer"}>
                    Get Your Trivia!
                </h3>
            </a>
            <ModeToggle/>
        </header>
    )
}
export default Header

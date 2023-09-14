import {ThemeProvider} from "@/components/theme-provider";
import Header from "@/components/custom/Header";
import Options from "@/components/custom/Options";

function App() {
    return (
        <main className={"md:mx-72"}>
            <ThemeProvider defaultTheme={"dark"} storageKey={"vite-ui-theme"}>
                <Header/>
                <Options/>
            </ThemeProvider>
        </main>
    )
}

export default App

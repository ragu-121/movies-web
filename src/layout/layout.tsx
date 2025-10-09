import TopBar from "./topBar";
import { Outlet } from "react-router";


const Layout = () => {
    return (
        <main>
            <TopBar />
            <section>
                <Outlet />
            </section>
        </main>
    )
}

export default Layout

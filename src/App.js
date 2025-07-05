import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout.js"
import HomePage from "./pages/HomePage.js"
import LoginPage from "./pages/LoginPage.js"
import RegisterPage from "./pages/RegisterPage.js"
import TicketsPage from "./pages/TicketsPage.js"
import TicketDetailPage from "./pages/TicketDetailPage.js"
import OrdersPage from "./pages/OrdersPage.js"
import SellPage from "./pages/SellPage.js"
import ProfilePage from "./pages/ProfilePage.js"
import SellerTicketsPage from "./pages/SellerTicketsPage.js"
import { AuthProvider } from "./utils/AuthContext.js"
import PrivacyPage from "./pages/PrivacyPage.js"
import TermsPage from "./pages/TermsPage.js"
import MyPurchasedTicketsPage from "./pages/MyPurchasedTicketsPage.js"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "profile", element: <ProfilePage /> },
            { path: "sell", element: <SellPage /> },
            { path: "tickets/seller/:userId", element: <SellerTicketsPage /> },
            { path: "tickets/:id", element: <TicketDetailPage /> },
            { path: "tickets/:ticketType", element: <TicketsPage /> },
            { path: "orders", element: <OrdersPage /> },
            { path: "orders/purchased", element: <MyPurchasedTicketsPage /> },
            { path: "privacy", element: <PrivacyPage /> },
            { path: "terms", element: <TermsPage /> }
        ]
    }
])

function App() {
    return (
        <AuthProvider>
            <RouterProvider
                router={router}
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            />
        </AuthProvider>
    )
}

export default App

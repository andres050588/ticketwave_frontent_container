import { useParams } from "react-router-dom"
import TicketList from "../components/TicketList"

export default function TicketsPage() {
    const { ticketType } = useParams()

    const titles = {
        acquistati: "Biglietti Acquistati",
        in_vendita: "I miei Biglietti in Vendita",
        disponibili: "Biglietti Disponibili"
    }

    return <TicketList title={titles[ticketType] || "Biglietti"} ticketType={ticketType} />
}

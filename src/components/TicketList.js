import { useEffect, useState } from "react"
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import axios_api from "../api/api.js"
import TicketCard from "./TicketCard.js"

export default function TicketList({ title = "Biglietti", limit = null, showSeeAllButton = false, ticketType = "disponibili", apiEndpoint = null }) {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                let url = apiEndpoint // apiEndpoint se passato

                if (!url) {
                    // fallback a ticketType
                    if (ticketType === "acquistati") {
                        url = "/orders/purchased" // endpoint per biglietti acquistati
                    } else if (ticketType === "in_vendita") {
                        url = "/tickets/mytickets" // endpoint per biglietti in vendita dell’utente
                    } else {
                        url = "/tickets" // biglietti disponibili
                    }
                }

                const response = await axios_api.get(url)
                let allTickets = response.data

                if (!Array.isArray(allTickets)) {
                    console.error("❌ Non è un array! Hai ricevuto:", allTickets)
                    allTickets = []
                }

                setTickets(limit ? allTickets.slice(0, limit) : allTickets)
            } catch (err) {
                setError("Errore durante il caricamento dei biglietti.")
            } finally {
                setLoading(false)
            }
        }
        fetchTickets()
    }, [limit, ticketType, apiEndpoint])

    return (
        <section className="py-4">
            <Container>
                <h2 className="mb-4 text-center">{title}</h2>
                {loading && <Spinner animation="border" />}
                {error && <Alert variant="danger">{error}</Alert>}
                <Row>
                    {Array.isArray(tickets) &&
                        tickets.map(ticket => (
                            <Col key={ticket.id} md={6} lg={4}>
                                <TicketCard ticket={ticket} />
                            </Col>
                        ))}
                </Row>
                {showSeeAllButton && (
                    <div className="text-center mt-4">
                        <Button
                            variant="outline-primary"
                            onClick={() => {
                                if (apiEndpoint === "/orders/purchased") {
                                    navigate("/orders/purchased")
                                } else {
                                    // fallback normale
                                    navigate(`/tickets/${ticketType}`)
                                }
                            }}
                        >
                            Vedi tutti i biglietti →
                        </Button>
                    </div>
                )}
            </Container>
        </section>
    )
}

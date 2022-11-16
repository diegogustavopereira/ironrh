import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"

function PeopleDetails({ apiURL }) {
    const [employee, setEmployee] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        try{
            const fetchEmployee = async () => {
                const response = await axios.get(`${apiURL}/${id}`)
                setEmployee(response.data)
            }

            fetchEmployee()
        } catch(error) {
            console.log(error)
        }
    }, [id])

    const deleteEmployee = async (id) => {
        await axios.delete(`${apiURL}/${id}`)
        navigate("/funcionarios")
    }

    return (
        <Container>
            <Card className="text-center">
                <Card.Header>
                    <Card.Title>{employee.name}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Text>{ employee.email}</Card.Text>
                    <Card.Text>{ employee.phone}</Card.Text>
                    <Card.Text>{ employee.department}</Card.Text>
                    <Card.Text>{ employee.admissionDate}</Card.Text>
                    <Card.Text>{ employee.status }</Card.Text>
                    <Card.Text>Ativo na empresa: { employee.active }</Card.Text>
                    <Row>
                        <Col>
                            <Button variant="primary">
                                <Link>Editar funcionário</Link>
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant="danger"
                                onClick={() => deleteEmployee(employee._id)}
                            >
                                Excluir funcionário</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default PeopleDetails
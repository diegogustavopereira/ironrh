import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faPhone, faCalendarCheck, faCircleCheck, faBuildingUser, faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import EditPeople from "../EditPeople/EditPeople";
import { toast } from 'react-toastify';

// -------- CHAMADA DE PROPS --------
function PeopleDetails({ apiURL, form, setForm }) {
    // -------- CRIAÇÃO DE ESTADOS PARA O COMPONENTE --------
    // um estado para o objeto representará um funcionário
    const [employee, setEmployee] = useState({})
    // um estado para o carregamento dos dados
    const [isLoading, setIsLoading] = useState(true)
    // identificar o id dinâmico como parâmetro para a requisição
    const { id } = useParams()
    // criação de uma constante para criar uma navegação
    const navigate = useNavigate()

    // -------- USE EFFECT PARA REQUISIÇÃO --------
    // o useEffect captura a requisição uma única vez a cada carregamento de página, evitando o sobrecarregamento do servidor
    useEffect(() => {
        // o try catch é para capturar tentativa e erro no momento da requisição
        try {
            // criação de uma função assíncrona que terá um comportamento síncrono com o async e await
            const fetchEmployee = async () => {
                 // fala para o código esperar (await) a requisição do axios ser feita
                // o get apenas captura para leitura deste item em específico
                const response = await axios.get(`${apiURL}/${id}`)
                // após a requisição pronta, atualiza o estado com as informações da api
                setEmployee(response.data)
                // o carregamento para ao termos os dados da requisição
                setIsLoading(false)
            }

            // roda a função acima
            fetchEmployee()
        // captura de erro na requisição
        } catch (error) {
            // imprime no console o erro
            console.log(error)
        }
    }, [apiURL, id])

    // -------- FUNÇÃO PARA DELETAR ITEM --------
    // criação de uma função assícrona que identificará o id do item
    const deleteEmployee = async (id) => {
        // espera o axios fazer o delete do item a partir do seu id
        await axios.delete(`${apiURL}/${id}`)
        // após requisição feita navega para a página de listagem
        navigate("/funcionarios")
        // mensagem flutuante na tela de aviso para usuário
        toast.success('Usuário deletado com sucesso!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    // -------- RENDERIZAÇÃO DE HTML --------
    return (
        <Container style={{ height: '90vh' }} className="d-flex justify-content-center align-items-center">
            {   // loading verdadeira carrega o spinner
                isLoading && <Spinner animation="border" /> }
            {   // loading falso carrega as informações do item
                !isLoading &&
                <Card className="text-center w-100">
                    <Card.Header>
                        <Card.Title className="m-0">
                            <h3>{employee.name}</h3>
                        </Card.Title>
                        {   // se o usuário está ativo na empresa
                            employee.active && <h6 className="text-success">Este funcionário está ativo na empresa</h6>
                        }
                        {   // se o usuário não está ativo na empresa
                            !employee.active && <h6 className="text-secondary">Este funcionário não está ativo na empresa</h6>
                        }
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>Informações trabalhista</Card.Title>
                        <Row>
                            <Col>
                                <Card.Text>
                                    <FontAwesomeIcon icon={faCalendarCheck} /> {employee.admissionDate}
                                </Card.Text>
                                <Card.Text>
                                    <FontAwesomeIcon icon={faCircleCheck} /> {employee.status}
                                </Card.Text>
                            </Col>
                            <Col>
                                <Card.Text>
                                    <FontAwesomeIcon icon={faMoneyCheckDollar} /> R${employee.salary},00
                                </Card.Text>
                                <Card.Text>
                                    <FontAwesomeIcon icon={faBuildingUser} /> {employee.department}
                                </Card.Text>
                            </Col>
                        </Row>
                        <Row>
                            <Card.Title>Informações de contato</Card.Title>
                            <Col>
                                <Card.Text>
                                    <FontAwesomeIcon icon={faAt} /> {employee.email}
                                </Card.Text>
                            </Col>
                            <Col>
                                <Card.Text>
                                    <FontAwesomeIcon icon={faPhone} /> {employee.phone}
                                </Card.Text>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <EditPeople id={ id } apiURL={ apiURL} form={ form } setForm={ setForm } />
                            </Col>
                            <Col>
                                <Button
                                    variant="secondary"
                                    onClick={() => navigate(-1)}
                                >
                                    Voltar</Button>
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
            }
        </Container>
    )
}

export default PeopleDetails
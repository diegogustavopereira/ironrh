import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Form, Spinner, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

function PeopleList({ apiURL }) {
    // -------- CRIAÇÃO DE ESTADOS DO COMPONENTE --------
    // estado para capturar todos os funcionários
    const [employees, setEmployees] = useState([])
    // estado para setar a mudança do carregamento da página
    const [isLoading, setIsLoading] = useState(true)
    // estado para registrar a mudança da pesquisa de funcionários
    const [search, setSearch] = useState("")

    // -------- USE EFFECT PARA REQUISIÇÃO --------
    // o useEffect captura a requisição uma única vez a cada carregamento de página, evitando o sobrecarregamento do servidor
    useEffect(() => {
        // o try catch é para capturar tentativa e erro no momento da requisição
        try {
            // criação de uma função assíncrona que terá um comportamento síncrono com o async e await
            const fetchEmployees = async () => {
                // fala para o código esperar (await) a requisição do axios ser feita
                // o get apenas captura para leitura
                const response = await axios.get(apiURL)
                // após a requisição pronta, atualiza o estado com as informações da api
                setEmployees(response.data)
                // atualiza o estado do loading para falso
                setIsLoading(false)
            }

            // roda a função acima
            fetchEmployees()
            // captura de erro
        } catch (error) {
            // imprime no console o erro
            console.log(error)
        }
        // no array é passado o valor necessário esperado para executar o useEffect
        // precisamos ter a informação da apiURL para rodar este bloco de código
    }, [apiURL])

    // -------- MAPEAMENTO E FILTRAGEM DE INFORMAÇÃO --------
    const renderEmployees = employees
        // filtragem de nomes de funcionários para a barra de pesquisa
        .filter((employee) => employee.name.toLowerCase().includes(search.toLowerCase()))
        // mapeamento de todos os itens para renderização em forma de tabela
        .map((employee) => {
            // --------RENDERIZAÇÃO DE HTML --------
            return (
                <tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department}</td>
                    <td>{employee.status}</td>
                    <td>
                        <Button variant="info" size="sm">
                            <Link className="nav-link" to={`/funcionarios/${employee._id}`}>Ver detalhes</Link>
                        </Button>
                    </td>
                </tr>
            )
        })

    // -------- RENDERIZAÇÃO DE HTML --------
    return (
        <Container>
            {   // caso o isLoading for verdadeiro, o spinner será renderizado na tela 
                isLoading && <Spinner className="mt-4" animation="border" />
            }
            {   // caso o isLoading for falso, a página será renderizada
                !isLoading &&
                <div>
                    <Form className="my-4">
                        <Form.Control
                            type="search"
                            placeholder="Procurar funcionário"
                            value={ search }
                            onChange={ (e) => setSearch(e.target.value) }
                        />
                    </Form>
                    <Table className="mt-4" striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Endereço de e-mail</th>
                                <th>Departamento</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            { renderEmployees }
                        </tbody>
                    </Table>
                </div>
            }
        </Container>
    )
}

export default PeopleList
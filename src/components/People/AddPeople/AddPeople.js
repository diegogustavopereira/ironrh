import axios from "axios"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'

// -------- SETAGEM DOS PROPS --------
function AddPeople({ apiURL, form, setForm }) {
    // -------- CRIAÇÃO DA CONSTANTE DE NAVEGAÇÃO --------
    const navigate = useNavigate()

    // -------- EVENTO DE MUDANÇA --------
    // o change monitora todas as mudanças do formulário, que é um componente controlado
    const handleChange = (e) => {
        // ele identifica se estamos manipulando o checkbox através do seu name
        if(e.target.name === "active") {
            // caso a condição for verdadeira ele insere a mudança do checkbox dentro do estado do form
            setForm({...form, active: e.target.checked})
            // sai do if e retorna para a função
            return
        }

        // atualiza o estado do formulário monitorando todos os inputs
        setForm({...form, [e.target.name]: e.target.value})
    }

    // -------- EVENTO DE ENVIO DE FORM --------
    // o submit gera um código ao enviarmos o formulário
    const handleSubmit = async (e) => {
        // evita o carregamento da página
        e.preventDefault()

        try {
            // espera o axios realizar sua requisição, passando a api e o formulário com os dados que serão inseridos na api
            await axios.post(apiURL, form)
            // navega para a página da listagem
            navigate("/funcionarios")

            // mensagem flutuante de sucesso para o usuário
            toast.success('Novo funcionário foi cadastrado!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            // imprime o erro no console
            console.log(error)

            // mensagem flutuante para aviso ao usuário
            toast.error('Não foi possível cadastrar novo funcionário', {
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
    }

    // -------- RENDERIZAÇÃO DE HTML --------
    return (
        <Container>
            <h2 className="my-5">Cadastrar novo funcionário</h2>
            <Form onSubmit={ handleSubmit }>
                <Row>
                    <Col className="d-flex justify-content-center align-items-center">
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Funcionário ativo na empresa"
                                name="active"
                                onChange={handleChange}
                                checked={form.active}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome do funcionário</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Insira o nome completo do funcionário"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Número de telefone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Insira o número de telefone para contato com DDD"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Endereço de e-mail</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Insira o endereço de e-mail válido para contato"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Remuneração por mês</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Insira o valor da remuneração mensal"
                                name="salary"
                                value={form.salary}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Departamento</Form.Label>
                            <Form.Select name="department" onChange={handleChange}>
                                <option value="0">Selecione uma opção</option>
                                <option value="People">People</option>
                                <option value="Front-end">Front-end</option>
                                <option value="Back-end">Back-end</option>
                                <option value="Mobile">Mobile</option>
                                <option value="Financeiro">Financeiro</option>
                                <option value="Marketing">Marketing</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Data de admissão</Form.Label>
                            <Form.Control
                                type="date"
                                name="admissionDate"
                                value={form.admissionDate}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Select name="status" onChange={handleChange}>
                                <option value="0">Selecione uma opção</option>
                                <option value="Disponível">Disponível</option>
                                <option value="Alocado">Alocado</option>
                                <option value="De Férias">De Férias</option>
                                <option value="De Licença">De Licença</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Button className="mt-4" variant="success" type="submit">Cadastrar funcionário</Button>
            </Form>
        </Container>
    )
}

export default AddPeople
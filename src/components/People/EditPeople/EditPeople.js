import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

// -------- SETAGEM DE PROPS --------
function EditPeople({ id, apiURL, form, setForm }) {
    // -------- CRIAÇÃO DE CONSTANTE PARA NAVEGAÇÃO --------
    const navigate = useNavigate()
    // -------- CRIAÇÃO DE EVENTO PRA MODAL --------
    const [show, setShow] = useState(false);

    // -------- FUNÇÃO PARA MUDANÇA DE MODAL --------
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // -------- SETAGEM DE USE EFFECT --------
    useEffect(() => {
        // criação de uma função para capturar a requisição
        const fetchEmployee = async () => {
            const response = await axios.get(`${apiURL}/${id}`)
            // traz os dados do usuário existente para o formulário
            setForm(response.data)
        }

        fetchEmployee()
    }, [apiURL, setForm, id])

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
            // faz uma cópia do estado do formulário até o momento
            const clone = { ...form }
            //exclui o id daquele objeto
            delete clone._id

            // chama a requisição de atualização
            await axios.put(`${apiURL}/${id}`, clone)
            
            // navega até a página de listagem
            navigate("/funcionarios")

            // mensagem flutuante de sucesso para o usuário
            toast.success('Funcionário atualizado!', {
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
            toast.error('Não foi possível editar funcionário', {
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
        <div>
            <Button variant="primary" onClick={handleShow}>
                Editar funcionário
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar novo funcionários</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Funcionário ativo na empresa"
                                name="active"
                                onChange={handleChange}
                                defaultChecked
                            />
                        </Form.Group>
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
                        <Form.Group className="mb-3">
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
                        <Form.Group className="mb-3">
                            <Form.Label>Data de admissão</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Insira o valor da remuneração mensal"
                                name="admissionDate"
                                value={form.admissionDate}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select name="status" onChange={handleChange}>
                                <option value="0">Selecione uma opção</option>
                                <option value="Disponível">Disponível</option>
                                <option value="Alocado">Alocado</option>
                                <option value="De Férias">De Férias</option>
                                <option value="De Licença">De Licença</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Atualizar funcionário
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default EditPeople
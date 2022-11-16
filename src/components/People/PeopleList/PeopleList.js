import { Container, Table } from "react-bootstrap"

function PeopleList() {
    return (
        <Container>
            <Table>
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
                    {/* map sendo renderizado -> cada linha de informação */}
                </tbody>
            </Table>
        </Container>
    )
}

export default PeopleList
import {
	InputField,
	ImageContainer,
	MainCadastroContainer,
	CadastroContainer,
	CadastroPage,
	ButtonLinkCE,
} from "../styles/Cadastro.styles";
import Logo from "../assets/Component5.png";
import { Link } from "react-router-dom";
import ValidaCPF from "../testes/ValidaCPF";
import { useNavigate } from "react-router-dom";

const validation = () => {
	const fd = new FormData(event.target);

	let isValid = true;

	let email = fd.get("email");
	let nome = fd.get("nome");
	let CPF = fd.get("CPF");
	let genero = fd.get("genero");
	let senha = fd.get("senha");
	let confirmaSenha = fd.get("confirmar Senha");

	const campoVazio = (campo, campoNome) => {
		if (!campo || campo == "" || campo == " ") {
			alert(`${campoNome} está vazio!`);

			return false;
		}
		return true;
	};

	const confirmarSenha = (senha, senha2) => {
		if (senha != senha2) {
			alert(`Senha não está igual`);
			return false;
		}
	};

	isValid = campoVazio(email, "Email");
	isValid = campoVazio(nome, "Nome");
	isValid = campoVazio(CPF, "Cpf");
	isValid = campoVazio(genero, "genero");
	isValid = campoVazio(senha, "Senha");
	isValid = campoVazio(confirmaSenha, "confirmar Senha");

	confirmarSenha(senha, confirmaSenha);
	if (!ValidaCPF(CPF)) {
		isValid = false;
		alert("CPF falso");
	}
	return isValid;
};

const handleSubmit = (event) => {
	event.preventDefault();

	const fd = new FormData(event.target);
	for (const value of fd.values()) {
		console.log(value);
	}

	const ObjectForm = Object.fromEntries(fd);

	if (validation()) {
		navigate("/Cadastro/CadastroEndereco", { state: ObjectForm });
	}
};

function Cadastro() {
	let navigate = useNavigate();
	return (
		<CadastroPage>
			<MainCadastroContainer>
				<CadastroContainer onSubmit={handleSubmit}>
					<h1>Registre-se</h1>

					<InputField>
						<label>Email</label>
						<input type="email" name="email"></input>
					</InputField>

					<InputField>
						<label>Nome</label>
						<input type="text" name="nome"></input>
					</InputField>

					<InputField>
						<label>CPF</label>
						<input type="number" name="CPF"></input>
					</InputField>

					<InputField>
						<label>Gênero</label>
						<select name="genero" defaultValue="Selecione o gênero">
							<option value="Feminino">Feminino</option>
							<option value="Masculino">Masculino</option>
							<option value="Outros">Outros</option>
						</select>
					</InputField>

					<InputField>
						<label>Senha</label>
						<input type="password" name="senha"></input>
					</InputField>

					<InputField>
						<label>Confirmar senha</label>
						<input type="password" name="confirmar Senha"></input>
					</InputField>

					<ButtonLinkCE>Continuar</ButtonLinkCE>

					<span>
						ou faça{" "}
						<b>
							<Link to="/Login">login</Link>
						</b>{" "}
						se ja tiver uma conta
					</span>
				</CadastroContainer>

				<ImageContainer>
					<img src={Logo} alt="Logo NRP" />
				</ImageContainer>
			</MainCadastroContainer>
		</CadastroPage>
	);
}

export default Cadastro;

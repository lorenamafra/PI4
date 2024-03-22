import { useState } from "react";
import {
  ImageFieldset,
  ImagesContainer,
  ImgLabel,
  InputQuantidade,
  ProdutoFormContainer,
  SubmitButton,
} from "../Styles/Form.styles";
import { MainFormContainer } from "../Styles/Form.styles";
import axios from "axios";
import { RedirectText } from "../Styles/MainStyles.styles";
import { useNavigate } from "react-router";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";

function CadastrarProdutos() {
  const Visualizar = (e) => {
    e.preventDefault();

    var formElement = document.getElementById("myForm");
    var fd = new FormData(formElement);
    var abbr = fd
      .get("artista")
      .split(" ")
      .map(function (item) {
        return item[0];
      })
      .join("");

    let nome_disco = fd.get("nome_disco").replaceAll(" ", "");

    let cod_produto = abbr.concat(nome_disco, fd.get("ano"));
    fd.append("cod_produto", cod_produto);
    const ObjectForm = Object.fromEntries(fd);

    console.log(ObjectForm);

    navigate("/Produto/Visualizar", { state: ObjectForm });
  };

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    let currentYear = new Date().getFullYear();
    console.log(fd.getAll("images"));

    var abbr = fd
      .get("artista")
      .split(" ")
      .map(function (item) {
        return item[0];
      })
      .join("");

    let nome_disco = fd.get("nome_disco").replaceAll(" ", "");

    let cod_produto = abbr.concat(nome_disco, fd.get("ano"));
    fd.append("cod_produto", cod_produto);
    for (let i = 0; i <= images.length; i++) {
      fd.append(`images`, images[0][i]);
      console.log(images[0][i]);
    }

    if (
      parseInt(fd.get("year")) <= 1930 ||
      parseInt(fd.get("year")) > currentYear
    ) {
      console.log("ano errado");
      console.log(new Date().getFullYear());
    }
    console.log(fd.getAll("images"));

    axios
      .post("http://localhost:8080/produto/inserir", fd)
      .then((resp) => console.log(resp));
  }

  const [selectedImages, setSelectedImages] = useState([]);
  const [imagesComponents, setImagesComponents] = useState([]);
  const [images, setImages] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.currentTarget.files;

    console.log(images);
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    console.log(selectedImages);
  };

  return (
    <MainFormContainer>
      <ProdutoFormContainer id="myForm" onSubmit={handleSubmit}>
        <section>
          <div>
            <fieldset>
              <label htmlFor="discName"> Nome do Disco </label>
              <input type="text" name="nome_disco" required />
            </fieldset>
            <fieldset>
              <label htmlFor=""> Artista </label>
              <input type="text" name="artista" required />
            </fieldset>
            <fieldset>
              <label htmlFor=""> Generos </label>
              <input type="text" name="genero" required />
            </fieldset>
            <fieldset>
              <label htmlFor=""> Ano de Lançamento </label>
              <InputQuantidade
                type="number"
                name="ano"
                maxLength={4}
                required
              />
            </fieldset>
          </div>

          <div>
            <fieldset>
              <label htmlFor=""> Quantidade </label>
              <InputQuantidade type="number" name="estoque" required />
            </fieldset>
            <fieldset>
              <label htmlFor=""> Preço </label>
              <InputQuantidade type="number" name="valor" required />
            </fieldset>
            <fieldset>
              <label htmlFor=""> Avaliação </label>
              <select type="select" name="avaliacao" min={0} max={5} required>
                <option value="0"> 0 </option>
                <option value="0.5"> 0.5 </option>
                <option value="1"> 1 </option>
                <option value="1.5"> 1.5 </option>
                <option value="2"> 2 </option>
                <option value="2.5"> 2.5 </option>
                <option value="3"> 3 </option>
                <option value="3.5"> 3.5 </option>
                <option value="4"> 4 </option>
                <option value="4.5"> 4.5 </option>
                <option value="5"> 5 </option>
              </select>
              /5
            </fieldset>
            <fieldset>
              <label htmlFor="description">Descrição</label>
              <textarea name="descricao" required></textarea>
            </fieldset>
            <RedirectText onClick={Visualizar}> Visualizar </RedirectText>
          </div>
        </section>

        <fieldset>
          <input
            type="file"
            name="images"
            onChange={(e) => setImages(e.target.files)}
            multiple
          />
        </fieldset>
        <section>
          <fieldset>
            <div>
              {/* <ImagesContainer>
                {selectedImages &&
                  selectedImages.map((image, index) => {
                    return (
                      <ImageFieldset key={index}>
                        <img src={image} alt="" />
                        <div>
                          <label htmlFor="principal">Main</label>
                          <input
                            type="radio"
                            name="principal"
                            value={index}
                            checked
                          />
                        </div>
                        <button
                          onClick={(e) =>
                            setSelectedImages(
                              selectedImages.filter((e) => e !== image)
                            )
                          }
                        >
                          <Icon path={mdiTrashCanOutline} size={1} />
                          <p>Delete Image</p>
                        </button>
                      </ImageFieldset>
                    );
                  })}
              </ImagesContainer> */}
            </div>
          </fieldset>
          <div>
            <fieldset>
              <label>
                Add Imagem
                <input
                  type="file"
                  name="images"
                  onChange={(e) => onSelectFile(e)}
                  multiple
                  accept="image/jpeg, image/png, image/webp"
                />
              </label>

              <div>
                <ImagesContainer>
                  {selectedImages &&
                    selectedImages.map((image, index) => {
                      return (
                        <ImageFieldset key={index}>
                          <img src={image} alt="" />
                          <div>
                            <label htmlFor="principal">Main</label>
                            <input
                              type="radio"
                              name="principal"
                              value={index}
                              checked
                            />
                          </div>
                          <button
                            onClick={(e) =>
                              setSelectedImages(
                                selectedImages.filter((e) => e !== image)
                              )
                            }
                          >
                            <Icon path={mdiTrashCanOutline} size={1} />
                            <p>Delete Image</p>
                          </button>
                        </ImageFieldset>
                      );
                    })}
                </ImagesContainer>
              </div>
            </fieldset>
          </div>
        </section>

        <div style={{ display: "grid" }}>
          <SubmitButton type="submit">Submit</SubmitButton>
          <SubmitButton onClick={() => navigate(-1)}>Cancelar</SubmitButton>
        </div>
      </ProdutoFormContainer>
    </MainFormContainer>
  );
}

export default CadastrarProdutos;

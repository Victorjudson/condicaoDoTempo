import dotenv from "dotenv";

// Carrega as variáveis do arquivo .env
dotenv.config();

// Acessa a chave da API
const apiKey = process.env.API_KAY;
if (!apiKey) {
  throw new Error("API key is missing. Please check your .env file.");
}

console.log(`Sua chave de API foi carregada com sucesso: ${apiKey}`);

const form = document.querySelector("section > form");
const input: HTMLInputElement | null = document.querySelector("#input-localizacao");
const sectionTempoInfo = document.querySelector("#tempo-resultado");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input || !sectionTempoInfo) return;

  const localizacao = input.value;

  if (localizacao.length <= 3) {
    alert("Digite uma localização com mais de 3 letras!");
    return;
  }

  try {
    const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=${apiKey}&lang=pt_br&units=metric`);

    const dados = await resposta.json();
    console.log(dados);

    const infos = {
      temperatura: Math.round(dados.main.temp),
      cidade: dados.name,
      imagem: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
    };

    sectionTempoInfo.innerHTML = `<div id="tempo-info">
        <h2>${infos.cidade}</h2>

        <span>${infos.temperatura}ºC</span>
      </div>

      <img src="${infos.imagem}" />`;
  } catch (error) {
    alert("Localização não encontrada!");
  }
});

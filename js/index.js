"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("section > form");
const input = document.querySelector("#input-localizacao");
const sectionTempoInfo = document.querySelector("#tempo-resultado");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !sectionTempoInfo)
        return;
    const localizacao = input.value;
    if (localizacao.length <= 3) {
        alert("Digite uma localização com mais de 3 letras!");
        return;
    }
    try {
        const resposta = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=5843707547bc9b89f0dde3f265cb012b&lang=pt_br&units=metric`);
        const dados = yield resposta.json();
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
    }
    catch (error) {
        alert("Localização não encontrada!");
    }
}));

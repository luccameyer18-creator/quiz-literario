# Quiz de Perfil Literário

App web para incentivar a leitura entre jovens do ensino médio. O aluno responde
perguntas leves sobre o dia a dia (rolê, crush, treta, redes) e descobre seu
**perfil literário** — que leva a indicações de livros da **literatura brasileira**.

## O que melhorou em relação à versão anterior

- **Alternativas embaralhadas** a cada pergunta (Fisher-Yates). Acabou o padrão
  "letra A = sempre Romântico". O perfil viaja junto de cada opção, então
  embaralhar não afeta a pontuação.
- **Desempate aleatório** entre perfis empatados (antes vencia sempre o primeiro
  da lista, o Romântico).
- **Cores acessíveis** — o amarelo ilegível do Observador virou um âmbar escuro
  com bom contraste. Todos os perfis passam em contraste sobre fundo claro.
- **Sem login na porta de entrada** — o teste começa na hora. O "login" (na real,
  só um nome) fica no fim (checkout), apenas para salvar no histórico.
- **Histórico local** no próprio dispositivo (localStorage), sem enviar dados
  pra fora.
- **Base de livros reconstruída a partir do app original** (Romântico,
  Desbravador e Observador vêm de lá, com ano, número de páginas e sinopse).
  Cada perfil tem um **filtro de fôlego** (curto / médio / longo) e a sinopse
  abre/fecha ao toque, pra não deixar a ficha gigante no celular.
- **Mobile-first**, pensado pro celular (é onde o público usa).

> **Pendência:** os **textos dos 5 perfis** já são do app original. Só o
> perfil **Cientista** ainda está com **livros provisórios** (marcado com
> `PROVISÓRIO` no `data.js`) — assim que a lista dele chegar, é só substituir
> aquele bloco. O jeito mais fiel de obter tudo de uma vez é pegar o arquivo
> `.js` de dados do app original (F12 → Sources) num computador.

## Rodar localmente

É um site 100% estático (HTML + CSS + JS puro, sem build). Basta abrir o
`index.html` no navegador.

## Publicar na Vercel

Como este projeto é estático, o deploy é imediato. Dois caminhos:

### Caminho A — só pelo navegador (sem instalar nada)
1. Crie um repositório novo em <https://github.com/new> (pode ser público).
2. Na página do repositório, clique em **"uploading an existing file"** e
   arraste os arquivos deste projeto (`index.html`, `styles.css`, `app.js`,
   `data.js`, `README.md`). Confirme o commit.
3. Entre em <https://vercel.com/new>, clique em **Import** no repositório e em
   **Deploy**. Não precisa configurar nada (Framework Preset: *Other*).
4. Em segundos você recebe a URL pública (algo como `seu-quiz.vercel.app`).

### Caminho B — Vercel CLI (precisa do Node.js instalado)
```bash
npm i -g vercel
vercel
```
Siga o login no navegador e confirme as opções padrão.

## Estrutura

| Arquivo       | O que faz                                             |
|---------------|-------------------------------------------------------|
| `index.html`  | Telas do app (home, quiz, checkout, resultado, histórico) |
| `styles.css`  | Estilo, tema claro/escuro, responsivo                 |
| `data.js`     | Perfis, perguntas e os 50 livros                      |
| `app.js`      | Lógica: embaralhamento, pontuação, recomendação, histórico |

Para editar as perguntas ou os livros, mexa só no `data.js`.

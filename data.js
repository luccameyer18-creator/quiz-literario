/* Quiz de Perfil Literário. Base de dados
   Perfis, perguntas e livros. Variáveis globais (sem módulos) para
   rodar via file:// e na Vercel.

   RECONSTRUÇÃO fiel ao app original (quizapp-fumuhksq.manus.space):
   - Textos dos 5 perfis vieram do app original.
   - Livros de Romântico, Desbravador, Observador e Fofoqueiro vieram do app
     original (com ano, nº de páginas e sinopse).
   - CIENTISTA ainda está PROVISÓRIO (marcado abaixo): usa livros parecidos,
     à espera da lista do app original.
   - Vários perfis foram completados com títulos parecidos para dar variedade
     de fôlego (curto/médio/longo). No app original, a lista do resultado
     mistura livros entre perfis, então a divisão exata só sai do arquivo de
     dados original.

   Fôlego por nº de páginas: curto (até 150), medio (151–250), longo (251+). */

/* Perfis. As cores têm bom contraste sobre o fundo claro (legibilidade no
   celular). Cada perfil tem: linha do resultado, "sobre", cinema e exemplos. */
const PROFILES = {
  ROMANTIC: {
    key: "ROMANTIC",
    name: "Romântico",
    color: "#c0392b",
    resultLine:
      "Você é Romântico: para você, nenhuma barreira é grande demais diante do coração. Ama histórias que provam que o amor vale qualquer preço.",
    sobre:
      "Lê para sentir. Acredita que o amor é uma força capaz de vencer qualquer obstáculo. Prefere emoção à razão, idealização à crueza.",
    cinema:
      "Comédias e dramas românticos clássicos, onde o amor supera obstáculos ou termina em tragédia bonita.",
    exemplos: "The Notebook, Bridgerton, novelas mexicanas/brasileiras clássicas, Titanic.",
  },
  ADVENTURER: {
    key: "ADVENTURER",
    name: "Desbravador",
    color: "#1e7d46",
    resultLine:
      "Você é Desbravador: prefere histórias onde a coragem enfrenta o desconhecido, e a natureza é tão protagonista quanto os personagens.",
    sobre:
      "Busca o desconhecido. Prefere cenários abertos — matas, rios, terras não mapeadas. Valoriza a coragem, a lealdade e o confronto com a natureza.",
    cinema:
      "Filmes e séries de aventura e sobrevivência, com cenários naturais e jornadas físicas.",
    exemplos: "Indiana Jones, The Revenant, Vikings, documentários de expedição, Lord of the Rings.",
  },
  OBSERVER: {
    key: "OBSERVER",
    name: "Observador",
    color: "#a05a00",
    resultLine:
      "Você é Observador: enxerga o mundo com um sorriso cético, preferindo entender as pessoas a julgá-las.",
    sobre:
      "Cético e analítico. Gosta de desmontar as motivações humanas com um sorriso irônico. Prefere personagens ambíguos e finais em aberto.",
    cinema:
      "Dramas psicológicos com ironia e personagens ambíguos, narrativas que analisam a hipocrisia social.",
    exemplos: "Succession, Fleabag, filmes de Woody Allen, Big Little Lies.",
  },
  /* PROVISÓRIO — trocar pelos textos/livros do app original da esposa. */
  SCIENTIST: {
    key: "SCIENTIST",
    name: "Cientista",
    color: "#1565a6",
    resultLine:
      "Você é Cientista: encara a vida como quem estuda, querendo entender por que as pessoas e o mundo funcionam como funcionam.",
    sobre:
      "Observa a realidade sem desviar das verdades difíceis. Prefere retratos crus e histórias que explicam o comportamento humano e social.",
    cinema:
      "Retratos sociais crus e sem enfeite, histórias que mostram ambientes reais como eles são.",
    exemplos: "Cidade de Deus, The Wire, Breaking Bad.",
  },
  /* Texto ORIGINAL (app da esposa). Livros ainda parcialmente provisórios. */
  GOSSIPER: {
    key: "GOSSIPER",
    name: "Fofoqueiro",
    color: "#8e44ad",
    resultLine:
      "Você é Fofoqueiro: os salões, as intrigas e os jogos de poder da alta sociedade são seu terreno favorito — quanto mais escândalo, melhor.",
    sobre:
      "Vive pelos bastidores da alta sociedade. Interessa-se por status, aparências e jogos de poder. Não julga a maldade, ela o diverte.",
    cinema:
      "Intrigas de alta sociedade, jogos de poder, ascensão e vingança nos bastidores.",
    exemplos: "Gossip Girl, Bridgerton, The Crown, Dangerous Liaisons.",
  },
};

/* 12 perguntas de perfil + 1 de tempo de leitura. As alternativas são
   embaralhadas em tempo de execução (app.js); o perfil vai junto de cada
   opção, então embaralhar não muda a pontuação. */
const QUESTIONS = [
  {
    q: "Sexta à noite chegou. O rolê ideal pra você é:",
    options: [
      { text: "Um date só de vocês dois, um pôr do sol e clima de filme.", profile: "ROMANTIC" },
      { text: "Pegar a estrada sem destino e dormir onde a noite pegar.", profile: "ADVENTURER" },
      { text: "Ficar de canto observando a confusão e guardando as melhores histórias.", profile: "OBSERVER" },
      { text: "Um papo bom sobre por que as pessoas são do jeito que são.", profile: "SCIENTIST" },
      { text: "A festa mais concorrida, de olho em quem chegou com quem.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "Seu ex te chama depois de ter dado um perdido. Você:",
    options: [
      { text: "Perdoa na hora, o coração fala mais alto que o orgulho.", profile: "ROMANTIC" },
      { text: "Já está em outra e segue o baile, nem esquenta.", profile: "ADVENTURER" },
      { text: "Responde com uma ironia tão boa que vira print histórico.", profile: "OBSERVER" },
      { text: "Fica curioso pra entender o que fez ele voltar.", profile: "SCIENTIST" },
      { text: "Conta pro grupo inteiro antes mesmo de responder.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "Uma série pra maratonar tem que ter:",
    options: [
      { text: "Um romance que te faz torcer até o último episódio.", profile: "ROMANTIC" },
      { text: "Aventura, mundos enormes e gente enfrentando o impossível.", profile: "ADVENTURER" },
      { text: "Personagem duvidoso e um final que ninguém explica direito.", profile: "OBSERVER" },
      { text: "Um retrato da vida real, sem filtro nenhum.", profile: "SCIENTIST" },
      { text: "Muito poder, traição e gente rica se destruindo.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "Rolou uma treta no grupo. Seu papel na história é:",
    options: [
      { text: "Tentar reconciliar todo mundo, você não aguenta clima ruim.", profile: "ROMANTIC" },
      { text: "Cair fora, treta não é sua praia e você prefere paz.", profile: "ADVENTURER" },
      { text: "Assistir de camarote soltando um comentário afiado.", profile: "OBSERVER" },
      { text: "Investigar quem começou e por quê, tipo detetive.", profile: "SCIENTIST" },
      { text: "Você provavelmente já sabia de tudo antes de estourar.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "Caiu uma grana inesperada na sua conta. Primeira coisa que faz:",
    options: [
      { text: "Uma viagem a dois ou um presentão pra quem você ama.", profile: "ROMANTIC" },
      { text: "Passagem só de ida pra um lugar onde você nunca foi.", profile: "ADVENTURER" },
      { text: "Guarda quietinho e observa todo mundo dar palpite.", profile: "OBSERVER" },
      { text: "Pesquisa como fazer render, quer entender o jogo do dinheiro.", profile: "SCIENTIST" },
      { text: "Um look novo pra chegar bem no próximo evento.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "Seu maior sonho de vida seria:",
    options: [
      { text: "Viver um amor daqueles de história, pra sempre.", profile: "ROMANTIC" },
      { text: "Rodar o mundo, sem endereço fixo, juntando perrengue bom.", profile: "ADVENTURER" },
      { text: "Ter paz pra fazer suas coisas e rir das confusões dos outros.", profile: "OBSERVER" },
      { text: "Descobrir algo que mude o jeito das pessoas pensarem.", profile: "SCIENTIST" },
      { text: "Ser aquela pessoa influente que todo mundo quer por perto.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "Um print seu vazou no grupo sem você deixar. Você:",
    options: [
      { text: "Fica magoado, mexeu com o seu sentimento.", profile: "ROMANTIC" },
      { text: "Dá de ombros e some do grupo por uns dias.", profile: "ADVENTURER" },
      { text: "Solta um comentário sarcástico e vira a piada a seu favor.", profile: "OBSERVER" },
      { text: "Quer entender como vazou e por que fizeram isso.", profile: "SCIENTIST" },
      { text: "Já descobre quem espalhou e devolve na mesma moeda.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "Rolou uma injustiça clara na escola. Sua reação:",
    options: [
      { text: "Fica do lado de quem se machucou, na emoção.", profile: "ROMANTIC" },
      { text: "Se for muito errado, você mesmo encara de frente.", profile: "ADVENTURER" },
      { text: "Observa, guarda tudo e comenta depois, com veneno.", profile: "OBSERVER" },
      { text: "Quer entender a raiz: por que isso pôde acontecer.", profile: "SCIENTIST" },
      { text: "Espalha a história até virar assunto de todo mundo.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "Numa festa cheia de gente que você não conhece, você:",
    options: [
      { text: "Acaba num papo profundo e apaixonante num canto.", profile: "ROMANTIC" },
      { text: "Já está explorando a casa, a laje, o quintal, tudo.", profile: "ADVENTURER" },
      { text: "Encosta na parede e lê a sala inteira num olhar.", profile: "OBSERVER" },
      { text: "Fica curioso pra sacar como os grupinhos se formaram.", profile: "SCIENTIST" },
      { text: "Em dez minutos já sabe o babado de meia festa.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "Num mundo de fantasia (tipo Game of Thrones ou Harry Potter), você buscaria:",
    options: [
      { text: "Um amor épico que atravessa reinos.", profile: "ROMANTIC" },
      { text: "Explorar terras proibidas e encarar o desconhecido.", profile: "ADVENTURER" },
      { text: "Ser o conselheiro que sacou o jogo antes de todo mundo.", profile: "OBSERVER" },
      { text: "Estudar a magia e o sistema por trás de tudo.", profile: "SCIENTIST" },
      { text: "Manobrar nos bastidores até chegar ao trono.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "Você viraliza do nada. Sua reação:",
    options: [
      { text: "Se emociona com o carinho das pessoas.", profile: "ROMANTIC" },
      { text: "Aproveita a deixa e some pra viver algo real.", profile: "ADVENTURER" },
      { text: "Acha graça de como a internet é.", profile: "OBSERVER" },
      { text: "Quer entender o algoritmo: por que aquilo bombou?", profile: "SCIENTIST" },
      { text: "Surfa a fama e aproveita cada segundo dos holofotes.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "O personagem que mais te prende numa história é:",
    options: [
      { text: "O apaixonado que faria qualquer coisa por amor.", profile: "ROMANTIC" },
      { text: "O corajoso que encara qualquer parada de frente.", profile: "ADVENTURER" },
      { text: "O irônico que você nunca sabe o que está pensando.", profile: "OBSERVER" },
      { text: "O que desmonta o mundo pra mostrar como ele funciona.", profile: "SCIENTIST" },
      { text: "O manipulador charmoso que domina os bastidores.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "Sendo bem sincero: quanto de leitura você topa encarar agora?",
    isStamina: true,
    options: [
      { text: "Pouca. Quero algo que me prenda rápido, sem enrolação.", stamina: "curto" },
      { text: "Um meio-termo, sem pressa e sem maratona.", stamina: "medio" },
      { text: "Pode vir bastante, quanto mais história melhor.", stamina: "longo" },
    ],
  },
];

/* Livros. Campos: title, author, year, pages (opcional), profile, stamina, synopsis.
   stamina: curto (até ~150 pág), medio (~151 a 250), longo (251+).
   Marcados com "// original" vieram do app da esposa (com sinopse dela). */
const BOOKS = [
  /* ============================ ROMÂNTICO ============================ */
  // original (app da esposa)
  { title: "Cinco Minutos", author: "José de Alencar", year: 1856, pages: 80, profile: "ROMANTIC", stamina: "curto",
    synopsis: "O narrador relata como um atraso de apenas cinco minutos para tomar um ônibus em direção ao Andaraí mudou completamente sua vida. No veículo, ele conhece uma mulher misteriosa, Carlota, cujo rosto permanece oculto sob um véu por grande parte da trama. O mistério que a envolve deve-se a uma “fatalidade”: uma doença grave (tuberculose) que a faz evitar o compromisso amoroso para poupar o amado do sofrimento. Após perseguições românticas que os levam até a Europa, o casal consegue encontrar a felicidade, provando como um pequeno grão de areia no destino pode ser decisivo." },
  { title: "Encarnação", author: "José de Alencar", year: 1893, pages: 104, profile: "ROMANTIC", stamina: "curto",
    synopsis: "Publicado postumamente. A história de Hermano, um viúvo obcecado pela memória de sua esposa morta (Julieta), e como sua nova esposa (Amália) precisa superar a “encarnação” dessa memória." },
  { title: "A Viuvinha", author: "José de Alencar", year: 1857, pages: 112, profile: "ROMANTIC", stamina: "curto",
    synopsis: "Conta a história de Jorge, um jovem rico que, após ser levado à ruína financeira e à desonra por sua vida dissipada, decide forjar o próprio suicídio na véspera de seu casamento. Sua noiva, Carolina, passa a ser conhecida como a “Viuvinha”, mantendo-se fiel à memória do marido. Jorge, sob a identidade oculta de Carlos, trabalha arduamente para recuperar sua fortuna e honra, observando de longe o sofrimento da amada até que possa finalmente revelar-se e reuni-los." },
  { title: "O Garatuja (Alfarrábios)", author: "José de Alencar", year: 1873, pages: 128, profile: "ROMANTIC", stamina: "curto",
    synopsis: "Crônica da época colonial. O Garatuja é um romancete que conta a história do jovem Ivo, um grafiteiro no Rio de Janeiro colonial, e seu romance com a jovem Marta." },
  // complementos parecidos (do repo, pra dar variedade de fôlego)
  { title: "Noite na Taverna", author: "Álvares de Azevedo", year: 1855, profile: "ROMANTIC", stamina: "curto",
    synopsis: "Cinco amigos numa taverna contam histórias de amor e morte. Tem um clima sombrio no meio do romance." },
  { title: "A Moreninha", author: "Joaquim Manuel de Macedo", year: 1844, profile: "ROMANTIC", stamina: "medio",
    synopsis: "Uns jovens passam um fim de semana numa ilha e rola uma aposta sobre quem se apaixona primeiro." },
  { title: "A Escrava Isaura", author: "Bernardo Guimarães", year: 1875, profile: "ROMANTIC", stamina: "medio",
    synopsis: "Isaura foi criada quase como filha da casa, mas segue escravizada e luta pela liberdade e por um amor. Virou novela." },
  { title: "Lucíola", author: "José de Alencar", year: 1862, profile: "ROMANTIC", stamina: "medio",
    synopsis: "Um rapaz se apaixona por uma mulher que a sociedade julga o tempo todo. Um amor que enfrenta muito preconceito." },
  { title: "Amar, Verbo Intransitivo", author: "Mário de Andrade", year: 1927, profile: "ROMANTIC", stamina: "medio",
    synopsis: "Uma família contrata uma professora pra “ensinar o amor” ao filho adolescente. Fala de desejo e das regras hipócritas da época." },
  { title: "Til", author: "José de Alencar", year: 1872, profile: "ROMANTIC", stamina: "longo",
    synopsis: "Paixão, ciúme e reviravolta na vida do interior. Tem cara de novela mesmo." },

  /* =========================== DESBRAVADOR =========================== */
  // original (app da esposa)
  { title: "O Guarani", author: "José de Alencar", year: 1857, pages: 241, profile: "ADVENTURER", stamina: "medio",
    synopsis: "Marco do indianismo, foca na figura de Peri, um índio Goytacaz de nobreza excepcional que dedica sua vida à proteção de Cecília (“Ceci”), filha do fidalgo português D. Antônio de Mariz. Ambientado na Serra dos Órgãos, o enredo envolve conflitos contra a tribo dos Aymorés e as traições de aventureiros dentro da própria casa de Mariz. No desfecho épico, durante uma inundação, Peri e Cecília são os únicos sobreviventes, flutuando em uma palmeira como uma reedição do mito do dilúvio." },
  { title: "Iracema", author: "José de Alencar", year: 1865, pages: 168, profile: "ADVENTURER", stamina: "medio",
    synopsis: "Descrita como uma “lenda do Ceará”, a obra narra o amor proibido entre Iracema, a virgem dos lábios de mel e guardiã do segredo da Jurema, e o guerreiro branco Martim. O relacionamento causa o afastamento de Iracema de sua tribo, os Tabajaras, e a une aos inimigos Pitiguaras, liderados por Poty, irmão de armas de Martim. O filho do casal, Moacyr, nasce da dor, simbolizando o surgimento do povo cearense a partir do encontro de duas raças." },
  { title: "O Tronco do Ipê", author: "José de Alencar", year: 1872, pages: 247, profile: "ADVENTURER", stamina: "medio",
    synopsis: "Romance regionalista da segunda fase de Alencar. A história de Mário, um menino assombrado que busca vingança ligada ao tronco de um ipê, onde supostamente está o segredo de sua família." },
  { title: "Inocência", author: "Visconde de Taunay", year: 1872, pages: 289, profile: "ADVENTURER", stamina: "longo",
    synopsis: "Um clássico da literatura regionalista. Conta a história de Inocência, uma jovem sertaneja que é forçada a um casamento arranjado, e seu amor pelo engenheiro Cirino." },
  // complementos parecidos (do repo)
  { title: "Vidas Secas", author: "Graciliano Ramos", year: 1938, profile: "ADVENTURER", stamina: "curto",
    synopsis: "Uma família foge da seca quase sem nada e tenta sobreviver no sertão. Curto e muito forte." },
  { title: "Contos Gauchescos", author: "Simões Lopes Neto", year: 1912, profile: "ADVENTURER", stamina: "curto",
    synopsis: "Histórias de peões e brigas nos pampas, contadas do jeito gaúcho. Boas pra ler aos poucos." },
  { title: "O Quinze", author: "Rachel de Queiroz", year: 1930, profile: "ADVENTURER", stamina: "medio",
    synopsis: "A seca de 1915 obriga uma família a largar tudo e migrar. Fala de coragem e de perder pelo caminho." },
  { title: "Sagarana", author: "Guimarães Rosa", year: 1946, profile: "ADVENTURER", stamina: "longo",
    synopsis: "Contos do sertão com briga, viagem e causo. É um bom jeito de começar a ler Guimarães Rosa." },
  { title: "Os Sertões", author: "Euclides da Cunha", year: 1902, profile: "ADVENTURER", stamina: "longo",
    synopsis: "O relato da Guerra de Canudos e da vida dura no sertão. Denso, mas impressiona." },
  { title: "Grande Sertão: Veredas", author: "Guimarães Rosa", year: 1956, profile: "ADVENTURER", stamina: "longo",
    synopsis: "Um antigo jagunço conta sua vida, seus amores e um pacto com o diabo. É difícil, mas é considerado o maior livro brasileiro." },

  /* =========================== OBSERVADOR =========================== */
  // original (app da esposa)
  { title: "Lésbia", author: "Maria Benedita Bormann (Délia)", year: 1890, pages: 106, profile: "OBSERVER", stamina: "curto",
    synopsis: "Romance que acompanha Arabela (Bela), jovem inteligente que, após um matrimônio marcado por maus tratos e uma separação aos dezenove anos, enfrenta a sociedade para viver conforme o próprio desejo." },
  { title: "Ressurreição", author: "Machado de Assis", year: 1872, pages: 120, profile: "OBSERVER", stamina: "curto",
    synopsis: "O primeiro romance de Machado de Assis. Um drama psicológico sobre Félix, um homem cético que duvida do amor de Lúcia e teme ser traído novamente." },
  { title: "O Seminarista", author: "Bernardo Guimarães", year: 1872, pages: 160, profile: "OBSERVER", stamina: "medio",
    synopsis: "Romance regionalista mineiro que narra o conflito de Eugênio entre seu amor por Margarida e o celibato forçado ao ser enviado ao seminário." },
  { title: "A Mão e a Luva", author: "Machado de Assis", year: 1874, pages: 160, profile: "OBSERVER", stamina: "medio",
    synopsis: "Uma crônica de costumes onde o autor analisa o comportamento de Guiomar, uma jovem ambiciosa e elegante que busca ascensão social através de casamentos estratégicos." },
  { title: "Helena", author: "Machado de Assis", year: 1876, pages: 280, profile: "OBSERVER", stamina: "longo",
    synopsis: "O drama de Helena, uma jovem de origem humilde descoberta pelo Conselheiro Vale, que a reconhece como filha e a introduz na alta sociedade, gerando conflito de classe e amores não correspondidos." },
  { title: "Memórias de um Sargento de Milícias", author: "Manuel Antônio de Almeida", year: 1854, pages: 272, profile: "OBSERVER", stamina: "longo",
    synopsis: "Obra picaresca que retrata os costumes do Rio de Janeiro no “tempo do rei” (D. João VI). Narra a vida de Leonardo, filho de imigrantes portugueses, cujas travessuras o acompanham desde o nascimento. A narrativa descreve sua educação indisciplinada e os constantes problemas com a ordem pública, personificada pelo Major Vidigal. Apesar de sua vida errante, o protagonista acaba elevado ao posto de sargento e se casa, alcançando uma estabilidade social inesperada." },
  { title: "A Mortalha de Alzira", author: "Aluísio Azevedo", year: 1894, pages: 280, profile: "OBSERVER", stamina: "longo",
    synopsis: "Romance fantástico e naturalista. A história da baronesa de Santarém, obcecada em ressuscitar sua filha Alzira, usando métodos macabros e explorando os limites da ciência e da loucura." },
  { title: "Memórias Póstumas de Brás Cubas", author: "Machado de Assis", year: 1881, pages: 368, profile: "OBSERVER", stamina: "longo",
    synopsis: "Inova ao apresentar um “defunto autor”, Brás Cubas, que escreve suas memórias a partir do túmulo. Com um tom irônico e pessimista, ele analisa seus fracassos amorosos (como o caso com Virgília), sua falta de propósito e a mediocridade de sua classe social. A obra introduz a filosofia do “Humanitismo”, que tenta justificar as mazelas da vida por meio de uma lógica rigorosa, mas cômica." },
  { title: "Quincas Borba", author: "Machado de Assis", year: 1891, pages: 400, profile: "OBSERVER", stamina: "longo",
    synopsis: "Dá continuidade às ideias machadianas através de Rubião, um ingênuo professor que herda a fortuna e o cachorro (também chamado Quincas Borba) do filósofo de mesmo nome. Ao mudar-se para o Rio de Janeiro, ele se torna alvo da ambição do casal Cristiano Palha e Sofia. Rubião acaba perdendo a sanidade e a riqueza, imerso em delírios de grandeza, enquanto Sofia manipula seus afetos para ganho próprio." },

  /* ===================== CIENTISTA (PROVISÓRIO) ===================== */
  /* Livros parecidos, do repo. Trocar pela lista do app original da esposa. */
  { title: "Bom-Crioulo", author: "Adolfo Caminha", year: 1895, profile: "SCIENTIST", stamina: "curto",
    synopsis: "Um marinheiro se apaixona por um grumete no Brasil do século XIX. Foi ousado demais pra época." },
  { title: "O Cortiço", author: "Aluísio Azevedo", year: 1890, profile: "SCIENTIST", stamina: "medio",
    synopsis: "A vida de um cortiço inteiro, com todo mundo se misturando e afundando junto. O clássico do naturalismo." },
  { title: "Casa de Pensão", author: "Aluísio Azevedo", year: 1884, profile: "SCIENTIST", stamina: "medio",
    synopsis: "Um jovem vai pra capital cheio de sonho e a cidade grande vai acabando com ele." },
  { title: "O Ateneu", author: "Raul Pompeia", year: 1888, profile: "SCIENTIST", stamina: "medio",
    synopsis: "A rotina dura de um internato pelos olhos de um garoto. Mostra como o ambiente molda a pessoa." },
  { title: "São Bernardo", author: "Graciliano Ramos", year: 1934, profile: "SCIENTIST", stamina: "medio",
    synopsis: "Um fazendeiro trata tudo como negócio, até o casamento, e vê a vida desmoronar. Seco e direto." },
  { title: "Quarto de Despejo", author: "Carolina Maria de Jesus", year: 1960, profile: "SCIENTIST", stamina: "medio",
    synopsis: "O diário de verdade de uma mulher que catava lixo pra sobreviver na favela dos anos 60. Difícil ficar indiferente." },
  { title: "O Mulato", author: "Aluísio Azevedo", year: 1881, profile: "SCIENTIST", stamina: "longo",
    synopsis: "Um homem volta pra cidade natal e esbarra no racismo e na hipocrisia de todo mundo. Corajoso pra época." },
  { title: "Angústia", author: "Graciliano Ramos", year: 1936, profile: "SCIENTIST", stamina: "longo",
    synopsis: "A cabeça de um homem sendo tomada pelo ciúme e pela frustração. Um livro sufocante, no bom sentido." },
  { title: "Cidade de Deus", author: "Paulo Lins", year: 1997, profile: "SCIENTIST", stamina: "longo",
    synopsis: "A favela e o crescimento do crime ao longo de anos, com dezenas de personagens. Cru e viciante." },

  /* =========================== FOFOQUEIRO =========================== */
  /* Texto do perfil é original; livros ainda parcialmente provisórios.
     Obs.: no app original a lista do resultado mistura livros entre perfis
     (Quincas Borba, Helena e Memórias de um Sargento também apareceram aqui),
     então a divisão exata por perfil só sai do arquivo de dados original. */
  // original (app da esposa) — apareceu no resultado de Fofoqueiro
  { title: "Guerra dos Mascates", author: "José de Alencar", year: 1873, pages: 290, profile: "GOSSIPER", stamina: "longo",
    synopsis: "Romance histórico que dramatiza a Revolta dos Mascates ocorrida em Pernambuco em 1710, mostrando o conflito entre comerciantes portugueses e nobres brasileiros." },
  // complementos parecidos (do repo, tematicamente de intriga/alta sociedade)
  { title: "A Pata da Gazela", author: "José de Alencar", year: 1870, profile: "GOSSIPER", stamina: "curto",
    synopsis: "Vaidade e jogo de conquista na alta sociedade. Uma fofoca fina de época." },
  { title: "Diva", author: "José de Alencar", year: 1864, profile: "GOSSIPER", stamina: "medio",
    synopsis: "A vida e os caprichos de uma mulher rica que sobe na sociedade. Muito jogo de aparência." },
  { title: "A Normalista", author: "Adolfo Caminha", year: 1893, profile: "GOSSIPER", stamina: "medio",
    synopsis: "Um escândalo numa cidade pequena e toda a hipocrisia em volta. O tipo de história que vira fofoca." },
  { title: "A Falência", author: "Júlia Lopes de Almeida", year: 1901, profile: "GOSSIPER", stamina: "longo",
    synopsis: "Uma família rica começa a afundar e os segredos vão aparecendo. Dinheiro, aparência e disfarce." },
  { title: "Senhora", author: "José de Alencar", year: 1875, profile: "GOSSIPER", stamina: "longo",
    synopsis: "Uma mulher usa a própria fortuna pra comprar o noivo que a humilhou e se vingar. Casamento tratado como negócio." },
  { title: "A Sucessora", author: "Carolina Nabuco", year: 1934, profile: "GOSSIPER", stamina: "longo",
    synopsis: "Uma segunda esposa vive na sombra da primeira dentro de uma mansão cheia de ciúme. Inspirou “Rebecca”." },
  { title: "Fogo Morto", author: "José Lins do Rego", year: 1943, profile: "GOSSIPER", stamina: "longo",
    synopsis: "A queda dos velhos engenhos e as intrigas das famílias importantes. Muita gente falando pelas costas." },
  { title: "A Marquesa de Santos", author: "Paulo Setúbal", year: 1925, profile: "GOSSIPER", stamina: "longo",
    synopsis: "Poder, romance e fofoca na corte de Dom Pedro I. A intriga chegando dentro do palácio." },
  { title: "Esaú e Jacó", author: "Machado de Assis", year: 1904, profile: "GOSSIPER", stamina: "longo",
    synopsis: "Dois irmãos gêmeos que discordam de tudo, até de política e de amor. Vaidade e disputa sem parar." },
];

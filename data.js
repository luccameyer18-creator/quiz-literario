/* =========================================================================
   Quiz de Perfil Literário — base de dados
   Perfis, perguntas e os 50 livros da literatura brasileira.
   Tudo em variáveis globais (sem módulos) para rodar via file:// e na Vercel.
   ========================================================================= */

/* ---- Perfis --------------------------------------------------------------
   Cores acessíveis (contraste OK sobre fundo claro). O amarelo ilegível do
   app original foi trocado por um âmbar escuro.                              */
const PROFILES = {
  ROMANTIC: {
    key: "ROMANTIC",
    name: "Romântico",
    emoji: "❤️",
    color: "#e11d48",
    tagline: "O amor acima de tudo.",
    description:
      "Você lê (e vive) pra sentir. Acredita que o amor é uma força capaz de vencer qualquer obstáculo — e prefere a emoção à razão, o sonho à dureza da realidade.",
    vibe: "Você é o tipo que torce até o último capítulo pra o casal ficar junto.",
    cinema: "Dramas e comédias românticas onde o amor supera tudo (ou termina numa tragédia linda).",
    examples: "Diário de uma Paixão, Bridgerton, Titanic, novelas clássicas.",
  },
  ADVENTURER: {
    key: "ADVENTURER",
    name: "Desbravador",
    emoji: "🧭",
    color: "#15803d",
    tagline: "O mundo é pra ser explorado.",
    description:
      "Você busca o desconhecido: matas, estradas, terras não mapeadas. Valoriza a coragem, a liberdade e o confronto com a natureza. Ficar parado não é uma opção.",
    vibe: "Você é aquele que topa a estrada sem destino e volta com as melhores histórias.",
    cinema: "Aventura e sobrevivência, jornadas épicas e cenários naturais gigantes.",
    examples: "Indiana Jones, O Regresso, Vikings, Senhor dos Anéis.",
  },
  OBSERVER: {
    key: "OBSERVER",
    name: "Observador",
    emoji: "🕵️",
    color: "#b45309",
    tagline: "Um sorriso cético diante do mundo.",
    description:
      "Cético e analítico, você adora desmontar as motivações humanas com ironia fina. Prefere personagens ambíguos e finais em aberto — nada é preto no branco pra você.",
    vibe: "Você é o que fica de canto na festa lendo a sala inteira num olhar só.",
    cinema: "Dramas psicológicos com ironia, personagens ambíguos e crítica social.",
    examples: "Succession, Fleabag, Big Little Lies, filmes do Woody Allen.",
  },
  SCIENTIST: {
    key: "SCIENTIST",
    name: "Cientista",
    emoji: "🔬",
    color: "#0369a1",
    tagline: "Quero entender como tudo funciona.",
    description:
      "Você encara a vida como um laboratório social. Se interessa por como o ambiente e a época moldam as pessoas, e não tem medo de encarar as verdades mais cruas da sociedade.",
    vibe: "Você é o que pergunta 'mas por que as pessoas são desse jeito?' — e quer a resposta de verdade.",
    cinema: "Ficção social crua, retratos sem filtro de ambientes reais e duros.",
    examples: "Cidade de Deus, The Wire, Breaking Bad, Trainspotting.",
  },
  GOSSIPER: {
    key: "GOSSIPER",
    name: "Fofoqueiro",
    emoji: "🍿",
    color: "#7e22ce",
    tagline: "O babado corre pelos bastidores.",
    description:
      "Você vive pelos bastidores: status, aparências e jogos de poder são o seu terreno. Não julga a maldade alheia — ela te diverte. Quanto mais intriga, melhor a história.",
    vibe: "Você é o que em 10 minutos de festa já sabe quem tá com quem.",
    cinema: "Intrigas da alta sociedade, jogos de poder, ascensão e vingança.",
    examples: "Gossip Girl, The Crown, Bridgerton, Ligações Perigosas.",
  },
};

/* ---- Perguntas -----------------------------------------------------------
   12 perguntas de perfil (estilo que cativa adolescente) + 1 de tempo de
   leitura. As alternativas são EMBARALHADAS em tempo de execução (app.js);
   o perfil viaja junto de cada opção, então embaralhar não quebra a
   pontuação. Aqui a ordem é só a de referência.                             */
const QUESTIONS = [
  {
    q: "Sexta à noite chegou. O rolê ideal pra você é:",
    options: [
      { text: "Um date só de vocês dois, um pôr do sol, clima de filme.", profile: "ROMANTIC" },
      { text: "Pegar a estrada sem destino e dormir onde a noite pegar.", profile: "ADVENTURER" },
      { text: "Ficar de canto observando o show de horrores e guardar as melhores histórias.", profile: "OBSERVER" },
      { text: "Um papo cabeça sobre 'por que as pessoas são desse jeito'.", profile: "SCIENTIST" },
      { text: "A festa mais concorrida, de olho em quem chegou com quem.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "Seu ex te chama depois de ter te dado um perdido. Você:",
    options: [
      { text: "Perdoa na hora — o coração fala mais alto que o orgulho.", profile: "ROMANTIC" },
      { text: "Já tá em outra vibe; segue o baile e nem esquenta.", profile: "ADVENTURER" },
      { text: "Responde com uma ironia tão boa que vira print histórico.", profile: "OBSERVER" },
      { text: "Fica curioso pra entender o que fez ele voltar.", profile: "SCIENTIST" },
      { text: "Conta pro grupo inteiro antes mesmo de responder.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "Uma série pra maratonar TEM que ter:",
    options: [
      { text: "Um romance que te faz torcer até o último episódio.", profile: "ROMANTIC" },
      { text: "Aventura, mundos enormes e gente enfrentando o impossível.", profile: "ADVENTURER" },
      { text: "Personagens duvidosos e um final que ninguém explica direito.", profile: "OBSERVER" },
      { text: "Um retrato cru da vida real, sem filtro nenhum.", profile: "SCIENTIST" },
      { text: "Muito poder, traição e gente rica se destruindo.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "Rolou uma treta no grupo. Seu papel na história é:",
    options: [
      { text: "Tentar reconciliar todo mundo — você odeia clima ruim.", profile: "ROMANTIC" },
      { text: "Cair fora; treta não é sua praia, você prefere paz.", profile: "ADVENTURER" },
      { text: "Assistir de camarote soltando comentário afiado.", profile: "OBSERVER" },
      { text: "Investigar quem começou e por quê, tipo detetive.", profile: "SCIENTIST" },
      { text: "Você provavelmente já sabia de tudo antes de estourar.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "Caiu uma grana inesperada na sua conta. Primeira coisa:",
    options: [
      { text: "Uma viagem a dois ou um presentão pra quem você ama.", profile: "ROMANTIC" },
      { text: "Passagem só de ida pra um lugar que você nunca foi.", profile: "ADVENTURER" },
      { text: "Guarda quietinho e observa todo mundo te dar palpite.", profile: "OBSERVER" },
      { text: "Pesquisa como fazer render — quer entender o jogo do dinheiro.", profile: "SCIENTIST" },
      { text: "Um look novo pra chegar chegando no próximo evento.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "Seu maior sonho de vida seria:",
    options: [
      { text: "Viver um amor daqueles de história, pra sempre.", profile: "ROMANTIC" },
      { text: "Rodar o mundo, sem endereço fixo, colecionando perrengue bom.", profile: "ADVENTURER" },
      { text: "Ter paz pra fazer suas coisas e rir das confusões alheias.", profile: "OBSERVER" },
      { text: "Descobrir algo que mude o jeito das pessoas pensarem.", profile: "SCIENTIST" },
      { text: "Ser aquela pessoa influente que todo mundo quer por perto.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "Um print seu vazou no grupo sem sua permissão. Você:",
    options: [
      { text: "Fica magoado — mexeu com o seu sentimento.", profile: "ROMANTIC" },
      { text: "Dá de ombros e some do grupo por uns dias.", profile: "ADVENTURER" },
      { text: "Solta um comentário sarcástico e vira a piada a seu favor.", profile: "OBSERVER" },
      { text: "Quer entender como vazou e por que fizeram isso.", profile: "SCIENTIST" },
      { text: "Já descobre quem espalhou e devolve na mesma moeda.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "Rolou uma injustiça óbvia na escola. Sua reação:",
    options: [
      { text: "Fica do lado de quem se machucou, na emoção.", profile: "ROMANTIC" },
      { text: "Se for muito errado, você mesmo peita e encara.", profile: "ADVENTURER" },
      { text: "Observa, anota mentalmente e comenta depois — com veneno.", profile: "OBSERVER" },
      { text: "Quer entender a raiz: por que o sistema deixou isso acontecer.", profile: "SCIENTIST" },
      { text: "Espalha a história até virar assunto de todo mundo.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "Numa festa cheia de desconhecidos, você:",
    options: [
      { text: "Acaba num papo profundo e apaixonante num canto.", profile: "ROMANTIC" },
      { text: "Já tá explorando a casa, a laje, o quintal — tudo.", profile: "ADVENTURER" },
      { text: "Encosta na parede e lê a sala inteira num olhar.", profile: "OBSERVER" },
      { text: "Fica curioso pra sacar como os grupinhos se formaram.", profile: "SCIENTIST" },
      { text: "Em 10 minutos já sabe o babado de metade da festa.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "Num mundo de fantasia (tipo Game of Thrones ou Harry Potter), você buscaria:",
    options: [
      { text: "Um amor épico que atravessa reinos.", profile: "ROMANTIC" },
      { text: "Explorar terras proibidas e enfrentar o desconhecido.", profile: "ADVENTURER" },
      { text: "Ser o conselheiro cínico que sacou o jogo antes de todos.", profile: "OBSERVER" },
      { text: "Estudar a magia e o sistema por trás de tudo.", profile: "SCIENTIST" },
      { text: "Manobrar nos bastidores até chegar ao trono.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "Você viraliza do nada. Sua reação:",
    options: [
      { text: "Se emociona com o carinho das pessoas.", profile: "ROMANTIC" },
      { text: "Aproveita a deixa e some pra viver algo real.", profile: "ADVENTURER" },
      { text: "Acha graça irônica de como a internet é.", profile: "OBSERVER" },
      { text: "Quer entender o algoritmo: por que AQUILO bombou?", profile: "SCIENTIST" },
      { text: "Surfa a fama e aproveita cada segundo dos holofotes.", profile: "GOSSIPER" },
    ],
  },
  {
    q: "O personagem que mais te prende numa história é:",
    options: [
      { text: "O apaixonado que faria qualquer coisa por amor.", profile: "ROMANTIC" },
      { text: "O corajoso que encara qualquer parada de frente.", profile: "ADVENTURER" },
      { text: "O irônico ambíguo que você nunca sabe o que pensa.", profile: "OBSERVER" },
      { text: "O que desmonta o mundo pra mostrar como ele funciona.", profile: "SCIENTIST" },
      { text: "O manipulador charmoso que domina os bastidores.", profile: "GOSSIPER" },
    ],
  },
  /* Pergunta de fôlego de leitura (não pontua perfil) */
  {
    q: "Na real: quanto de leitura você topa encarar agora?",
    isStamina: true,
    options: [
      { text: "Pouca. Quero algo que me prenda rápido, sem enrolação.", stamina: "curto" },
      { text: "Um meio-termo — sem pressa e sem maratona.", stamina: "medio" },
      { text: "Manda ver! Quanto mais história, melhor.", stamina: "longo" },
    ],
  },
];

/* ---- Os 50 livros --------------------------------------------------------
   stamina: curto (≈ até 150 pág) · medio (≈ 150–250) · longo (≈ 250+)        */
const BOOKS = [
  // ---------------- ROMÂNTICO ----------------
  { title: "Iracema", author: "José de Alencar", profile: "ROMANTIC", stamina: "curto",
    blurb: "Um amor impossível entre um colonizador e uma indígena. Lírico e trágico — tipo Romeu e Julieta tupiniquim." },
  { title: "Cinco Minutos", author: "José de Alencar", profile: "ROMANTIC", stamina: "curto",
    blurb: "Um encontro de cinco minutos vira uma paixão avassaladora. Curtinho e cheio de suspiros." },
  { title: "Noite na Taverna", author: "Álvares de Azevedo", profile: "ROMANTIC", stamina: "curto",
    blurb: "Amor, morte e histórias sombrias contadas numa noite. Romântico gótico pra quem curte um clima dark." },
  { title: "A Moreninha", author: "Joaquim Manuel de Macedo", profile: "ROMANTIC", stamina: "medio",
    blurb: "Uma aposta amorosa entre jovens num verão na ilha. Leve e fofo — o rom-com do século XIX." },
  { title: "A Escrava Isaura", author: "Bernardo Guimarães", profile: "ROMANTIC", stamina: "medio",
    blurb: "Amor proibido e luta pela liberdade. Emoção do começo ao fim — virou até novela." },
  { title: "Lucíola", author: "José de Alencar", profile: "ROMANTIC", stamina: "medio",
    blurb: "Uma paixão intensa por uma mulher julgada pela sociedade. Amor que enfrenta o preconceito." },
  { title: "Helena", author: "Machado de Assis", profile: "ROMANTIC", stamina: "medio",
    blurb: "Um segredo de família e um amor que não podia existir. Machado no modo coração partido." },
  { title: "Amar, Verbo Intransitivo", author: "Mário de Andrade", profile: "ROMANTIC", stamina: "medio",
    blurb: "Sobre desejo, primeiro amor e as regras hipócritas do afeto. Moderno e ousado." },
  { title: "Til", author: "José de Alencar", profile: "ROMANTIC", stamina: "longo",
    blurb: "Drama rural cheio de paixão, ciúme e reviravolta. Novelão puro." },
  { title: "O Guarani", author: "José de Alencar", profile: "ROMANTIC", stamina: "longo",
    blurb: "Peri arrisca tudo por amor a Ceci. Aventura e romance épico na floresta." },

  // ---------------- DESBRAVADOR ----------------
  { title: "Vidas Secas", author: "Graciliano Ramos", profile: "ADVENTURER", stamina: "curto",
    blurb: "Uma família luta contra a seca e a fome no sertão. Cru, forte e inesquecível." },
  { title: "Contos Gauchescos", author: "Simões Lopes Neto", profile: "ADVENTURER", stamina: "curto",
    blurb: "Causos de peões, valentia e vida nos pampas. Aventura em pílulas." },
  { title: "O Quinze", author: "Rachel de Queiroz", profile: "ADVENTURER", stamina: "medio",
    blurb: "A seca de 1915 empurra o povo à migração. Coragem e resistência de sobra." },
  { title: "Inocência", author: "Visconde de Taunay", profile: "ADVENTURER", stamina: "medio",
    blurb: "Amor e perigo no interior selvagem do Brasil. Aventura sertaneja com romance." },
  { title: "Contos Amazônicos", author: "Inglês de Sousa", profile: "ADVENTURER", stamina: "medio",
    blurb: "Histórias assombradas e selvagens no coração da Amazônia." },
  { title: "Sagarana", author: "Guimarães Rosa", profile: "ADVENTURER", stamina: "longo",
    blurb: "Contos do sertão com aventura, valentia e causos. O Rosa mais acessível pra começar." },
  { title: "Os Sertões", author: "Euclides da Cunha", profile: "ADVENTURER", stamina: "longo",
    blurb: "A guerra de Canudos e a terra dura do sertão. Uma reportagem épica e brutal." },
  { title: "O Sertanejo", author: "José de Alencar", profile: "ADVENTURER", stamina: "longo",
    blurb: "Um herói do sertão, coragem e cavalos. Quase um faroeste brasileiro." },
  { title: "Grande Sertão: Veredas", author: "Guimarães Rosa", profile: "ADVENTURER", stamina: "longo",
    blurb: "Jagunços, travessias e o maior sertão da literatura. Um épico pra encarar de verdade." },
  { title: "Maíra", author: "Darcy Ribeiro", profile: "ADVENTURER", stamina: "longo",
    blurb: "O choque entre a floresta indígena e o mundo de fora. Imersivo e potente." },

  // ---------------- OBSERVADOR ----------------
  { title: "O Alienista", author: "Machado de Assis", profile: "OBSERVER", stamina: "curto",
    blurb: "Um médico decide quem é louco numa cidade inteira. Sátira genial e curtinha." },
  { title: "A Cartomante e outros contos", author: "Machado de Assis", profile: "OBSERVER", stamina: "curto",
    blurb: "Contos com destino, traição e finais que dão nó na cabeça. Machado em doses certeiras." },
  { title: "A Hora da Estrela", author: "Clarice Lispector", profile: "OBSERVER", stamina: "curto",
    blurb: "Macabéa, uma moça que ninguém vê, narrada com ironia e compaixão. Curto e devastador." },
  { title: "Dom Casmurro", author: "Machado de Assis", profile: "OBSERVER", stamina: "medio",
    blurb: "Traiu ou não traiu? O ciúme mais famoso da literatura, contado por um narrador nada confiável." },
  { title: "Memórias Póstumas de Brás Cubas", author: "Machado de Assis", profile: "OBSERVER", stamina: "medio",
    blurb: "Um defunto conta a própria vida com ironia total. Ácido, moderno e genial." },
  { title: "Memorial de Aires", author: "Machado de Assis", profile: "OBSERVER", stamina: "medio",
    blurb: "Um velho diplomata observa um amor de longe. Sutil, melancólico e afiado." },
  { title: "Papéis Avulsos", author: "Machado de Assis", profile: "OBSERVER", stamina: "medio",
    blurb: "Coletânea com contos certeiros como 'O Alienista'. Ironia em cada página." },
  { title: "Laços de Família", author: "Clarice Lispector", profile: "OBSERVER", stamina: "medio",
    blurb: "Contos sobre pequenas revelações no cotidiano. Um olhar afiado sobre as pessoas." },
  { title: "Iaiá Garcia", author: "Machado de Assis", profile: "OBSERVER", stamina: "medio",
    blurb: "Amor, interesse e orgulho numa trama sutil. Machado começando a afiar a ironia." },
  { title: "Quincas Borba", author: "Machado de Assis", profile: "OBSERVER", stamina: "longo",
    blurb: "'Ao vencedor, as batatas!' Loucura, dinheiro e a filosofia mais cínica do Brasil." },

  // ---------------- CIENTISTA ----------------
  { title: "Bom-Crioulo", author: "Adolfo Caminha", profile: "SCIENTIST", stamina: "curto",
    blurb: "Amor proibido e determinismo na Marinha do século XIX. Ousadíssimo pra época." },
  { title: "O Cortiço", author: "Aluísio Azevedo", profile: "SCIENTIST", stamina: "medio",
    blurb: "Um cortiço vira um organismo vivo; o ambiente molda (e destrói) todo mundo. Naturalismo raiz." },
  { title: "Casa de Pensão", author: "Aluísio Azevedo", profile: "SCIENTIST", stamina: "medio",
    blurb: "Um jovem é engolido pela cidade grande e suas armadilhas. Realidade sem filtro." },
  { title: "O Ateneu", author: "Raul Pompeia", profile: "SCIENTIST", stamina: "medio",
    blurb: "O internato como uma selva social: a formação brutal de um garoto." },
  { title: "São Bernardo", author: "Graciliano Ramos", profile: "SCIENTIST", stamina: "medio",
    blurb: "Um homem que trata tudo — até o amor — como negócio. Frio, seco e certeiro." },
  { title: "Quarto de Despejo", author: "Carolina Maria de Jesus", profile: "SCIENTIST", stamina: "medio",
    blurb: "O diário real de uma catadora na favela dos anos 60. Um soco no estômago — verdade nua." },
  { title: "Capão Pecado", author: "Ferréz", profile: "SCIENTIST", stamina: "medio",
    blurb: "A periferia de SP sem filtro. Literatura marginal de verdade, direta e urgente." },
  { title: "O Mulato", author: "Aluísio Azevedo", profile: "SCIENTIST", stamina: "longo",
    blurb: "Racismo e hipocrisia numa cidade pequena. Uma denúncia crua e corajosa." },
  { title: "Angústia", author: "Graciliano Ramos", profile: "SCIENTIST", stamina: "longo",
    blurb: "A mente de um homem apodrecendo por ciúme e frustração social. Sufocante e genial." },
  { title: "Cidade de Deus", author: "Paulo Lins", profile: "SCIENTIST", stamina: "longo",
    blurb: "A favela e o crime como um sistema que se retroalimenta. Cru, real e viciante." },

  // ---------------- FOFOQUEIRO ----------------
  { title: "A Pata da Gazela", author: "José de Alencar", profile: "GOSSIPER", stamina: "curto",
    blurb: "Vaidade, aparências e jogo de sedução na alta roda. Fofoca fina do século XIX." },
  { title: "Memórias de um Sargento de Milícias", author: "Manuel Antônio de Almeida", profile: "GOSSIPER", stamina: "medio",
    blurb: "Malandragem, confusões e a vida social do Rio antigo. Divertidíssimo, cheio de trapalhada." },
  { title: "Diva", author: "José de Alencar", profile: "GOSSIPER", stamina: "medio",
    blurb: "A ascensão social e os caprichos de uma mulher da elite. Puro jogo de aparências." },
  { title: "A Normalista", author: "Adolfo Caminha", profile: "GOSSIPER", stamina: "medio",
    blurb: "Escândalo e hipocrisia numa cidade pequena. O babado que ninguém queria assumir." },
  { title: "A Falência", author: "Júlia Lopes de Almeida", profile: "GOSSIPER", stamina: "longo",
    blurb: "A ruína de uma família rica: dinheiro, aparências e segredos vindo à tona." },
  { title: "Senhora", author: "José de Alencar", profile: "GOSSIPER", stamina: "longo",
    blurb: "Ela compra o próprio noivo pra se vingar. Casamento, dinheiro e orgulho — babado puro." },
  { title: "A Sucessora", author: "Carolina Nabuco", profile: "GOSSIPER", stamina: "longo",
    blurb: "Uma segunda esposa vive à sombra da anterior numa mansão. Ciúme, luxo e sociedade." },
  { title: "Fogo Morto", author: "José Lins do Rego", profile: "GOSSIPER", stamina: "longo",
    blurb: "A decadência dos engenhos e as intrigas da aristocracia rural. Grandioso e cheio de veneno." },
  { title: "A Marquesa de Santos", author: "Paulo Setúbal", profile: "GOSSIPER", stamina: "longo",
    blurb: "Intriga, poder e romance na corte de Dom Pedro I. Fofoca imperial de primeira." },
  { title: "Esaú e Jacó", author: "Machado de Assis", profile: "GOSSIPER", stamina: "longo",
    blurb: "Dois irmãos gêmeos rivais em tudo — até na política e no amor. Vaidade e disputa fina." },
];

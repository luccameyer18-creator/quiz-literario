/* Quiz de Perfil Literário. Base de dados
   Perfis, perguntas e os 50 livros. Variáveis globais (sem módulos) para
   rodar via file:// e na Vercel. */

/* Perfis. As cores têm bom contraste sobre o fundo claro. */
const PROFILES = {
  ROMANTIC: {
    key: "ROMANTIC",
    name: "Romântico",
    color: "#c0392b",
    tagline: "O amor acima de tudo.",
    description:
      "Você lê e vive pra sentir. Acredita que o amor dá conta de qualquer coisa e, na dúvida, escolhe o coração antes da razão.",
    vibe: "É o tipo que torce até o último capítulo pro casal ficar junto.",
    cinema: "Dramas e comédias românticas, do tipo em que o amor vence tudo ou termina numa tragédia bonita.",
    examples: "Diário de uma Paixão, Bridgerton, Titanic, novela das seis.",
  },
  ADVENTURER: {
    key: "ADVENTURER",
    name: "Desbravador",
    color: "#1e7d46",
    tagline: "O mundo é pra ser explorado.",
    description:
      "Você quer conhecer o que ainda não viu: estrada, mata, lugar distante. Preza coragem e liberdade, e ficar parado não é muito o seu forte.",
    vibe: "É quem topa a estrada sem destino e volta com as melhores histórias.",
    cinema: "Aventura e sobrevivência, viagens grandes e cenário de tirar o fôlego.",
    examples: "Indiana Jones, O Regresso, Vikings, Senhor dos Anéis.",
  },
  OBSERVER: {
    key: "OBSERVER",
    name: "Observador",
    color: "#a05a00",
    tagline: "Um olhar de canto pra tudo.",
    description:
      "Você repara em tudo e desconfia de quase tudo, sempre com um humor meio irônico. Curte gente complicada e final que deixa dúvida no ar.",
    vibe: "É quem fica de canto na festa e entende a sala inteira só de olhar.",
    cinema: "Histórias com ironia, personagem ambíguo e uma crítica boa por baixo.",
    examples: "Succession, Fleabag, Big Little Lies.",
  },
  SCIENTIST: {
    key: "SCIENTIST",
    name: "Cientista",
    color: "#1565a6",
    tagline: "Quero entender como tudo funciona.",
    description:
      "Você olha a vida quase como quem estuda: quer saber por que as pessoas agem como agem e não desvia das verdades difíceis.",
    vibe: "É quem pergunta 'mas por que as pessoas são assim?' e quer a resposta de verdade.",
    cinema: "História social crua, retrato sem enfeite de ambientes reais.",
    examples: "Cidade de Deus, The Wire, Breaking Bad.",
  },
  GOSSIPER: {
    key: "GOSSIPER",
    name: "Fofoqueiro",
    color: "#8e44ad",
    tagline: "O babado corre por dentro.",
    description:
      "Você curte os bastidores: quem está com quem, aparência, status e disputa de poder. A maldade dos outros mais diverte do que assusta.",
    vibe: "É quem em dez minutos de festa já sabe quem está com quem.",
    cinema: "Intriga da alta sociedade, jogo de poder e uma vingançazinha aqui e ali.",
    examples: "Gossip Girl, The Crown, Bridgerton.",
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

/* Os 50 livros.
   stamina: curto (até ~150 pág), medio (~150 a 250), longo (250+). */
const BOOKS = [
  // Romântico
  { title: "Iracema", author: "José de Alencar", profile: "ROMANTIC", stamina: "curto",
    blurb: "A índia Iracema se apaixona por um português e larga tudo por ele. Não acaba bem, mas é bonito de ler." },
  { title: "Cinco Minutos", author: "José de Alencar", profile: "ROMANTIC", stamina: "curto",
    blurb: "Um rapaz vê uma moça por cinco minutos e não consegue mais tirar ela da cabeça. Curto e apaixonado." },
  { title: "Noite na Taverna", author: "Álvares de Azevedo", profile: "ROMANTIC", stamina: "curto",
    blurb: "Cinco amigos numa taverna contam histórias de amor e morte. Tem um clima sombrio no meio do romance." },
  { title: "A Moreninha", author: "Joaquim Manuel de Macedo", profile: "ROMANTIC", stamina: "medio",
    blurb: "Uns jovens passam um fim de semana numa ilha e rola uma aposta sobre quem se apaixona primeiro." },
  { title: "A Escrava Isaura", author: "Bernardo Guimarães", profile: "ROMANTIC", stamina: "medio",
    blurb: "Isaura foi criada quase como filha da casa, mas segue escravizada e luta pela liberdade e por um amor. Virou novela." },
  { title: "Lucíola", author: "José de Alencar", profile: "ROMANTIC", stamina: "medio",
    blurb: "Um rapaz se apaixona por uma mulher que a sociedade julga o tempo todo. Um amor que enfrenta muito preconceito." },
  { title: "Helena", author: "Machado de Assis", profile: "ROMANTIC", stamina: "medio",
    blurb: "Uma moça entra numa família rica e um amor difícil aparece no meio de um segredo. Machado no lado mais sentimental." },
  { title: "Amar, Verbo Intransitivo", author: "Mário de Andrade", profile: "ROMANTIC", stamina: "medio",
    blurb: "Uma família contrata uma professora pra 'ensinar o amor' ao filho adolescente. Fala de desejo e das regras hipócritas da época." },
  { title: "Til", author: "José de Alencar", profile: "ROMANTIC", stamina: "longo",
    blurb: "Paixão, ciúme e reviravolta na vida do interior. Tem cara de novela mesmo." },
  { title: "O Guarani", author: "José de Alencar", profile: "ROMANTIC", stamina: "longo",
    blurb: "O índio Peri faz de tudo pra proteger e conquistar Ceci. Aventura e romance no meio da floresta." },

  // Desbravador
  { title: "Vidas Secas", author: "Graciliano Ramos", profile: "ADVENTURER", stamina: "curto",
    blurb: "Uma família foge da seca quase sem nada e tenta sobreviver no sertão. Curto e muito forte." },
  { title: "Contos Gauchescos", author: "Simões Lopes Neto", profile: "ADVENTURER", stamina: "curto",
    blurb: "Histórias de peões e brigas nos pampas, contadas do jeito gaúcho. Boas pra ler aos poucos." },
  { title: "O Quinze", author: "Rachel de Queiroz", profile: "ADVENTURER", stamina: "medio",
    blurb: "A seca de 1915 obriga uma família a largar tudo e migrar. Fala de coragem e de perder pelo caminho." },
  { title: "Inocência", author: "Visconde de Taunay", profile: "ADVENTURER", stamina: "medio",
    blurb: "No sertão isolado, um amor proibido corre perigo de verdade. Aventura com romance." },
  { title: "Contos Amazônicos", author: "Inglês de Sousa", profile: "ADVENTURER", stamina: "medio",
    blurb: "Histórias meio assustadoras no meio da floresta, cheias de lenda de rio." },
  { title: "Sagarana", author: "Guimarães Rosa", profile: "ADVENTURER", stamina: "longo",
    blurb: "Contos do sertão com briga, viagem e causo. É um bom jeito de começar a ler Guimarães Rosa." },
  { title: "Os Sertões", author: "Euclides da Cunha", profile: "ADVENTURER", stamina: "longo",
    blurb: "O relato da Guerra de Canudos e da vida dura no sertão. Denso, mas impressiona." },
  { title: "O Sertanejo", author: "José de Alencar", profile: "ADVENTURER", stamina: "longo",
    blurb: "Um herói do sertão, muita coragem e cavalgada. Quase um faroeste brasileiro." },
  { title: "Grande Sertão: Veredas", author: "Guimarães Rosa", profile: "ADVENTURER", stamina: "longo",
    blurb: "Um antigo jagunço conta sua vida, seus amores e um pacto com o diabo. É difícil, mas é considerado o maior livro brasileiro." },
  { title: "Maíra", author: "Darcy Ribeiro", profile: "ADVENTURER", stamina: "longo",
    blurb: "Um índio criado longe da aldeia volta e vive o choque entre dois mundos. Te joga dentro da floresta." },

  // Observador
  { title: "O Alienista", author: "Machado de Assis", profile: "OBSERVER", stamina: "curto",
    blurb: "Um médico começa a internar meia cidade dizendo que são loucos. Uma crítica esperta e curta." },
  { title: "A Cartomante e outros contos", author: "Machado de Assis", profile: "OBSERVER", stamina: "curto",
    blurb: "Contos com traição, destino e finais que pegam de surpresa. Machado em doses pequenas." },
  { title: "A Hora da Estrela", author: "Clarice Lispector", profile: "OBSERVER", stamina: "curto",
    blurb: "A história de Macabéa, uma moça pobre que quase ninguém repara, contada por um narrador estranho. Curto e marcante." },
  { title: "Dom Casmurro", author: "Machado de Assis", profile: "OBSERVER", stamina: "medio",
    blurb: "Bentinho jura que Capitu o traiu, mas quem conta a história é ele. Você decide em quem acreditar." },
  { title: "Memórias Póstumas de Brás Cubas", author: "Machado de Assis", profile: "OBSERVER", stamina: "medio",
    blurb: "Um homem já morto resolve contar a própria vida, com muita ironia. Estranho e brilhante ao mesmo tempo." },
  { title: "Memorial de Aires", author: "Machado de Assis", profile: "OBSERVER", stamina: "medio",
    blurb: "Um senhor mais velho observa de longe a vida de um jovem casal. Calmo e cheio de detalhe." },
  { title: "Papéis Avulsos", author: "Machado de Assis", profile: "OBSERVER", stamina: "medio",
    blurb: "Coletânea com alguns dos melhores contos do Machado, incluindo 'O Alienista'." },
  { title: "Laços de Família", author: "Clarice Lispector", profile: "OBSERVER", stamina: "medio",
    blurb: "Contos sobre momentos comuns que de repente viram outra coisa. Clarice reparando no que passa batido." },
  { title: "Iaiá Garcia", author: "Machado de Assis", profile: "OBSERVER", stamina: "medio",
    blurb: "Amor, interesse e orgulho se misturam numa história de época. Machado começando a afiar a ironia." },
  { title: "Quincas Borba", author: "Machado de Assis", profile: "OBSERVER", stamina: "longo",
    blurb: "Um homem simples herda uma fortuna e vai sendo enganado por todo mundo. O lado mais cínico do Machado." },

  // Cientista
  { title: "Bom-Crioulo", author: "Adolfo Caminha", profile: "SCIENTIST", stamina: "curto",
    blurb: "Um marinheiro se apaixona por um grumete no Brasil do século XIX. Foi ousado demais pra época." },
  { title: "O Cortiço", author: "Aluísio Azevedo", profile: "SCIENTIST", stamina: "medio",
    blurb: "A vida de um cortiço inteiro, com todo mundo se misturando e afundando junto. O clássico do naturalismo." },
  { title: "Casa de Pensão", author: "Aluísio Azevedo", profile: "SCIENTIST", stamina: "medio",
    blurb: "Um jovem vai pra capital cheio de sonho e a cidade grande vai acabando com ele." },
  { title: "O Ateneu", author: "Raul Pompeia", profile: "SCIENTIST", stamina: "medio",
    blurb: "A rotina dura de um internato pelos olhos de um garoto. Mostra como o ambiente molda a pessoa." },
  { title: "São Bernardo", author: "Graciliano Ramos", profile: "SCIENTIST", stamina: "medio",
    blurb: "Um fazendeiro trata tudo como negócio, até o casamento, e vê a vida desmoronar. Seco e direto." },
  { title: "Quarto de Despejo", author: "Carolina Maria de Jesus", profile: "SCIENTIST", stamina: "medio",
    blurb: "O diário de verdade de uma mulher que catava lixo pra sobreviver na favela dos anos 60. Difícil ficar indiferente." },
  { title: "Capão Pecado", author: "Ferréz", profile: "SCIENTIST", stamina: "medio",
    blurb: "A periferia de São Paulo contada de dentro, sem enfeite. Literatura marginal de verdade." },
  { title: "O Mulato", author: "Aluísio Azevedo", profile: "SCIENTIST", stamina: "longo",
    blurb: "Um homem volta pra cidade natal e esbarra no racismo e na hipocrisia de todo mundo. Corajoso pra época." },
  { title: "Angústia", author: "Graciliano Ramos", profile: "SCIENTIST", stamina: "longo",
    blurb: "A cabeça de um homem sendo tomada pelo ciúme e pela frustração. Um livro sufocante, no bom sentido." },
  { title: "Cidade de Deus", author: "Paulo Lins", profile: "SCIENTIST", stamina: "longo",
    blurb: "A favela e o crescimento do crime ao longo de anos, com dezenas de personagens. Cru e viciante." },

  // Fofoqueiro
  { title: "A Pata da Gazela", author: "José de Alencar", profile: "GOSSIPER", stamina: "curto",
    blurb: "Vaidade e jogo de conquista na alta sociedade. Uma fofoca fina de época." },
  { title: "Memórias de um Sargento de Milícias", author: "Manuel Antônio de Almeida", profile: "GOSSIPER", stamina: "medio",
    blurb: "As trapalhadas de um malandro na vida social do Rio antigo. Divertido do começo ao fim." },
  { title: "Diva", author: "José de Alencar", profile: "GOSSIPER", stamina: "medio",
    blurb: "A vida e os caprichos de uma mulher rica que sobe na sociedade. Muito jogo de aparência." },
  { title: "A Normalista", author: "Adolfo Caminha", profile: "GOSSIPER", stamina: "medio",
    blurb: "Um escândalo numa cidade pequena e toda a hipocrisia em volta. O tipo de história que vira fofoca." },
  { title: "A Falência", author: "Júlia Lopes de Almeida", profile: "GOSSIPER", stamina: "longo",
    blurb: "Uma família rica começa a afundar e os segredos vão aparecendo. Dinheiro, aparência e disfarce." },
  { title: "Senhora", author: "José de Alencar", profile: "GOSSIPER", stamina: "longo",
    blurb: "Uma mulher usa a própria fortuna pra comprar o noivo que a humilhou e se vingar. Casamento tratado como negócio." },
  { title: "A Sucessora", author: "Carolina Nabuco", profile: "GOSSIPER", stamina: "longo",
    blurb: "Uma segunda esposa vive na sombra da primeira dentro de uma mansão cheia de ciúme. Inspirou 'Rebecca'." },
  { title: "Fogo Morto", author: "José Lins do Rego", profile: "GOSSIPER", stamina: "longo",
    blurb: "A queda dos velhos engenhos e as intrigas das famílias importantes. Muita gente falando pelas costas." },
  { title: "A Marquesa de Santos", author: "Paulo Setúbal", profile: "GOSSIPER", stamina: "longo",
    blurb: "Poder, romance e fofoca na corte de Dom Pedro I. A intriga chegando dentro do palácio." },
  { title: "Esaú e Jacó", author: "Machado de Assis", profile: "GOSSIPER", stamina: "longo",
    blurb: "Dois irmãos gêmeos que discordam de tudo, até de política e de amor. Vaidade e disputa sem parar." },
];

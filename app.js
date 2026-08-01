"use strict";

const els = {
  form: document.getElementById("form"),
  tema: document.getElementById("tema"),
  tom: document.getElementById("tom"),
  duracao: document.getElementById("duracao"),
  gerar: document.getElementById("gerar"),
  status: document.getElementById("status"),
  resultado: document.getElementById("resultado"),
  apikey: document.getElementById("apikey"),
  copiarTudo: document.getElementById("copiarTudo"),
  novo: document.getElementById("novo"),
};

const TEMPLATES = {
  educativo: {
    titulos: [
      "Tudo que você erra em {T}",
      "O jeito certo de {t} (quase ninguém faz)",
      "{T}: o guia de 30 segundos",
      "Como fazer {t} sem complicar",
    ],
    ganchos: [
      "Para tudo. Você está fazendo {t} errado.",
      "Se tem {t} na sua rotina, assiste até o fim.",
      "Três coisas sobre {t} que mudam o resultado.",
    ],
    linhas: [
      "A maioria erra em {t} porque pula o básico.",
      "O primeiro passo é simples: comece pequeno com {t}.",
      "Anota aí: consistência em {t} vale mais que intensidade.",
      "Se fizer {t} todo dia, o resultado aparece em semanas.",
      "Esquece o complicado. {t} funciona melhor direto.",
    ],
    cta: [
      "Segue para mais dicas práticas assim.",
      "Comenta o que você quer ver na próxima.",
    ],
  },
  engracado: {
    titulos: [
      "POV: você tentando {t}",
      "Eu tentei {t} por uma semana",
      "A verdade dolorosa sobre {t}",
      "Por que {t} é mais difícil do que parece",
    ],
    ganchos: [
      "POV: você tentando {t}.",
      "A realidade de quem tenta {t}.",
      "Eu tentei {t} e deu nós.",
    ],
    linhas: [
      "Sinceramente, {t} virou um meme na minha cabeça.",
      "Eu jurava que sabia fazer {t}. Era mentira.",
      "Toda vez que tento {t}, acontece o caos.",
      "Se {t} fosse fácil, não teria vídeo sobre isso.",
      "Spoiler: {t} é mais difícil do que aparece.",
    ],
    cta: [
      "Segue para rir junto nos próximos.",
      "Manda nos comentários sua saga com {t}.",
    ],
  },
  provocativo: {
    titulos: [
      "Pare de {t} agora (sério)",
      "{T} é superestimado — e eu explico",
      "Ninguém conta isso sobre {t}",
      "O que ninguém te fala sobre {t}",
    ],
    ganchos: [
      "Pare de fazer {t} agora.",
      "Ninguém devia saber disso de {t}.",
      "{T} é uma mentira. Explico.",
    ],
    linhas: [
      "Vou falar o que ninguém tem coragem: {t} é superestimado.",
      "Você está perdendo tempo com {t} do jeito errado.",
      "Para de ouvir quem diz que {t} é complicado.",
      "A verdade sobre {t} ninguém conta para você.",
      "Se todo mundo faz {t} assim, faça o oposto.",
    ],
    cta: [
      "Segue se você curte a real sem filtro.",
      "Responde: concorda ou discordo sobre {t}?",
    ],
  },
  inspirador: {
    titulos: [
      "Como {t} mudou minha rotina",
      "Se você quer {t}, assiste isso",
      "A verdade sobre {t} que ninguém conta",
      "Comece {t} hoje (mesmo sem saber como)",
    ],
    ganchos: [
      "Se você quer {t}, para tudo e ouve.",
      "Isso vai te motivar a começar {t}.",
      "A verdade sobre {t} que ninguém te conta.",
    ],
    linhas: [
      "Se eu consegui começar {t}, você também consegue.",
      "O segredo de {t} não é talento, é começar.",
      "Cada dia de {t} te deixa mais perto de onde quer estar.",
      "Não espere o momento certo para {t}. Ele não existe.",
      "Quem faz {t} de verdade não reclama, só faz.",
    ],
    cta: [
      "Segue para construir isso junto.",
      "Comenta o primeiro passo que você vai dar em {t}.",
    ],
  },
};

const GENERIC_HASHTAGS = ["#shorts", "#reels", "#tiktok", "#dica", "#viral", "#brasil"];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function topicSlug(text) {
  const cleaned = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 18);
  return cleaned || "dica";
}

function linesForDuration(d) {
  if (d <= 15) return 3;
  if (d <= 30) return 5;
  return 7;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildLocal(tema, tom, duracao) {
  const tpl = TEMPLATES[tom] || TEMPLATES.educativo;
  const t = tema.trim();
  const T = capitalize(t);

  const titulo = pick(tpl.titulos).replace(/\{T\}/g, T).replace(/\{t\}/g, t);
  const gancho = pick(tpl.ganchos).replace(/\{T\}/g, T).replace(/\{t\}/g, t);

  const qtd = linesForDuration(duracao);
  const linhas = shuffle(tpl.linhas)
    .slice(0, qtd)
    .map((l) => l.replace(/\{T\}/g, T).replace(/\{t\}/g, t));

  const cta = pick(tpl.cta).replace(/\{T\}/g, T).replace(/\{t\}/g, t);

  const tela = [
    gancho.length > 42 ? gancho.slice(0, 39) + "…" : gancho,
    capitalize(linhas[0] || t),
    "ANOTA ✍️",
    cta.replace(/Segue.*/i, "Segue +").trim(),
  ];

  const legenda =
    `Salva esse roteiro para quando for gravar sobre ${t}. ` +
    `Funciona para Reels, TikTok e Shorts. 🔖`;

  const slug = topicSlug(t);
  const hashtags = [`#${slug}`, ...GENERIC_HASHTAGS];

  return {
    titulo,
    gancho,
    roteiro: linhas,
    tela,
    legenda,
    hashtags,
    cta,
  };
}

async function buildWithAI(tema, tom, duracao, key) {
  const qtd = linesForDuration(duracao);
  const system =
    "Você é um roteirista de vídeos curtos (Reels, TikTok, YouTube Shorts) em português do Brasil. " +
    "Crie conteúdo original, natural e específico para o tema e o tom. Evite frases vazias e clichês. " +
    "Responda somente um objeto JSON com estas chaves: titulo, gancho, roteiro (array de strings), " +
    "tela (array de frases curtas para texto na tela), legenda, hashtags (array), cta.";

  const user =
    `Tema: ${tema}\nTom: ${tom}\nDuração: ${duracao} segundos\n` +
    `Gere cerca de ${qtd} linhas de roteiro falado. As hashtags devem incluir uma com o tema.`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + key,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      temperature: 0.9,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!res.ok) throw new Error("API " + res.status);

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content || "";
  const parsed = JSON.parse(content);

  return {
    titulo: String(parsed.titulo || ""),
    gancho: String(parsed.gancho || ""),
    roteiro: Array.isArray(parsed.roteiro) ? parsed.roteiro.map(String) : [],
    tela: Array.isArray(parsed.tela) ? parsed.tela.map(String) : [],
    legenda: String(parsed.legenda || ""),
    hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags.map(String) : [],
    cta: String(parsed.cta || ""),
  };
}

function render(r) {
  document.getElementById("titulo").textContent = r.titulo;
  document.getElementById("gancho").textContent = r.gancho;

  const roteiro = document.getElementById("roteiro");
  roteiro.innerHTML = "";
  r.roteiro.forEach((linha) => {
    const li = document.createElement("li");
    li.textContent = linha;
    roteiro.appendChild(li);
  });

  const tela = document.getElementById("tela");
  tela.innerHTML = "";
  r.tela.forEach((frase) => {
    const li = document.createElement("li");
    li.textContent = frase;
    tela.appendChild(li);
  });

  document.getElementById("legenda").textContent = r.legenda;
  document.getElementById("hashtags").textContent = r.hashtags.join(" ");
  document.getElementById("cta").textContent = r.cta;

  els.resultado.hidden = false;
  els.resultado.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function gerar(e) {
  e.preventDefault();
  const tema = els.tema.value.trim();
  if (!tema) return;

  const tom = els.tom.value;
  const duracao = parseInt(els.duracao.value, 10);
  const key = (els.apikey.value || "").trim();

  els.gerar.disabled = true;
  els.status.textContent = key ? "Gerando com IA…" : "Gerando…";

  let resultado;
  try {
    if (key) {
      try {
        resultado = await buildWithAI(tema, tom, duracao, key);
        if (!resultado.titulo || resultado.roteiro.length === 0) throw new Error("vazio");
        els.status.textContent = "Pronto — resposta com IA.";
      } catch (err) {
        resultado = buildLocal(tema, tom, duracao);
        els.status.textContent = "IA indisponível agora. Usando gerador local.";
      }
    } else {
      resultado = buildLocal(tema, tom, duracao);
      els.status.textContent = "Pronto — modo local (sem chave).";
    }
  } finally {
    els.gerar.disabled = false;
  }

  render(resultado);
}

function textOf(target) {
  const el = document.getElementById(target);
  if (target === "roteiro") {
    return Array.from(el.querySelectorAll("li"))
      .map((li, i) => `${i + 1}. ${li.textContent}`)
      .join("\n");
  }
  if (target === "tela") {
    return Array.from(el.querySelectorAll("li"))
      .map((li) => "• " + li.textContent)
      .join("\n");
  }
  return el.textContent;
}

async function copiar(texto, botao) {
  try {
    await navigator.clipboard.writeText(texto);
    const original = botao.textContent;
    botao.textContent = "copiado";
    setTimeout(() => (botao.textContent = original), 1200);
  } catch (_) {
    botao.textContent = "erro";
  }
}

document.querySelectorAll(".copy").forEach((btn) => {
  btn.addEventListener("click", () => copiar(textOf(btn.dataset.target), btn));
});

els.copiarTudo.addEventListener("click", () => {
  const partes = [
    "TÍTULO\n" + textOf("titulo"),
    "GANCHO\n" + textOf("gancho"),
    "ROTEIRO\n" + textOf("roteiro"),
    "TEXTO NA TELA\n" + textOf("tela"),
    "LEGENDA\n" + textOf("legenda"),
    "HASHTAGS\n" + textOf("hashtags"),
    "CTA\n" + textOf("cta"),
  ];
  copiar(partes.join("\n\n"), els.copiarTudo);
});

els.novo.addEventListener("click", () => {
  els.resultado.hidden = true;
  els.tema.focus();
});

els.form.addEventListener("submit", gerar);

if (localStorage.getItem("ideiatube_key")) {
  els.apikey.value = localStorage.getItem("ideiatube_key");
}
els.apikey.addEventListener("change", () => {
  localStorage.setItem("ideiatube_key", els.apikey.value.trim());
});

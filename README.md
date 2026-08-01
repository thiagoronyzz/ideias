# IdeiaTube

Gerador de roteiro para Reels, TikTok e YouTube Shorts. Informe o tema, o tom e a duração e receba título, gancho, roteiro falado, texto para a tela, legenda, hashtags e chamada final.

Custo zero: o gerador local funciona sem chave, sem servidor e sem cadastro. A opção de IA usa o plano gratuito da Groq (sem cartão de crédito).

## Como usar no computador

Abra o arquivo `index.html` em qualquer navegador. Digite o tema e clique em **Gerar roteiro**.

## Como publicar de graça

O site é só HTML, CSS e JS. Qualquer hospedagem estática serve:

- **GitHub Pages**: suba a pasta `site/` para um repositório e ative Pages em *Settings > Pages*.
- **Vercel / Netlify**: arraste a pasta `site/` na tela de deploy. Plano free cobre isso.

## Melhorar as respostas com IA (opcional)

1. Crie uma conta gratuita em console.groq.com.
2. Gere uma chave (modelo `llama-3.1-8b-instant`, plano free).
3. Cole a chave em *Melhorar as respostas com IA* no site. Ela fica salva apenas no navegador.

Sem a chave, o site continua gerando com o motor local.

## Como ganhar dinheiro

- **Afiliados**: coloque links de indicação (Amazon, bancos, cursos) no rodapé ou em uma página "indicações".
- **Anúncios**: ative o AdSense quando o tráfego crescer.
- **Lista de email**: peça o contato em troca de um "pack de 100 roteiros".
- **PIX/doação**: botão de apoio para quem usa muito.

## Estrutura

- `index.html` — página e formulário
- `styles.css` — visual limpo, sem gradientes ou excessos
- `app.js` — gerador local + integração opcional com Groq

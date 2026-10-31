# quran.ai

[![Website](https://img.shields.io/badge/website-quran.ai-blue)](https://quran.ai)

An interactive Quran reader and study tool that brings grounded, in-depth Quranic study directly into ChatGPT and Claude. Ask about a word, phrase, or passage and get answers backed by verified tafsir, translations, and linguistic evidence with citations linking back to the mushaf. 

## Live Site

- **Production:** [https://quran.ai](https://quran.ai)

## Features

- **Read** - Open the Quran reader at a surah, page, or ayah directly from your AI assistant.
- **Select** - Highlight a word, phrase, ayah, or passage to ask about something specific.
- **Ask** - Add selected passages to your prompt or use Embedded Ask to get grounded explanations, comparisons, or source references.
- **Discover** - Follow cited ayahs back into the mushaf to continue your study and uncover new connections.
- **Grounded Sources** - Answers are backed by 20 tafsir editions (including al-Tabari, Ibn Kathir, al-Zamakhshari, and Ibn Ashur), 31 translations across 12 languages, word-by-word meanings, and Arabic grammatical analysis from [Quran.com](https://quran.com) and [Quran Foundation](https://quran.foundation).
- **Scholar-First Approach** - Citations are required, scholarly differences are preserved, and distinctions are made between retrieved commentary and AI synthesis.
- **Responsive Design** - Fully optimized for desktop and mobile viewing.
- **Theme Support** - Automatic light (sepia) and dark (navy) themes based on system preferences.

## Integrations

| Platform | Link |
| --- | --- |
| ChatGPT | [Add to ChatGPT](https://chatgpt.com/plugins/plugin_asdk_app_69aca72176f4819197186bc55da38fe0) |
| Claude | [Add to Claude](https://claude.ai/customize/connectors/id/93841aad-73da-4cf4-8b25-80bac4f02f42) |
| Documentation | [MCP Documentation](https://mcp.quran.ai/documentation) |

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, modern layouts, responsive design, and theme switching
- **Vanilla JavaScript** - Theme detection, responsive layout calculations, and dynamic photo masking
- **Self-hosted Fonts** - [Figtree](https://github.com/erikdkennedy/figtree) and [EB Garamond](https://github.com/octaviopardo/EBGaramond12)
- **Static Hosting** - GitHub Pages compatible

## Project Structure

```
quran.ai/
├── assets/              # UI icons and assets
├── branding/            # Brand assets, fonts, and marketing imagery
│   ├── fonts/           # Self-hosted variable fonts (Figtree, EB Garamond)
│   └── ...              # Logos, screenshots, and graphics
├── index.html           # Main landing page
├── styles.css           # Styles, themes, and responsive design
├── script.js            # Interactive behaviors and layout logic
├── CNAME                # Custom domain configuration (quran.ai)
├── .nojekyll            # Disables Jekyll processing on GitHub Pages
└── README.md            # Project documentation
```

## Getting Started

This is a static site with no build step or dependencies required. 

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/[your-username]/quran.ai.git
   cd quran.ai
   ```

2. Start a local server. Any static file server will work:
   ```bash
   # Python
   python -m http.server 8000

   # Node.js
   npx serve .

   # PHP
   php -S localhost:8000
   ```

3. Open [http://localhost:8000](http://localhost:8000) in your browser.

### Notes

- Themes are applied automatically based on the user's `prefers-color-scheme` setting.
- Responsive breakpoints are set at `620px` and `410px`.
- Fonts are self-hosted for optimal performance and privacy.
- Images use lazy loading where appropriate.

## Deployment

This site is configured for deployment to GitHub Pages with a custom domain. The `CNAME` and `.nojekyll` files are already included for this setup.

## License

- **Fonts**: See the individual `OFL.txt` files located in `branding/fonts/*/` for font licensing terms.
- **Other Assets**: Brand assets and images are subject to their respective licenses.

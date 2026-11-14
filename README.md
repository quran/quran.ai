<!--
*** Thanks for checking out this quran.ai repo. If you have a suggestion that would
*** make this better, please fork the repo and create a pull request or simply open
*** an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://quran.ai">
    <img src="https://quran.ai/branding/symbol-navy.svg" alt="quran.ai Logo" width="80" height="80">
  </a>

  <h1 align="center">quran.ai</h1>

  <p align="center">
    Grounded, in-depth Quran study in ChatGPT and Claude
    <br />
    <a href="https://mcp.quran.ai/documentation"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://quran.ai">Visit Website</a>
    ·
    <a href="https://chatgpt.com/plugins/plugin_asdk_app_69aca72176f4819197186bc55da38fe0">Add to ChatGPT</a>
    ·
    <a href="https://claude.ai/customize/connectors/id/93841aad-73da-4cf4-8b25-80bac4f02f42">Add to Claude</a>
  </p>
</p>

<!-- PROJECT SHIELDS -->

[![Website](https://img.shields.io/badge/website-quran.ai-00163d?style=for-the-badge)](https://quran.ai)
[![ChatGPT](https://img.shields.io/badge/ChatGPT-Plugin-10a37f?style=for-the-badge&logo=openai&logoColor=white)](https://chatgpt.com/plugins/plugin_asdk_app_69aca72176f4819197186bc55da38fe0)
[![Claude](https://img.shields.io/badge/Claude-Connector-cc785c?style=for-the-badge&logo=anthropic&logoColor=white)](https://claude.ai/customize/connectors/id/93841aad-73da-4cf4-8b25-80bac4f02f42)
[![MCP Docs](https://img.shields.io/badge/MCP-Documentation-4a453d?style=for-the-badge)](https://mcp.quran.ai/documentation)

## About The Project

quran.ai brings an interactive Quran reader and study tools directly into ChatGPT and Claude. Read, select, and ask about any word or passage to get grounded explanations backed by verified tafsir, translations, and Arabic linguistic evidence—with citations that link right back into the mushaf.

### Key Features

- **Read** - Open the Quran reader at a surah, page, or ayah directly from your AI assistant.
- **Select** - Highlight a word, phrase, ayah, or passage to ask about something specific.
- **Ask** - Add selected passages to your prompt or use Embedded Ask for grounded explanations, comparisons, or source references.
- **Discover** - Follow cited ayahs back into the mushaf to continue your study and uncover new connections.
- **Grounded in Authentic Sources** - Answers draw from **20 tafsir editions** (including al-Tabari, Ibn Kathir, al-Zamakhshari, and Ibn Ashur), **31 translations across 12 languages**, word-by-word meanings, and detailed Arabic grammatical analysis from [Quran.com](https://quran.com) and [Quran Foundation](https://quran.foundation).
- **Scholar-First Approach** - Citations are required, scholarly differences are preserved, and the AI clearly distinguishes retrieved commentary from its own synthesis.
- **Responsive Design** - Optimized for desktop and mobile with automatic light (sepia) and dark (navy) theme support based on system preferences.

## Getting Started

This is a static site with no build step or dependencies required.

### Prerequisites

All you need is a local web server to serve the files.

### Running Locally

1. Clone the repo
   ```sh
   git clone https://github.com/taslimul6/quran.ai.git
   cd quran.ai
   ```

2. Start a local server (pick one of the following):
   ```sh
   # Python 3
   python -m http.server 8000

   # Node.js
   npx serve .

   # PHP
   php -S localhost:8000
   ```

3. Open [http://localhost:8000](http://localhost:8000) in your browser

## How to Contribute

We trust that you will not copy this idea/project, this is at the end for the sake of Allah and we all have good intentions while working with this project. But we must stress that copying the code/project is unacceptable.

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

It would be an honor to contribute to projects that make Quranic study more accessible and grounded in authentic sources. May Allah ﷻ accept our efforts.

## Built With

- [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML) - Semantic markup
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) - Custom properties, modern layouts, responsive design, and theme switching
- [Vanilla JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Theme detection, responsive layout calculations, and dynamic photo masking
- [Figtree](https://github.com/erikdkennedy/figtree) - UI font
- [EB Garamond](https://github.com/octaviopardo/EBGaramond12) - Display font

## Project Structure

```text
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

## License

- **Fonts**: See the individual `OFL.txt` files located in `branding/fonts/*/` for font licensing terms.
- **Other Assets**: Brand assets and images are subject to their respective licenses.

## Acknowledgments

- [Quran.com](https://quran.com) and [Quran Foundation](https://quran.foundation) for providing the canonical Quran text, translations, and tafsir sources
- All of the scholars whose works are made accessible through this project
- The open source community working to make Quranic knowledge accessible to all

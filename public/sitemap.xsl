<?xml version="1.0" encoding="UTF-8"?>
<!-- Opmaak van sitemap.xml in de browser. Zoekmachines negeren dit en lezen de XML. -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="nl">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>XML-sitemap – Monte Amigo</title>
        <style>
          :root { --ink:#1e2a33; --muted:#6b7a86; --line:#e3e8ec; --accent:#1ba1e2; --bg:#f5f7f9; }
          * { box-sizing:border-box; }
          body { margin:0; background:var(--bg); color:var(--ink); font:15px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif; }
          header { background:#23303a; color:#fff; padding:28px 16px; }
          header .inner, main { max-width:1000px; margin:0 auto; }
          h1 { margin:0 0 6px; font-size:22px; letter-spacing:.02em; }
          header p { margin:0; color:#c9d3da; }
          header a { color:#fff; }
          main { padding:24px 16px 48px; }
          .card { background:#fff; border:1px solid var(--line); border-radius:14px; overflow:hidden; }
          table { width:100%; border-collapse:collapse; }
          th, td { text-align:left; padding:12px 16px; border-bottom:1px solid var(--line); vertical-align:top; }
          th { font-size:12px; text-transform:uppercase; letter-spacing:.08em; color:var(--muted); background:#fafbfc; }
          tr:last-child td { border-bottom:0; }
          td a { color:var(--accent); text-decoration:none; font-weight:600; word-break:break-all; }
          td a:hover { text-decoration:underline; }
          .num { white-space:nowrap; color:var(--muted); }
          .prio { display:inline-block; min-width:40px; text-align:center; padding:2px 8px; border-radius:999px; background:#e8f5fc; color:#0d6c9b; font-weight:600; font-size:13px; }
          .thumbs { display:flex; flex-wrap:wrap; gap:4px; margin-top:8px; }
          .thumbs img { width:44px; height:33px; object-fit:cover; border-radius:4px; border:1px solid var(--line); }
          footer { margin-top:16px; color:var(--muted); font-size:13px; }
          @media (max-width:640px) { .hide-sm { display:none; } th, td { padding:10px 12px; } }
        </style>
      </head>
      <body>
        <header>
          <div class="inner">
            <h1>XML-sitemap – Monte Amigo</h1>
            <p>
              <xsl:value-of select="count(s:urlset/s:url)"/> pagina's en
              <xsl:value-of select="count(s:urlset/s:url/image:image)"/> afbeeldingen voor zoekmachines.
              Dit is de opgemaakte weergave; zoekmachines lezen de XML.
            </p>
          </div>
        </header>
        <main>
          <div class="card">
            <table>
              <thead>
                <tr>
                  <th>Pagina</th>
                  <th class="hide-sm">Prioriteit</th>
                  <th class="hide-sm">Wijzigt</th>
                  <th>Laatst bijgewerkt</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="s:urlset/s:url">
                  <tr>
                    <td>
                      <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                      <xsl:if test="image:image">
                        <div class="thumbs">
                          <xsl:for-each select="image:image">
                            <img src="{image:loc}" alt="" loading="lazy"/>
                          </xsl:for-each>
                        </div>
                      </xsl:if>
                    </td>
                    <td class="hide-sm"><span class="prio"><xsl:value-of select="s:priority"/></span></td>
                    <td class="hide-sm num"><xsl:value-of select="s:changefreq"/></td>
                    <td class="num"><xsl:value-of select="s:lastmod"/></td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
          <footer>Zie ook <a href="/robots.txt">robots.txt</a>.</footer>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
	xmlns:html="http://www.w3.org/TR/REC-html40"
	xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
	xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<title>XML Sitemap - BIDARN IPTV</title>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<style type="text/css">
					body {
						font-size: 14px;
						font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
						margin: 0;
						color: #1f2937;
						background-color: #f9fafb;
					}
					a {
						color: #7c3aed;
						text-decoration: none;
						font-weight: 500;
					}
					a:hover {
						text-decoration: underline;
					}
					h1 {
						font-size: 24px;
						font-weight: 700;
						margin: 0;
					}

					#description {
						background: linear-gradient(135deg, #7c3aed, #a855f7);
						padding: 40px;
						color: #fff;
					}
					#description h1,
					#description p,
					#description a {
						color: #fff;
						margin: 0;
					}
					#description h1 {
						font-size: 2.2em;
						margin-bottom: 10px;
					}
					#description p {
						margin-top: 5px;
						font-size: 1.1em;
						opacity: 0.9;
					}
					#description a {
						border-bottom: 1px dotted #fff;
						font-weight: bold;
					}

					#content {
						padding: 40px;
						background: #fff;
						max-width: 900px;
						margin: -20px auto 40px;
						border-radius: 12px;
						box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
					}
					.info-text {
						font-size: 1.1em;
						color: #4b5563;
						margin-bottom: 20px;
					}
					table {
						border: none;
						border-collapse: collapse;
						font-size: .95em;
						width: 100%;
					}
					th {
						background-color: #f3f4f6;
						color: #374151;
						text-align: left;
						padding: 14px 16px;
						font-size: 14px;
						font-weight: 600;
						border-bottom: 2px solid #e5e7eb;
					}
					td {
						padding: 14px 16px;
						border-bottom: 1px solid #f3f4f6;
						color: #4b5563;
					}
					tbody tr:hover {
						background-color: #f9fafb;
					}
					table td a {
						display: inline-block;
					}
				</style>
			</head>
			<body>

				<div id="description">
					<h1>Plan du Site XML (Sitemap)</h1>
					<p>
						Ce plan du site XML est généré pour <a href="https://bidarn.fun/">bidarn.fun</a>. Il permet aux moteurs de recherche comme Google d'explorer et d'indexer efficacement les pages de notre site.
					</p>
					<p>
						En savoir plus sur les <a href="http://sitemaps.org" target="_blank">Plans de site XML</a>.
					</p>
				</div>

				<div id="content">
					<xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
						<p class="info-text">
							Ce fichier d'index de plan du site contient <strong><xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/></strong> sitemaps.
						</p>

						<table id="sitemap" cellpadding="3">
							<thead>
								<tr>
									<th width="70%">Sitemap</th>
									<th width="30%">Dernière Modification</th>
								</tr>
							</thead>
							<tbody>
								<xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
									<xsl:variable name="sitemapURL">
										<xsl:value-of select="sitemap:loc"/>
									</xsl:variable>
									<tr>
										<td>
											<a href="{$sitemapURL}"><xsl:value-of select="sitemap:loc"/></a>
										</td>
										<td>
											<xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)))"/>
										</td>
									</tr>
								</xsl:for-each>
							</tbody>
						</table>
					</xsl:if>
					
					<xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &lt; 1">
						<p class="info-text">
							Ce plan du site contient <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong> pages.
						</p>

						<table id="sitemap" cellpadding="3">
							<thead>
								<tr>
									<th width="65%">Page URL</th>
									<th width="15%">Fréquence</th>
									<th width="20%">Dernière Modif.</th>
								</tr>
							</thead>
							<tbody>
								<xsl:for-each select="sitemap:urlset/sitemap:url">
									<tr>
										<td>
											<xsl:variable name="itemURL">
												<xsl:value-of select="sitemap:loc"/>
											</xsl:variable>
											<a href="{$itemURL}">
												<xsl:value-of select="sitemap:loc"/>
											</a>
										</td>
										<td>
											<xsl:value-of select="sitemap:changefreq"/>
										</td>
										<td>
											<xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)))"/>
										</td>
									</tr>
								</xsl:for-each>
							</tbody>
						</table>
					</xsl:if>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>

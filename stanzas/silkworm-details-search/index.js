import Stanza from 'togostanza/stanza';
import { unwrapValueFromBinding } from 'togostanza/utils';
/**
 * jQueryはウェブアプリケーション側のPrimefacesと衝突するため通常はコメントアウトしておく。
 * Stanza単体で動作させる場合はコメントを外す。
 */
//import * as jquery from 'https://rcshige3.nig.ac.jp/rdf/js/jquery-3.5.1.min.js';

export default class SilkwormDetailsSearch extends Stanza {
	async render() {
		try {

			// ローディング中くるくる表示
			var dispMsg = "<div class='loadingMsg'>Now loading</div>";
			if ($(this.root.querySelector("#loading")).length == 0) {
				$(this.root.querySelector("main")).append("<div id='loading'>" + dispMsg + "</div>");
			}

			//***************************************
			//  系統リソース情報
			//***************************************
			const results1 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_strain.rq.hbs',
				parameters: {
					id		: `${this.params['id']}`,
					language: `${this.params['language']}`,
				},
			});
			const resultsInformation = unwrapValueFromBinding(results1);

			const results2 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_reference.rq.hbs',
				parameters: {
					id		: `${this.params['id']}`,
					language: `${this.params['language']}`,
				},
			});
			const resultsReference = unwrapValueFromBinding(results2);

			//***************************************
			//  卵リソース情報
			//***************************************
			const results3 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_egg.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_egg`,
				},
			});
			const resultsEgg = unwrapValueFromBinding(results3);

			const results4 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_image.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_egg`,
				},
			});
			const resultsEggImage = unwrapValueFromBinding(results4);

			let results5 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_phenotype.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_egg`,
					language: `${this.params['language']}`,
				},
			});
			let resultsEggPhenotype = unwrapValueFromBinding(results5);
			if (resultsEggPhenotype.length != 0) {
				resultsEggPhenotype.forEach(p => {
					let linkedUrls = "";
					let urls = p.bmpo.split("<br/>");
					urls.forEach(url => {
						linkedUrls = linkedUrls + "<div><a href=\"URL\" target=\"_blank\">URL</a></div>".replace(/URL/g, url);
					});
					p.bmpo = linkedUrls;
					linkedUrls = "";
					urls = p.dpo.split("<br/>");
					urls.forEach(url => {
						linkedUrls = linkedUrls + "<div><a href=\"URL\" target=\"_blank\">URL</a></div>".replace(/URL/g, url);
					});
					p.dpo = linkedUrls;
				});
			}

			let results6 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_gene.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_egg`,
				},
			});
			let resultsEggGene = unwrapValueFromBinding(results6);
			if (resultsEggGene.length != 0) {
				resultsEggGene.forEach(g => {
					let linkedUrls = "";
					let urls = g.url.split("<br/>");
					urls.forEach(url => {
						linkedUrls = linkedUrls + "<div><a href=\"URL\" target=\"_blank\">URL</a></div>".replace(/URL/g, url);
					});
					g.url = linkedUrls;
				});
			}

			//***************************************
			//  幼虫リソース情報
			//***************************************
			const results7 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_larva.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_larva`,
				},
			});
			const resultsLarva = unwrapValueFromBinding(results7);

			const results8 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_image.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_larva`,
				},
			});
			const resultsLarvaImage = unwrapValueFromBinding(results8);

			let results9 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_phenotype.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_larva`,
					language: `${this.params['language']}`,
				},
			});
			let resultsLarvaPhenotype = unwrapValueFromBinding(results9);
			if (resultsLarvaPhenotype.length != 0) {
				resultsLarvaPhenotype.forEach(p => {
					let linkedUrls = "";
					let urls = p.bmpo.split("<br/>");
					urls.forEach(url => {
						linkedUrls = linkedUrls + "<div><a href=\"URL\" target=\"_blank\">URL</a></div>".replace(/URL/g, url);
					});
					p.bmpo = linkedUrls;
					linkedUrls = "";
					urls = p.dpo.split("<br/>");
					urls.forEach(url => {
						linkedUrls = linkedUrls + "<div><a href=\"URL\" target=\"_blank\">URL</a></div>".replace(/URL/g, url);
					});
					p.dpo = linkedUrls;
				});
			}

			let results10 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_feeding_ability.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_larva`,
					language: `${this.params['language']}`,
				},
			});
			let resultsLarvaFeeding = unwrapValueFromBinding(results10);
			if (resultsLarvaFeeding.lengh != 0) {
				resultsLarvaFeeding.forEach(f => {
					let linkedUrls = "";
					let urls = f.bmpo.split("<br/>");
					urls.forEach(url => {
						linkedUrls = linkedUrls + "<div><a href=\"URL\" target=\"_blank\">URL</a></div>".replace(/URL/g, url);
					});
					f.bmpo = linkedUrls;
				});
			}

			let results11 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_gene.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_larva`,
				},
			});
			let resultsLarvaGene = unwrapValueFromBinding(results11);
			if (resultsLarvaGene.length != 0) {
				resultsLarvaGene.forEach(g => {
					let linkedUrls = "";
					let urls = g.url.split("<br/>");
					urls.forEach(url => {
						linkedUrls = linkedUrls + "<div><a href=\"URL\" target=\"_blank\">URL</a></div>".replace(/URL/g, url);
					});
					g.url = linkedUrls;
				});
			}

			//***************************************
			//  蛹リソース情報
			//***************************************
			const results12 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_pupa.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_pupa`,
				},
			});
			const resultsPupa = unwrapValueFromBinding(results12);

			const results13 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_image.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_pupa`,
				},
			});
			const resultsPupaImage = unwrapValueFromBinding(results13);

			let results14 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_phenotype.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_pupa`,
					language: `${this.params['language']}`,
				},
			});
			let resultsPupaPhenotype = unwrapValueFromBinding(results14);
			if (resultsPupaPhenotype.length != 0) {
				resultsPupaPhenotype.forEach(p => {
					let linkedUrls = "";
					let urls = p.bmpo.split("<br/>");
					urls.forEach(url => {
						linkedUrls = linkedUrls + "<div><a href=\"URL\" target=\"_blank\">URL</a></div>".replace(/URL/g, url);
					});
					p.bmpo = linkedUrls;
					linkedUrls = "";
					urls = p.dpo.split("<br/>");
					urls.forEach(url => {
						linkedUrls = linkedUrls + "<div><a href=\"URL\" target=\"_blank\">URL</a></div>".replace(/URL/g, url);
					});
					p.dpo = linkedUrls;
				});
			}

			let results15 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_gene.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_pupa`,
				},
			});
			let resultsPupaGene = unwrapValueFromBinding(results15);
			if (resultsPupaGene.length != 0) {
				resultsPupaGene.forEach(g => {
					let linkedUrls = "";
					let urls = g.url.split("<br/>");
					urls.forEach(url => {
						linkedUrls = linkedUrls + "<div><a href=\"URL\" target=\"_blank\">URL</a></div>".replace(/URL/g, url);
					});
					g.url = linkedUrls;
				});
			}

			//***************************************
			//  成虫リソース情報
			//***************************************
			const results16 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_adult.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_adult`,
				},
			});
			const resultsAdult = unwrapValueFromBinding(results16);

			const results17 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_image.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_adult`,
				},
			});
			const resultsAdultImage = unwrapValueFromBinding(results17);

			let results18 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_phenotype.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_adult`,
					language: `${this.params['language']}`,
				},
			});
			let resultsAdultPhenotype = unwrapValueFromBinding(results18);
			if (resultsAdultPhenotype.length != 0) {
				resultsAdultPhenotype.forEach(p => {
					let linkedUrls = "";
					let urls = p.bmpo.split("<br/>");
					urls.forEach(url => {
						linkedUrls = linkedUrls + "<div><a href=\"URL\" target=\"_blank\">URL</a></div>".replace(/URL/g, url);
					});
					p.bmpo = linkedUrls;
					linkedUrls = "";
					urls = p.dpo.split("<br/>");
					urls.forEach(url => {
						linkedUrls = linkedUrls + "<div><a href=\"URL\" target=\"_blank\">URL</a></div>".replace(/URL/g, url);
					});
					p.dpo = linkedUrls;
				});
			}

			let results19 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_gene.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_adult`,
				},
			});
			let resultsAdultGene = unwrapValueFromBinding(results19);
			if (resultsAdultGene.length != 0) {
				resultsAdultGene.forEach(g => {
					let linkedUrls = "";
					let urls = g.url.split("<br/>");
					urls.forEach(url => {
						linkedUrls = linkedUrls + "<div><a href=\"URL\" target=\"_blank\">URL</a></div>".replace(/URL/g, url);
					});
					g.url = linkedUrls;
				});
			}

			this.renderTemplate({
				template: 'stanza.html.hbs',
				parameters: {
					information		: resultsInformation,
					reference		: resultsReference,

					egg				: resultsEgg,
					egg_image		: resultsEggImage,
					egg_phenotype	: resultsEggPhenotype,
					egg_gene		: resultsEggGene,

					larva			: resultsLarva,
					larva_image		: resultsLarvaImage,
					larva_phenotype	: resultsLarvaPhenotype,
					larva_feeding	: resultsLarvaFeeding,
					larva_gene		: resultsLarvaGene,

					pupa			: resultsPupa,
					pupa_image		: resultsPupaImage,
					pupa_phenotype	: resultsPupaPhenotype,
					pupa_gene		: resultsPupaGene,

					adult			: resultsAdult,
					adult_image		: resultsAdultImage,
					adult_phenotype	: resultsAdultPhenotype,
					adult_gene		: resultsAdultGene,

				}
			});

			// ローディング中くるくる表示削除
			$(this.root.querySelector("#loading")).remove();

		} catch (e) {
			console.error(e);
		}
	}
}

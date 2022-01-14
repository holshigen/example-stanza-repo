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
			if (resultsInformation.length != 0) {
				for( let i of resultsInformation) {
					let linkedUrls = "";
					let urls = i.journal.split("<br/>");
					for (let url of urls ) {
						linkedUrls = linkedUrls + "<div><a href=\"URL\" target=\"_blank\">URL</a></div>".replace(/URL/g, url);
					}
					 i.journal = linkedUrls;
				}
			}

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
				for ( let p of resultsEggPhenotype){
					// bmpoのURLをリンクに置換
					let linkedUrls = "";
					let urls = p.bmpo.split("<br/>");
					for ( let url of urls ) {
						if( url.length != 0 ) {
							let linkedUrl = await replaceToLink(url);
							linkedUrls = linkedUrls + linkedUrl;
						}
					}
					p.bmpo = linkedUrls;
					// 関連クラスのURLをリンクに置換
					linkedUrls = "";
					urls = p.related_class.split("<br/>");
					for ( let url of urls ) {
						if( url.length != 0 ) {
							let linkedUrl = await replaceToLink(url);
							linkedUrls = linkedUrls + linkedUrl;
						}
					}
					p.related_class = linkedUrls;
				}
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
				for( let p of resultsLarvaPhenotype){
					// bmpoのURLをリンクに置換
					let linkedUrls = "";
					let urls = p.bmpo.split("<br/>");
					for ( let url of urls ) {
						if( url.length != 0 ){
							let linkedUrl = await replaceToLink(url);
							linkedUrls = linkedUrls + linkedUrl;
						}
					}
					p.bmpo = linkedUrls;
					// 関連クラスのURLをリンクに置換
					linkedUrls = "";
					urls = p.related_class.split("<br/>");
					for ( let url of urls ) {
						if( url.length != 0 ){
							let linkedUrl = await replaceToLink(url);
							linkedUrls = linkedUrls + linkedUrl;
						}
					}
					p.related_class = linkedUrls;
				}
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
				for ( let f of resultsLarvaFeeding) {
					// bmpoのURLをリンクに置換
					let linkedUrls = "";
					let urls = f.bmpo.split("<br/>");
					for ( let url of urls ) {
						if( url.length != 0 ){
							let linkedUrl = await replaceToLink(url);
							linkedUrls = linkedUrls + linkedUrl;
						}
					}
					f.bmpo = linkedUrls;
					// 関連クラスのURLをリンクに置換
					linkedUrls = "";
					urls = f.related_class.split("<br/>");
					for ( let url of urls ) {
						if( url.length != 0 ){
							let linkedUrl = await replaceToLink(url);
							linkedUrls = linkedUrls + linkedUrl;
						}
					}
					f.related_class = linkedUrls;
				}
			}

			let results11 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_larval_period.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_larva`,
					language: `${this.params['language']}`,
				},
			});
			let resultsLarvalPeriod = unwrapValueFromBinding(results11);

			if (resultsLarvalPeriod.lengh != 0) {
				for ( let p of resultsLarvalPeriod) {
					// bmpoのURLをリンクに置換
					let linkedUrls = "";
					let urls = p.bmpo.split("<br/>");
					for ( let url of urls ) {
						if( url.length != 0 ){
							let linkedUrl = await replaceToLink(url);
							linkedUrls = linkedUrls + linkedUrl;
						}
					}
					p.bmpo = linkedUrls;
					// 関連クラスのURLをリンクに置換
					linkedUrls = "";
					urls = p.related_class.split("<br/>");
					for ( let url of urls ) {
						if( url.length != 0 ){
							let linkedUrl = await replaceToLink(url);
							linkedUrls = linkedUrls + linkedUrl;
						}
					}
					p.related_class = linkedUrls;
				}
			}

			let results12 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_gene.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_larva`,
				},
			});
			let resultsLarvaGene = unwrapValueFromBinding(results12);

			if (resultsLarvaGene.length != 0) {
				for (let g of resultsLarvaGene) {
					let linkedUrls = "";
					let urls = g.url.split("<br/>");
					for(let url of urls) {
						linkedUrls = linkedUrls + "<div><a href=\"URL\" target=\"_blank\">URL</a></div>".replace(/URL/g, url);
					}
					g.url = linkedUrls;
				}
			}

			//***************************************
			//  蛹リソース情報
			//***************************************
			const results13 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_pupa.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_pupa`,
				},
			});
			const resultsPupa = unwrapValueFromBinding(results13);

			const results14 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_image.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_pupa`,
				},
			});
			const resultsPupaImage = unwrapValueFromBinding(results14);

			let results15 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_phenotype.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_pupa`,
					language: `${this.params['language']}`,
				},
			});
			let resultsPupaPhenotype = unwrapValueFromBinding(results15);

			if (resultsPupaPhenotype.length != 0) {
				for( let p of resultsPupaPhenotype){
					// bmpoのURLをリンクに置換
					let linkedUrls = "";
					let urls = p.bmpo.split("<br/>");
					for ( let url of urls ) {
						if( url.length != 0 ){
							let linkedUrl = await replaceToLink(url);
							linkedUrls = linkedUrls + linkedUrl;
						}
					}
					p.bmpo = linkedUrls;
					// 関連クラスのURLをリンクに置換
					linkedUrls = "";
					urls = p.related_class.split("<br/>");
					for ( let url of urls ) {
						if( url.length != 0 ){
							let linkedUrl = await replaceToLink(url);
							linkedUrls = linkedUrls + linkedUrl;
						}
					}
					p.related_class = linkedUrls;
				}
			}

			let results16 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_gene.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_pupa`,
				},
			});
			let resultsPupaGene = unwrapValueFromBinding(results16);

			if (resultsPupaGene.length != 0) {
				for (let g of resultsPupaGene) {
					let linkedUrls = "";
					let urls = g.url.split("<br/>");
					for ( let url of urls ) {
						linkedUrls = linkedUrls + "<div><a href=\"URL\" target=\"_blank\">URL</a></div>".replace(/URL/g, url);
					}
					g.url = linkedUrls;
				}
			}

			//***************************************
			//  成虫リソース情報
			//***************************************
			const results17 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_adult.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_adult`,
				},
			});
			const resultsAdult = unwrapValueFromBinding(results17);

			const results18 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_image.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_adult`,
				},
			});
			const resultsAdultImage = unwrapValueFromBinding(results18);

			let results19 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_phenotype.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_adult`,
					language: `${this.params['language']}`,
				},
			});
			let resultsAdultPhenotype = unwrapValueFromBinding(results19);
			if (resultsAdultPhenotype.length != 0) {
				for( let p of resultsAdultPhenotype){
					// bmpoのURLをリンクに置換
					let linkedUrls = "";
					let urls = p.bmpo.split("<br/>");
					for ( let url of urls ) {
						if( url.length != 0 ){
							let linkedUrl = await replaceToLink(url);
							linkedUrls = linkedUrls + linkedUrl;
						}
					}
					p.bmpo = linkedUrls;
					// 関連クラスのURLをリンクに置換
					linkedUrls = "";
					urls = p.related_class.split("<br/>");
					for ( let url of urls ) {
						if( url.length != 0 ){
							let linkedUrl = await replaceToLink(url);
							linkedUrls = linkedUrls + linkedUrl;
						}
					}
					p.related_class = linkedUrls;
				}
			}

			let results20 = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_gene.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_adult`,
				},
			});
			let resultsAdultGene = unwrapValueFromBinding(results20);
			if (resultsAdultGene.length != 0) {
				for (let g of resultsAdultGene) {
					let linkedUrls = "";
					let urls = g.url.split("<br/>");
					for ( let url of urls ) {
						linkedUrls = linkedUrls + "<div><a href=\"URL\" target=\"_blank\">URL</a></div>".replace(/URL/g, url);
					}
					g.url = linkedUrls;
				}
			}


			this.renderTemplate({
				template: 'stanza.html.hbs',
				parameters: {
					information		: resultsInformation[0],
					reference		: resultsReference,

					egg				: resultsEgg[0],
					egg_image		: resultsEggImage,
					egg_phenotype	: resultsEggPhenotype,
					egg_gene		: resultsEggGene,

					larva			: resultsLarva[0],
					larva_image		: resultsLarvaImage,
					larva_phenotype	: resultsLarvaPhenotype,
					larva_feeding	: resultsLarvaFeeding,
					larva_period	: resultsLarvalPeriod,
					larva_gene		: resultsLarvaGene,

					pupa			: resultsPupa[0],
					pupa_image		: resultsPupaImage,
					pupa_phenotype	: resultsPupaPhenotype,
					pupa_gene		: resultsPupaGene,

					adult			: resultsAdult[0],
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

//***************************************
// Bioportalからラベル取得用URL
//***************************************
const dpo = 'https://data.bioontology.org/ontologies/DPO/classes/';
const bmpo = 'https://data.bioontology.org/ontologies/BMPO/classes/';
const wb = 'https://data.bioontology.org/ontologies/WB-PHENOTYPE/classes/';

//***************************************
// オントロジークラスURIからリンクを生成し返す
// Tartget: BMPO, DPO(FBcv), WB-PHENOTYPE
//***************************************
 async function replaceToLink(url){

	let classUrl = "";
	let linkedUrl = "";

	if( url.match(/BMPO/)){
		classUrl = bmpo;
	} else if(url.match(/FBcv/)){
		classUrl = dpo;
	} else {
		classUrl = wb;
	}

	// BioPortalより各オントロジーの prefLabelを取得
	const response = await fetch(classUrl + encodeURIComponent( url ) + '?apikey=648534f4-d57a-4b36-b1df-257d79071df6');
	const json = await response.json();
	linkedUrl = "<div><a href=\"URL\" target=\"_blank\">URL</a></div>".replace(/URL/g, url) + "(" + json.prefLabel + ")";

	return linkedUrl;
}

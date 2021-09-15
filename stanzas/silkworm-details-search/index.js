import Stanza from 'togostanza/stanza';
import { unwrapValueFromBinding } from 'togostanza/utils';

export default class SilkwormDetailsSearch extends Stanza {
	async render() {
		try {

			//***************************************
			//  系統リソース情報
			//***************************************
			const resultsInformation = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_strain.rq.hbs',
				parameters: {
					id		: `${this.params['id']}`,
					language: `${this.params['language']}`,
				},
			});
			const resultsReference = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_reference.rq.hbs',
				parameters: {
					id		: `${this.params['id']}`,
					language: `${this.params['language']}`,
				},
			});

			//***************************************
			//  卵リソース情報
			//***************************************
			const resultsEgg = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_egg.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_egg`,
				},
			});
			const resultsEggImage = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_image.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_egg`,
				},
			});
			const resultsEggPhenotype = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_phenotype.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_egg`,
					language: `${this.params['language']}`,
				},
			});
			const resultsEggGene = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_gene.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_egg`,
				},
			});

			//***************************************
			//  幼虫リソース情報
			//***************************************
			const resultsLarva = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_larva.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_larva`,
				},
			});
			const resultsLarvaImage = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_image.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_larva`,
				},
			});
			const resultsLarvaPhenotype = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_phenotype.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_larva`,
					language: `${this.params['language']}`,
				},
			});
			const resultsLarvaFeeding = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_feeding_ability.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_larva`,
					language: `${this.params['language']}`,
				},
			});
			const resultsLarvaGene = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_gene.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_larva`,
				},
			});

			//***************************************
			//  蛹リソース情報
			//***************************************
			const resultsPupa = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_pupa.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_pupa`,
				},
			});
			const resultsPupaImage = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_image.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_pupa`,
				},
			});
			const resultsPupaPhenotype = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_phenotype.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_pupa`,
					language: `${this.params['language']}`,
				},
			});
			const resultsPupaGene = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_gene.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_pupa`,
				},
			});

			//***************************************
			//  成虫リソース情報
			//***************************************
			const resultsAdult = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_adult.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_adult`,
				},
			});
			const resultsAdultImage = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_image.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_adult`,
				},
			});
			const resultsAdultPhenotype = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_phenotype.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_adult`,
					language: `${this.params['language']}`,
				},
			});
			const resultsAdultGene = await this.query({
				endpoint: 'https://rcshige3.nig.ac.jp/rdf/sparql/',
				template: 'stanza_gene.rq.hbs',
				parameters: {
					id		: `${this.params['id']}_adult`,
				},
			});

			this.renderTemplate({
				template: 'stanza.html.hbs',
				parameters: {
					information		: unwrapValueFromBinding(resultsInformation),
					reference		: unwrapValueFromBinding(resultsReference),

					egg				: unwrapValueFromBinding(resultsEgg),
					egg_image		: unwrapValueFromBinding(resultsEggImage),
					egg_phenotype	: unwrapValueFromBinding(resultsEggPhenotype),
					egg_gene		: unwrapValueFromBinding(resultsEggGene),

					larva			: unwrapValueFromBinding(resultsLarva),
					larva_image		: unwrapValueFromBinding(resultsLarvaImage),
					larva_phenotype	: unwrapValueFromBinding(resultsLarvaPhenotype),
					larva_feeding	: unwrapValueFromBinding(resultsLarvaFeeding),
					larva_gene		: unwrapValueFromBinding(resultsLarvaGene),

					pupa			: unwrapValueFromBinding(resultsPupa),
					pupa_image		: unwrapValueFromBinding(resultsPupaImage),
					pupa_phenotype	: unwrapValueFromBinding(resultsPupaPhenotype),
					pupa_gene		: unwrapValueFromBinding(resultsPupaGene),

					adult			: unwrapValueFromBinding(resultsAdult),
					adult_image		: unwrapValueFromBinding(resultsAdultImage),
					adult_phenotype	: unwrapValueFromBinding(resultsAdultPhenotype),
					adult_gene		: unwrapValueFromBinding(resultsAdultGene),

				}
			});

		} catch (e) {
			console.error(e);
		}
	}
}

const fs = require('fs')
const cheerio = require('cheerio')
const https = require('https');

let champions = []
let $ = cheerio.load(fs.readFileSync('./rawdata/champions', 'utf8'))
$('.m-1o47yso').find('.m-1lk7whh').each((i, el) => {
	champions.push({
		'name': $(el).find('.m-1xvjosc').text(),
		'tier': $(el).find('.m-s5xdrg').text(),
		'class': $(el).find('.m-2w529h').text().toLowerCase().replaceAll(/:| |-|\./g, '').replace('gadgeteens', 'gadgeteen').split('\n').filter(i => i),
		'image': `champions/${$(el).find('.m-1xvjosc').text()}.jpg`
		//'image': $(el).css('background-image').replace('url("', '').split('?v=')[0]
	})
})

let synergies = [];
['classes', 'origins'].forEach(item => {
let $ = cheerio.load(fs.readFileSync('./rawdata/' + item, 'utf8'))
$('.eppms5d0').each((i, el) => {
	synergies.push({
		'name': $(el).find('.m-pvjzf0').text().toLowerCase().replaceAll(/:| |-|\./g, ''),
		'image': `synergies/${$(el).find('.m-pvjzf0').text().toLowerCase().replaceAll(/:| |-|\./g, '')}.svg`,
		//'image': $(el).find('.m-8k2h0n').attr('src').split('?v=')[0],
		'count': $(el).find('.m-24mlye').map((i, el) => $(el).text()).toArray()
	})
})
})

let headcount = {}
synergies.forEach(i => headcount[i.name] = 0)
champions.forEach(i => {
	i.class.forEach(j => headcount[j]++)
})

// champions.forEach(item => {
// 	https.get(item.image, res => res.pipe(fs.createWriteStream(`./output/champions/${item.name}.jpg`)))
// })

// synergies.forEach(item => {
// 	https.get(item.image, res => res.pipe(fs.createWriteStream(`./output/synergies/${item.name}.svg`)))
// })

// fs.writeFileSync(`./output/champions_url.json`, JSON.stringify(champions, null, 4))
// fs.writeFileSync(`./output/synergies_url.json`, JSON.stringify(synergies, null, 4))
fs.writeFileSync(`./output/champions.json`, JSON.stringify(champions, null, 4))
fs.writeFileSync(`./output/synergies.json`, JSON.stringify(synergies, null, 4))
fs.writeFileSync(`./output/headcount.json`, JSON.stringify(headcount, null, 4))
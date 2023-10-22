let coinArr = [];
//let coinTemp = [];
const inputRange = document.getElementById('rangeInput');
const container = document.querySelector('.container');
const totalCoins = document.getElementById('totalcoins');
const totalMarketCap = document.getElementById('totalmarketcap');
const volume = document.getElementById('volume');
const searchBtn = document.getElementById('searchBtn');
const searchBar = document.getElementById('searchBar');
const result = document.getElementById('result');

const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '217d0d1c5bmshb9e1ba248f6d6ccp1d1ce8jsn904ee41d02f2',
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
	}
};

fetch(url, options)
.then((response)=> response.json())
.then(response=>
	{
		
		coinArr = [...response.data.coins];
		setNav(response.data.stats);
		printCoins(coinArr);
	
	})
.catch((error)=>
{
	console.log(error)
});


function setNav(stats)
{
	totalCoins.textContent = "Total Coins:  "+stats.totalCoins;
	totalMarketCap.textContent = "Total Marketcap:  $"+stats.totalMarketCap;
	volume.textContent = "24h Volume:  $"+stats.total24hVolume;
}
function printCoins(coins)
{
	coins.forEach(element => 
		{
		const coinCard = document.createElement('div');
		const container = document.querySelector('.container');
coinCard.className = 'card';
coinCard.innerHTML = `
<img src=${element.iconUrl} class="card-img-top" alt="..."style = "height: 100px; width: 100px;">
<div class="card-body">
  <h5 class="card-title">${element.name}</h5>
  <p><span class = "coinTitle">Price:</span> $${Math.round(element.price * 100) / 100}</p>
  <p><span class = "volume"> 24h Volume:</span> $${element["24hVolume"]}</p>
  <p><span class = "change"> 24h Change:</span> ${element.change}%</p>
  <p><span class = "market">Market cap:</span> $${element.marketCap}</p>
  <a href="#" class="btn btn-primary">chart</a>
</div>
</div>
`;
container.appendChild(coinCard);
	});

}


searchBar.addEventListener('input',(e)=>{

	let val = searchBar.value.toLowerCase();
	let coins = document.querySelectorAll('.card-title');
	const card = document.querySelectorAll('.card');

	card.forEach(element=>{
		element.style.display = "block";
	})

	coins.forEach(element=>{

		let coinName = element.textContent.toLowerCase();
		if(!coinName.startsWith(val))
		{
			const el = element.parentNode.parentNode;
			el.style.display = "none";
		}

	})
})

inputRange.addEventListener('input',()=>{

	let val = inputRange.value;
	result.textContent = "$"+val;
	const tempCoins = coinArr.filter((element)=>{
		return (Math.round(element.price * 100) / 100)<val;
	})
	tempCoins.forEach(element=>{
		console.log(element.price);
	})
	container.innerHTML="";
	printCoins(tempCoins);
})


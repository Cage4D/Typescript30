const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

type City = {
    city: string
    state: string
    population: string
}

const cities: City[] = []

fetch(endpoint).then(data => data.json()).then((content:City[]) => cities.push(...content))

function findMatches(wordToMatch:string, cities: City[]) {
    return cities.filter((place:City) => {
        const regex = new RegExp(wordToMatch, "gi")
        return place.city.match(regex) || place.state.match(regex)
    })
}

function numberWithCommas(x:Object) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "")
}

function displayMatches(this:HTMLInputElement) {
    const matchArray = findMatches(this.value, cities)
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, "gi")
        const cityName = place.city.replace(regex, `<span class='hl'>${this.value}</span>`)
        const stateName = place.state.replace(regex, `<span class='hl'>${this.value}</span>`)
        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>
        `
    }).join(" ")

    suggestions!.innerHTML = html
}

const searchInput = document.querySelector(".search")
const suggestions = document.querySelector<HTMLUListElement>(".suggestions")

searchInput?.addEventListener("change", displayMatches)
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
        return place.city.match(regex)
    })
}
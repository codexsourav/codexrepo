interface Airport {
  IATA_code: string;
  ICAO_code: string;
  airport_name: string;
  city_name: string;
}

const airports: Airport[] = [
  {
    "IATA_code": "VTZ",
    "ICAO_code": "VEVZ",
    "airport_name": "Vishakhapatnam Airport",
    "city_name": "Vishakhapatnam"
  },
  {
    "IATA_code": "WGC",
    "ICAO_code": "VOWA",
    "airport_name": "Warangal Airport",
    "city_name": "Warangal"
  },
  {
    "IATA_code": "ZER",
    "ICAO_code": "VEZO",
    "airport_name": "Zero Airport",
    "city_name": "Zero"
  }
];

function findAirportsContainingLetter(letter: string): Airport[] {
  const results: Airport[] = [];

  airports.forEach((airport) => {
    if (
      airport.IATA_code.toLowerCase().includes(letter.toLowerCase()) ||
      airport.ICAO_code.toLowerCase().includes(letter.toLowerCase()) ||
      airport.airport_name.toLowerCase().includes(letter.toLowerCase()) ||
      airport.city_name.toLowerCase().includes(letter.toLowerCase())
    ) {
      results.push(airport);
    }
  });

  return results;
}

// Example: Find airports containing the letter 'o'
const letterToFind = 'air';
const airportsWithO = findAirportsContainingLetter(letterToFind);
console.log(airportsWithO);

// Función generadora de URLS
function* urlGenerator(min, max) {
  let start = min
  while(start <= max) {
    yield `https://swapi.dev/api/people/${start++}`
  }
}
// Creo un generador por cada row
const genFirstRow = urlGenerator(1, 5)
const genSecondRow = urlGenerator(6, 10)
const genThirdRow = urlGenerator(12, 16)

const getCharacterData = (rowId)  => {
  let url = ''
  if (rowId === 'firstRow') {
    url = genFirstRow.next()
  }
  if (rowId === 'secondRow') {
    url = genSecondRow.next()
  }
  if (rowId === 'thirdRow') {
    url = genThirdRow.next()
  }
// Llamado a la api si el generador no ha terminado
  if (!url.done) {
    fetch(url.value).then(
      response => response.json().then(
        data => {
          let name = data.name
          let height = data.height
          let weight = data.mass
          fillDataCard(name, height, weight, rowId)
        }
      )
    )
  }
}
// Genero elementos HTML para crear la card de cada personaje
const fillDataCard = (name, height, weight, rowId) => {
  let row = document.getElementById(rowId)
  let card = document.createElement('div')
  let cardTitle = document.createElement('div')
  let icon = document.createElement('i')
  let characterName = document.createElement('h5')
  let cardBody = document.createElement('div')
  let characterInfo = document.createElement('p')

  card.classList.add('col-3', 'card', 'me-2', 'mt-2')
  cardTitle.classList.add('d-flex','align-items-center','card-title', 'mt-3', 'ms-2')
  icon.classList.add('fa-solid', 'fa-jedi', 'fa-xl', 'me-2')
  cardBody.classList.add('card-body', 'p-0')

  characterName.innerHTML = name
  characterInfo.innerHTML = `<strong>Estatura:</strong> ${height} cm. <strong>Peso:</strong> ${weight} kg.`

// Seleccionar color para los iconos de cada row
  if (rowId === 'firstRow') {
    icon.style.color = '#fa8072'
    card.style.border = '3px solid #fa8072'
  }
  if (rowId === 'secondRow') {
    icon.style.color = '#90ee90'
    card.style.border = '3px solid #90ee90'
  }
  if (rowId === 'thirdRow') {
    icon.style.color = '#87cefa'
    card.style.border = '3px solid #87cefa'
  }

  cardTitle.appendChild(icon)
  cardTitle.appendChild(characterName)
  card.appendChild(cardTitle)
  cardBody.appendChild(characterInfo)
  card.appendChild(cardBody)
  row.appendChild(card)
}

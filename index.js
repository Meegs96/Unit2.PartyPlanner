const COHORT = "2309-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state =  {
  events: [],
}

const partyList = document.getElementById("party-list");
const partyForm = document.getElementById("party-form");

async function createEvent(event) {
  event.preventDefault();
  
  
  try {
    const response = await fetch(API_URL + "/events", {
      method: "POST",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        date: `${document.getElementById("date").value}:00.000Z`,
        location: document.getElementById("location").value,
      })
    });
    getEvents();
  } catch(err) {
    console.error(err);
  }
}

async function getEvents() {
  try {
    const response = await fetch(API_URL + "/events");
    const json = await response.json();
    state.events = json.data;
    render();

  } catch(err) {
    console.error(err);
  }
}

function render() {
  const events = state.events.map((event) => {
    const article = document.createElement("article");
    deleteBtn.innerText = "X"
    deleteBtn.addEventListener("click", async() => {
      try{
        const response = await fetch(API_URL + `/events/${event.id}`, {
          method: "DELETE"
        });
        console.log("deleted!")
        getEvents();
      } catch(err) {
        console.error(err);
      }

    });
    article.innerHTML = `
    <h3>${event.name}</h3
    <address>${event.location}</address>`
    article.append(deleteBtn);

    return article;

  });
  PartyList.replaceChildren(...events);
}

getEvents();

/*const eventList = document.querySelector ("#events")

const addEventsForm = document.querySelector ("#addEvent")

addEventsForm.addEventListener("submit", addEvent)

async function render() {
  await getEvents();
  renderEvents()
}
render();

async function getEvents() {
    let response = await fetch (API_URL);
    console.log (response)
    let json = await response.json()
    console.log(json)
  
    state.events = json.data
    console.log(state.events)
  }
  getEvents()
  
  function renderEvents() {
    if (!state.events.length) {
      eventList.innerHTML = "<li>No events.</li>"
      return;
    }
  
    const eventCards = state.events.map ((event) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <h2>${event.name}</h2>
        <p>${event.description}</p>
        <p>${event.date}</p>
        <p>${event.location}</p>
      `;
    })
  }
  */
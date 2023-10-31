const COHORT = "2309-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state =  {
  events: [],
}

const eventList = document.querySelector ("#events")

const addEventsForm = document.querySelector ("#addEvent")

addEventsForm.addEventListener("submit", addEvent)

async function render() {
  await getEvents();
  renderEvents()

}
render();
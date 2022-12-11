const formTab = document.getElementById("addTablon");
const titulo = document.getElementById("title-tab");
const descripcion = document.getElementById("description-tab");
const autor = document.getElementById("author-tab");
const subbtn = document.getElementById("subbtn");

const URL_POST = 'http://localhost:3005/api/tabs/addTablon';

const addTab = async (e) => {

    e.preventDefault();

    let dataTab = {}; 
    dataTab["title"] = titulo.value;
    dataTab["description"] = descripcion.value;
    dataTab["author"] = autor.value;

    try {
        const valores = {
            titulo : dataTab.title, 
            autor: dataTab.author, 
            descripcion: dataTab.description
        };
        console.log(valores)
        const newtab = await axios.post(URL_POST, valores, {
            headers: {"Access-Control-Allow-Origin": "*"}
        });
        
    } catch (error) {
        console.log(`Error --> ${error}`);
    }
}

formTab.addEventListener('submit', addTab);





const fetchPlants = async () => {
    try {
        const response = await fetch(`https://trefle.io/api/v1/plants?token=${TREFLE_TOKEN}`);
        const json = await response.json();
        console.log(json.data);
    } catch (error) {
        console.log("Fejl ved hentning af planter:", error);
        
    }
}
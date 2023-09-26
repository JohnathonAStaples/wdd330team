

const alertModule = (function  () {
    const alerts = []; //Array to store data from alerts.json

    //Function to fetch/parse alerts from alerts.json
    async function fetchAlerts() {
        try {
            const response = await fetch("../alerts.json"); //fetches and waits for response
            const data = await response.json(); //grabs response from the response body and parses json
            alerts.push(...data); //push alerts from json into the alerts array up above
        }   catch (error) {
            console.error("Error fetching alerts:", error);
        }
    }

    //Function to create alert elements
    function createAlertElements() {
        const alertList = document.createElement("section"); //html section is created 
        alertList.classList.add("alert-list"); //css class is added to the alertList element

        alerts.forEach((alertData) => { //loop that iterates over the array of info that came from json 
            const alert = document.createElement("p"); //creates a p element
            alert.textContent = alertData.message; //sets the text inside the paragraph to the alert message
            alert.style.backgroundColor = alertData.background; //sets the backgroundcolor to the alertData object
            alert.style.color = alertData.color; //sets the text color to the alertData object
            alertList.appendChild(alert);
        });

        return alertList;
    }

    //Function to prepend the alert section to the main element in the html
    function prependAlertsToMain() {
        const mainElement = document.querySelector("main"); //this finds the main element in the html
        const alertList = createAlertElements(); //this line calls the createAlertElements function to create alert element section from alertList
        mainElement.prepend(alertList); //inserts the list of alert elements as the first child of main element
    }

    //Public function to initialize the alert module
    async function init() {
        await fetchAlerts(); //Fetch alerts from alerts.json
        prependAlertsToMain();//Prepend alerts to the main element
    }

    //Return the public interface of the module
    return {
        init,
    };
})();

export default alertModule;


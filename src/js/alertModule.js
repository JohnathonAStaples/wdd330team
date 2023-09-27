

const alertModule = (function  () {
    const alerts = []; //Array to store data from alerts.json

    //Function to fetch/parse alerts from alerts.json
    async function fetchAlerts() {
        try {
            const response = await fetch("json/alerts.json"); //fetches and waits for response
            const data = await response.json(); //grabs response from the response body and parses json
            alerts.push(...data); //push alerts from json into the alerts array up above
        }   catch (error) {
            console.error("Error fetching alerts:", error);
        }
    }

  // Function to create alert elements with error handling
function createAlertElements() {
    const alertList = document.createElement("section");
    alertList.classList.add("alert-list");

    alerts.forEach((alertData) => {
        try {
            const alert = document.createElement("p");
            alert.textContent = alertData.message;
            alert.style.backgroundColor = alertData.background;
            alert.style.color = alertData.color;
            alertList.appendChild(alert);
        } catch (error) {
            console.error("Error creating alert element:", error);
            // You can choose to skip this alert and continue with the rest if needed.
        }
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

//export default alertModule;


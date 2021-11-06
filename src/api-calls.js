import {connectionErr, checkStatus} from "./error-handling.js";

function getData(dataUrl, dataObjName) {
  const retrievedData = fetch(dataUrl)
    .then(res => {
      checkStatus(res, `There was an error connecting to ${dataUrl}.`)
      return res.json();
    })
    .then(data => data[dataObjName])
    .catch(err => {
      if (err.message === "Failed to fetch") {
        connectionErr(err, "Couldn't connect to database.")
      } else {
        connectionErr(err);
      }
    });
  return retrievedData;
}

function getAllData() {
  const gotUserData = getData('http://localhost:3001/api/v1/users', 'userData');
  const gotSleepData = getData('http://localhost:3001/api/v1/sleep', 'sleepData');
  const gotActivityData = getData('http://localhost:3001/api/v1/activity', 'activityData');
  const gotHydrationData = getData('http://localhost:3001/api/v1/hydration', 'hydrationData');
  const allPromise = Promise.all([gotUserData, gotSleepData, gotActivityData, gotHydrationData]).then(data => data);
  return allPromise;
}

function postData(url, newData) {
  console.log(newData.date)
  const postedData = fetch(url, {
    method: "POST",
    body: JSON.stringify(newData),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => {
    checkStatus(response);
    return response.json();
  })
  .catch(err => connectionErr(err));
  return postedData;
}

export { postData, getAllData }

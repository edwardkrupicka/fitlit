
function getData(dataUrl, dataObjName) {
  const retrievedData = fetch(dataUrl)
    .then(req => req.json())
    .then(data => data[dataObjName])
    .catch(err => console.log('error: ', err));
  return retrievedData;
}

function getAllData() {
  const gotUserData = getData('http://localhost:3001/api/v1/users', 'userData');
  const gotSleepData = getData('http://localhost:3001/api/v1/sleep', 'sleepData');
  const gotActivityData = getData('http://localhost:3001/api/v1/activity', 'activityData');
  const gotHydrationData = getData('http://localhost:3001/api/v1/hydration', 'hydrationData');
  const allPromise = Promise.all([gotUserData, gotSleepData, gotActivityData, gotHydrationData]).then(data => {
    return data;
  });
}

function postData(url, newData) {
  const postedData = fetch(url, {
    method: "POST",
    body: JSON.stringify(newData),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .catch(err => console.log('error!', err));
  return postedData;
}

// function postSleep(newData) {
//   const postedData = fetch('http://localhost:3001/api/v1/sleep', {
//     method: "POST",
//     body: JSON.stringify(newData),
//     headers: {
//       "Content-Type": "application/json"
//     }
//   })
//     .then(response => response.json())
//     .catch(err => console.log('error!', err));
//   return postedData;
// }

export { postData, getAllData }

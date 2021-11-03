
function getData(dataUrl, dataObjName) {
  const retrievedData = fetch(dataUrl)
    .then(req => req.json())
    .then(data => data[dataObjName])
    .catch(err => console.log('error: ', err));
  return retrievedData;
}

const gotUserData = getData('http://localhost:3001/api/v1/users', 'userData');
const gotSleepData = getData('http://localhost:3001/api/v1/sleep', 'sleepData');
const gotActivityData = getData('http://localhost:3001/api/v1/activity', 'activityData');
const gotHydrationData = getData('http://localhost:3001/api/v1/hydration', 'hydrationData');

const allPromise = Promise.all([gotUserData, gotSleepData, gotActivityData, gotHydrationData]).then(data => {
  return data;
});

const example = { userID: 50, date: '2021/06/15' , hoursSlept: 7.5 , sleepQuality: 5 };

function postData(dataUrl, newData) {
  const sentData = fetch(dataUrl, {
    method: "POST",
    body: JSON.stringify(newData),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    // .then(data => {
    //   console.log(data)

    // })
    // .catch(err => console.log('error!', err));
}

postData('http://localhost:3001/api/v1/sleep', example);
export { allPromise, postData }

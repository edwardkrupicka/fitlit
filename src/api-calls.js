// const fetchUserData = fetch('https://pacific-badlands-43237.herokuapp.com/api/v1/users')
// .then(req => req.json())
// .then(data => data.userData);

// export default fetchUserData;

function getData(dataUrl, dataObjName) {
  const retrievedData = fetch(dataUrl)
  .then(req => req.json())
  .then(data => data[dataObjName])
  .catch(err => console.log('error: ', err));
  return retrievedData;
};

const gotUserData = getData('https://pacific-badlands-43237.herokuapp.com/api/v1/users', 'userData');
const gotSleepData = getData('https://pacific-badlands-43237.herokuapp.com/api/v1/sleep', 'sleepData');
const gotActivityData = getData('https://pacific-badlands-43237.herokuapp.com/api/v1/activity', 'activityData');
const gotHydrationData = getData('https://pacific-badlands-43237.herokuapp.com/api/v1/hydration', 'hydrationData');

// console.log(gotUserData);
// console.log(gotSleepData);
// console.log(gotActivityData);
// console.log(gotHydrationData);

export { gotUserData, gotSleepData, gotActivityData, gotHydrationData };

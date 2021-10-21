const fetchUserData = fetch('https://pacific-badlands-43237.herokuapp.com/api/v1/users')
.then(req => req.json())
.then(data => data.userData);

export default fetchUserData;
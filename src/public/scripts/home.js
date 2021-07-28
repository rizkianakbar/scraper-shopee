


const data = {
    "keyword": "masker",
    "limit": "1"
}
displayData()
function displayData() {
    Http.Post('/api/products/search-items', data)
        .then(response => response.json())
        .then((response) => {
            var data = response.data;
            // Empty the anchor
            var allUsersAnchor = document.getElementById('result');
            allUsersAnchor.innerHTML = '';
            // Append users to anchor
            data.forEach((user) => {
                allUsersAnchor.innerHTML += getUserDisplayEle(user);
            });
        });
}
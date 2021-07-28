document.addEventListener("DOMContentLoaded", function (event) {
    getTypeForDisplayedForm();
});

function onChangeType(event) {
    const select = document.getElementById("fancy-select");
    const value = select.options[select.selectedIndex].value;
    select.blur();
    getTypeForDisplayedForm(value);
}

function getTypeForDisplayedForm(value) {
    //   if (value === 01) {
    //     const inputParams = document.getElementById("inputParams");
    //   }
    const selected = document.getElementById("fancy-select");
    const data = selected.options[selected.selectedIndex].value;

    if (!value) {
        if (data == 01) {
            getProductDetails(data);
        } else {
            console.log("hah");
        }
    } else {
        switch (value) {
            case "01":
                console.log(value);
                getProductDetails(data);
                break;
            case "02":
                console.log(value);
                document.getElementById("label1").innerHTML = "URL";
                getSearchItems(value);
                break;
            case "03":
                console.log(value);
                break;
            case "04":
                console.log(value);
                break;
            default:
                console.log("hah");
                break;
        }
    }
}

function getProductDetails(data) {
    // const inputForm = `
    // <div class="row">
    //     <input type="text" name="fancy-text" />
    //     <label id="label1" for="fancy-text">URL</label>
    // </div>
    // `
    // document.getElementById('getProductDetails').innerHTML += inputForm
    document.getElementById('keyword').style.display = "none";
    document.getElementById('limit').style.display = "none";
    document.getElementById('url').style.display = "block"
}

function getSearchItems(value) {
    // const inputForm = `
    // <div class="row" id="limits">
    //     <input type="text" name="fancy-text" id="limits" />
    //     <label id="label1" for="fancy-text">Name</label>
    // </div>
    // `
    // document.getElementById('getSearchItems').innerHTML += inputForm
    document.getElementById('url').style.display = "none"
    document.getElementById('keyword').style.display = "block"
    document.getElementById('limit').style.display = "block"
}

function onSubmit() {
    const url = document.getElementById("urlInput").value;
    const keyword = document.getElementById("keywordInput").value;
    const limit = document.getElementById("limitInput").value;
    const getProductDetails = {
        "url": url,
    };

    const getSearchItems = {
        "keyword": keyword,
        "limit": limit,
    };

    const select = document.getElementById("fancy-select");
    const type = select.options[select.selectedIndex].value;


    if (type == 01) {
        console.log(type);
        Http.Post("/api/products", getProductDetails)
            .then((response) => response.json())
            .then((response) => {
                console.log(response.item);
                const result = JSON.stringify(response.item, undefined, 2)
                document.getElementById('fancy-textarea').innerHTML = result
            }).catch((err) => {
                console.log(err)
            });
    } else if (type == 02) {
        console.log(type);
        Http.Post("/api/products/search-items", getSearchItems)
            .then((response) => response.json())
            .then((response) => {
                console.log(response.items);
                const result = JSON.stringify(response.items, undefined, 2)
                document.getElementById('fancy-textarea').innerHTML = result
            }).catch((err) => {
                console.log(err)
            });
    }
}

$(document).ready(function () {
    $('#onsubmit').click(function () {
        onSubmit();

    })
    $('#fancy-select').change(function () {
        const select = $('#fancy-select');
        const value = $('#fancy-select').find(":selected").val()
        select.blur();
        getTypeForDisplayedForm(value);
    })
    $('#keyword').hide()
    $('#limit').hide()
    $('#url').show()
});

function getTypeForDisplayedForm(value) {
    if (value) {
        switch (value) {
            case "01":
                $('#keyword').hide()
                $('#limit').hide()
                $('#url').show()
                break;
            case "02":
                $('#keyword').show()
                $('#limit').show()
                $('#url').hide()
                break;
            default:
                console.log("hah");
                break;
        }
    }
}

function onSubmit() {
    const getProductDetails = {
        "url": $('#urlInput').val(),
    };
    const getSearchItems = {
        "keyword": $('#keywordInput').val(),
        "limit": $('#limitInput').val(),
    };

    const type = $('#fancy-select').find(":selected").val()
    if (type == 01) {
        Http.Post("/api/products", getProductDetails)
            .then((response) => response.json())
            .then((response) => {
                const result = JSON.stringify(response.item, undefined, 2)
                $("#fancy-textarea").val(result);
            }).catch((err) => {
                console.log(err)
            });
    } else if (type == 02) {
        Http.Post("/api/products/search-items", getSearchItems)
            .then((response) => response.json())
            .then((response) => {
                const result = JSON.stringify(response.items, undefined, 2)
                $("#fancy-textarea").val(result);
            }).catch((err) => {
                console.log(err)
            });
    }
}

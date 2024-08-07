export const apiGatewayService = {
    getProductsData() {
        return []
    },
    //getProducts() {
    //    return Promise.resolve(
    //        fetch('http://localhost:8004/store/product')
    //            .then(response => response.json())
    //            .then(data => console.log(data.data))
    //            .catch(error => console.error(error))
    //    );
    //},
    async saveProduct(data = {}) {
        // Default options are marked with *
        const response = await fetch('http://localhost:8004/store/product', {
        //const response = await fetch('http://localhost:8004/rabbit/send', {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data), // body data type must match "Content-Type" header
          
        });
        return response.json(); // parses JSON response into native JavaScript objects    
    },
    async updateProduct(id, data = {}) {
        delete data.id
        //delete data.reviews
        //data.reviews='5'
        console.log(JSON.stringify(data))
        // Default options are marked with *
        const response = await fetch('http://localhost:8004/store/product/'+id, {
        //const response = await fetch('http://localhost:8004/rabbit/send', {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data), // body data type must match "Content-Type" header
                     
        });
        return response.json(); // parses JSON response into native JavaScript objects    
    }
}


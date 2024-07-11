export const apiGatewayService = {
    getProductList() {
        return [
          {
            "id": 1,
            "name": "product 1"
          },
          {
            "id": 2,
            "name": "product 2"
          }
        ]
    },
    async save(data = {}, module = '') {

      if(module != ''){
        // Default options are marked with *
          const response = await fetch(`http://localhost:8004/store/${module}`, {
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
      } else {
        console.log ("el nombre del modulo es obligatorio")
      }
    },
    async update(id, data = {}, module = '') {
      console.log(JSON.stringify(data))
      if( module != ''){
        delete data.id
        //delete data.reviews
        //data.reviews='5'
        // Default options are marked with *
        const response = await fetch(`http://localhost:8004/store/${module}/${id}`, {
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
    } else {
      console.log ("el nombre del modulo es obligatorio")
    }
  } 
}


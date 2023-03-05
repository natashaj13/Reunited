
//this file is deletable

export const getDbData = () => {
      let allData = []


      function getData() {
            return new Promise(resolve => {
              resolve(fetch(`http://localhost:9000/testAPI/users/`)
              .then(res => res.text())
              .then(res => res = JSON.parse(res)));
            });
          }
          
      async function asyncCall() {
            const result = await getData();
            allData = result;
            
            console.log('allll', allData)

            return allData;
      }


      return asyncCall();


}

 


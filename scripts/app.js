const userId = 1;
const URL = "https://mytools-server.onrender.com/"

async function getUsers() {
    try {
      const response = await fetch(`${URL}/users`, {
        method: "GET",
      });

      if (response.status === 200) {
        const jsonData = await response.json();
        console.log(jsonData);
        
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error(`Catch: ${error}`);
    }
}

getUsers()
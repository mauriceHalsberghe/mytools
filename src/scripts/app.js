const userId = 1;
const URL = "https://mytools-server.onrender.com"


// const token = localStorage.getItem('token');
//   if (!token) {
//     window.location.href = 'login.html';
//   }











async function getData(slug) {
    try {
      const response = await fetch(`${URL}/${slug}`, {
        method: "GET",
      });

      if (response.status === 200) {
        const jsonData = await response.json();
        return jsonData;
        
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error(`Catch: ${error}`);
    }
}

async function showImages() {
  const $imageHtml = document.querySelector('.images');
  const data = await getData('images');

  data.forEach(image => {    
    const dateObj = new Date(image.image_date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    $imageHtml.innerHTML += `
      <figure>
        <img src='${image.url}' alt='${image.title}'>
        <figcaption>
          <h2>${image.title}</h2>
          <p>${formattedDate}</p>
        </figcaption>
      </figure>
    `;
  });
}


showImages()
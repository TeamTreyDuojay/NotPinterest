//Displays shares/post from sql
  import {
    fetchLoggedInUser,
    getFetchOptions,
    // handleFetch,
    setNav,
  } from './global.js';
  
  const main = async () => {
    const user = await fetchLoggedInUser();
    setNav(!!user);
  
    const response = await fetch('/api/h'); // make a request to your backend server to retrieve the data as soon as the
    const data = await response.json();
    console.log(data);
  
    const imageContainer = document.getElementById('image-container');
    const row = document.createElement('div');
    row.classList.add('row');
    row.style.display = 'flex';
    row.style.flexWrap = 'wrap';
    row.style.justifyContent = 'space-between';

    for (let i = data.length - 1; i >= 0; i--) {// just displays the imags from the backend but backwords
      const img = document.createElement('img');
      img.src = data[i].img_url;

      //console.log(img)



      
      img.style.width = '100%';


      //img sizing 

      
      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
     // overlay.appendChild(overlayContent);

     
     const imageWrapper = document.createElement('div');
     imageWrapper.classList.add('image-wrapper');
     imageWrapper.appendChild(overlay);
     imageWrapper.appendChild(img);

     const contentWrapper = document.createElement('div');
     contentWrapper.classList.add('content-wrapper');
     contentWrapper.appendChild(imageWrapper);

     const column = document.createElement('div');
     column.classList.add('column');
     column.style.width = '30%';
     column.style.marginBottom = '20px';
     column.appendChild(contentWrapper);

     row.appendChild(column);

      img.addEventListener('click', async () => {
        const id = data[i].id;
        const options = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // includes cookies in the request
        };
        const response = await fetch(`/api/h/${id}`, options);
        if (response.ok) {
          console.log(`Image with ID ${id} deleted successfully`);
          img.parentElement.remove();
        } else {
          console.error(`Failed to delete image with ID ${id}`);
        }
      });


      
      imageContainer.appendChild(row);
      //document.querySelector('main').append(img);
    }
  };
  
  main();
  
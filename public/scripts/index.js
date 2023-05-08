
/* eslint-disable import/extensions */
import {
  fetchLoggedInUser,
  handleFetch,
  setNav,
} from './global.js';

const main = async () => {
  const user = await fetchLoggedInUser();
  setNav(!!user);

  const [secret, _err] = await handleFetch('/api/logged-in-secret');
  console.log('secret, _err:', secret, _err);


  const row = document.createElement('div');
  row.classList.add('row');
  row.style.display = 'flex';
  row.style.flexWrap = 'wrap';
  row.style.justifyContent = 'space-between';


  const handlePhotoSubmit = async (imageUrl) => {
    const body = { url: imageUrl };
    console.log(body)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    };
    const response = await fetch('/api/posted-images', options);
  }


  if (secret) {
    console.log(secret)




    const imagesContainer = document.querySelector('#secret-message');
    secret.images.forEach(imageUrl => {
      const img = document.createElement('img');
      img.src = imageUrl;
      img.style.width = '100%'
      //imagesContainer.appendChild(img);

      //save btn
      
      const saveBtn = document.createElement('button');
      saveBtn.classList.add('save');
      saveBtn.textContent = 'Like';

      //TWITTER BUTTON
      // const twitterBtn = document.createElement('button');//Create button to redirect user to their twitter to post image or redirect them to the image
      // twitterBtn.classList.add('spheric-button');
      // twitterBtn.textContent = imageUrl
      // 'twitter.com';

      //DOWNLOAD THE IMAGE 
      // const downloadBtn = document.createElement('button');
      // downloadBtn.classList.add('round-button');
      // const downloadIcon = document.createElement('img');
      // downloadIcon.src = 'https://cdn-icons-png.flaticon.com/512/3580/3580382.png';
      // downloadBtn.appendChild(downloadIcon);

      const shareBtn = document.createElement('button');
      shareBtn.classList.add('round-button');
      const shareIcon = document.createElement('img');
      shareIcon.src = 'https://cdn-icons-png.flaticon.com/512/512/512142.png';
      shareBtn.appendChild(shareIcon);

      shareBtn.addEventListener('click', () => {
                    //console.log(imageUrl)
                    handlePhotoSubmit(imageUrl);
                   // shareBtn.appendChild(shareIcon);
                  });

      const buttonGroup = document.createElement('div');//places button in its own div
       //buttonGroup.appendChild(twitterBtn)//not yet using 
      // buttonGroup.appendChild(downloadBtn);
      buttonGroup.appendChild(shareBtn);

      const overlayContent = document.createElement('div');//button over appears over the images
      overlayContent.appendChild(saveBtn);
      overlayContent.appendChild(buttonGroup);

      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      overlay.appendChild(overlayContent);

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

    });
    imagesContainer.appendChild(row);
  }
;
};

main();



//Change navbar color on scroll past hero

const myNav = document.querySelector(".navbar");

window.onscroll = function () {
  if (window.scrollY > window.innerHeight) {
    myNav.classList.add("scrolled");
  } else {
    myNav.classList.remove("scrolled");
  }
};
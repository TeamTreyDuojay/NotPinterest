
const handleFetch = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const { status, statusText, ok } = response;
    if (!ok) return [null, { status, statusText }];

    const content = (status === 204) || await response.json();
    return [content, null];
  } catch (error) {
    return [null, error];
  }
};

const getFetchOptions = (body, method = 'POST') => ({
  method,
  credentials: 'include', // IMPORTANT, this tells fetch to include cookies
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

// CREATE USER
const signupAndLoginHandler = async (url, form) => {
  const formData = new FormData(form);
  const options = getFetchOptions(Object.fromEntries(formData.entries()));
  const [_response, err] = await handleFetch(url, options);
  if (err) {
    form.reset();
    return alert('Something went wrong');
  }
  window.location.assign('/user.html');
};

// READ USER
const fetchLoggedInUser = async () => {
  const [response, _err] = await handleFetch('/api/me', { credentials: 'include' });
  return response;
};

// UPDATE USER
const updateUsernameHandler = async (form) => {
  const formData = new FormData(form);
  const username = formData.get('username');
  if (!username) return alert('Username is required');

  const url = `/api/users/${form.dataset.userId}`;
  const options = getFetchOptions({ username }, 'PATCH');

  const [response, err] = await handleFetch(url, options);
  return [response, err];
};

// DELETE USER
const logOutHandler = async () => {
  const [_response, err] = await handleFetch('/api/users/logout', { method: 'DELETE' });
  if (err) return alert('Something went wrong');
  window.location.assign('/');
};

// Nav Helper
const setNav = (hasLoggedInUser) => {
  const loggedOutNavHtml = `
  
    <li><a class ="signUpLink" href="HomeLogOut.html">Home</a></li>
    <li><a class = "remove" href="./create.html">Sign Up</a></li>
    <li><a <a class = "remove" href="./login.html">Login</a></li>
  `;

  // <li><a href="./posted-images.html">Post</a></li>
  // <li><a href="./notSignIn.html">Sear</a></li>
  //   <li><a href="./h.html"></a></li>
  // <li><a href="./create.html">Sign Up</a></li>
  //   <li><a href="./login.html">Login</a></li>

  const loggedInNavHtml = `
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="./posted-images.html">Search Images</a></li>
    <li><a href="./shares.html">My Shares</a></li>
    <li><a href="./user.html">Profile</a></li>
    <li><a href="./likes.html">Likes</a></li> 
  </ul>`;
                        //add likes
  const navHtml = hasLoggedInUser ? loggedInNavHtml : loggedOutNavHtml;
  document.querySelector('nav').innerHTML = navHtml;
};

export {
  handleFetch,
  getFetchOptions,
  fetchLoggedInUser,
  signupAndLoginHandler,
  setNav,
  logOutHandler,
  updateUsernameHandler,
};

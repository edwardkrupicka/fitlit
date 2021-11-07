const errorMessage = document.querySelector('#errorMessage');
const errorModal = document.querySelector('#errorModal');
const errorButton = document.querySelector('#errorButton');

const hideErrorModal = () => {
  errorModal.classList.add('hidden');
}

const connectionErr = (err, customMessage) => {
  errorMessage.innerText = customMessage || err.message;
  errorModal.classList.remove('hidden');
}

const checkStatus = (res, customMessage) => {
  if (!res.ok) {
    throw new Error(customMessage);
  } 
}

errorButton.addEventListener("click", hideErrorModal);

export {connectionErr, checkStatus};
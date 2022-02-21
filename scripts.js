const body = document.querySelector('.wrapper');
const workLinks = document.querySelectorAll('.work-link');
const works = document.querySelectorAll('.work');
const modal = document.querySelector('.modal');
const modalBody = document.querySelector('.modal-body');
const modalBack = document.querySelector('.modal-back');
const modalClose = document.querySelector('.modal-close');
const showModal = () => {
	modal.classList.add('is-visible');
	body.classList.add('show-modal');
	modalBody.scrollTop = 0;
};
const hideModal = () => {
	modal.classList.remove('is-visible');
	body.classList.remove('show-modal');
	works.forEach((work) => {
		work.classList.remove('is-visible');
	});
};
modalClose.addEventListener('click', () => {
	hideModal();
});
modalBack.addEventListener('click', () => {
	hideModal();
});

/***************************************************
Works
***************************************************/
workLinks.forEach((workLink) => {
	workLink.addEventListener('click', () => {
		event.preventDefault();

		// Show the corresponding section
		const work = document.querySelector(workLink.getAttribute('href'));
		work.classList.add('is-visible');
		showModal();
	});
});
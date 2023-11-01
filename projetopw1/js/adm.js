let userinp = document.querySelector('#username');
let senhainp = document.querySelector('#password');
const form = document.querySelector('.formadm');

form.addEventListener('submit', async e => {

e.preventDefault();

const data = await fetch('adm.php', {

method: 'POST',

body: new FormData(form)

}).then(res => res.json());

console.log(data);

});

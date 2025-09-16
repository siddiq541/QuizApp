const StartQuiz=(event) =>{
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    if (username==''){
        input.classList.add('ring-2', 'ring-red-500');

    }else{
        //next screen
        document.getElementById('startScreen').classList.add('hidden');
    }
};
const input = document.getElementById('username');
input.addEventListener('input', () => {
  input.classList.remove('ring-2', 'ring-red-[#ef3a3a]');
});
document.getElementById('startBtn').addEventListener('click', StartQuiz);
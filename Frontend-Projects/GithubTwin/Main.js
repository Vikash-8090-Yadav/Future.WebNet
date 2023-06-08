async function getFollowers() {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let newKeyArray = [];
let MixString1 = ["8bb0d", "f341b6", "789774", "60a28", "846541e"];
let MixString= ["6pcms","AXA1yJ","B7WMt","bmrdK","qz5qp9","1x6i_","phg"]

const obfuscatedKey = newKeyArray.join('');
    
    let sectOne = "19";
    let secTwo = "bUHTk0h";
    let sec = secTwo.split("").reverse().join("");
    stepOne = MixString.join("").split("").reverse().join("");
    stepTwo = stepOne.split(sectOne);
    
    stepThree = stepTwo [0] + stepTwo [1];
    mix = stepThree + sec;
    
    document.querySelector('.container1').style.display = 'flex';
    const username = document.getElementById('username').value;
    const headers = {
    
        'Authorization':`token ${mix}`,

        'Accept': 'application/vnd.github+json'
    };
    fetch(`https://api.github.com/users/${username}`, { headers })
        .then(response => response.json())
        .then(username => {		
       const avatarUrl = username['avatar_url'];
       const myAvatar = document.getElementById('myAvatar');
       const myUsername = document.getElementById('myUsername');
       myAvatar.src =avatarUrl;
       myUsername.textContent = username['login'];
       console.log(avatarUrl)

})
        .catch(error => console.error(error));


    fetch(`https://api.github.com/users/${username}/followers`, { headers })
        .then(response => response.json())
        .then(followers => {
            const followerAvatar = document.getElementById('followerAvatar');
            const followerUsername = document.getElementById('followerUsername');
            
            if (followers.length > 0) {
                // Pick a random follower
                const index = Math.floor(Math.random() * followers.length);
                
                const follower = followers[index];
               
                followerAvatar.src = follower['avatar_url'];
                followerUsername.textContent = follower.login;
            }
            else {
               /*  const popup = document.createElement('div');
                popup.classList.add('popup');
                popup.textContent = 'Enter a valid username';
                 document.body.appendChild(popup);
                 setTimeout(() => {
                     popup.remove();
                 }, 3000);
                 */
            }
        })
        .catch(error => console.error(error));
}

const key='63544dc8592c70dc5f25af7d3fc0389f';

//const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=Mathura&appid=63544dc8592c70dc5f25af7d3fc0389f';

/*fetch(baseURL)
    .then((data) => {console.log('response',data.json())})
    .catch((error) => {
        console.log(error);
    });
*/ 

const requestCity = async (city)=>{
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
    const query = '?q='+city+'&appid='+key;  
  //    const query ='?q=${city}appid=$key';

    //make fetch call =>promise call
    const response = await fetch(baseURL+query);

    // promise data
    const data = await response.json();
    return data;
}



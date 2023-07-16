import CardImage from './CardImage';

const imgUrl = 'https://image.tmdb.org/t/p/original/'

export default function Row({ title, arr = [] }) {
    return (
        <div className='row'>
            <h2>{title}</h2>
            <div>
                {
                arr.map((item, i) => (
                <CardImage key={i} img={`${imgUrl}/${item.poster_path}`} />
                ))
                }
            </div>
        </div>
    );
}
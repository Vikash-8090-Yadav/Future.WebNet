import "./BlogCard.css";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ text, title, ownerOf, externalUrl }) => {
  
  const length = 100;
  const trimmedString = text.length > 100 ? 
    text.substring(0, length) : 
    text;

  const account = `${ownerOf.slice(0, 4)}...${ownerOf.slice(38)}`;

  const navigate = useNavigate();

  const clickHandler = () => {
    const lastSegment = externalUrl.split("/").pop();
    navigate(`/blog/${lastSegment}`);
  };

  return (
    <div className="blog" onClick={clickHandler}>
      <div className="blog_leftSide">
      <div className="blogger">
          <span className="blogger_name">{account}</span>
          <span className="blogger_date">Mar 21</span>
      </div>
      <div className="blog_title">
          <h3>{title}</h3>
      </div>
      <div className="blog_content">
          <p>{trimmedString}...</p>
      </div>
      </div>
      <div className="blog_rightSide">
        <div>
          <img
            className="blog_image"
            src="https://ipfs.moralis.io:2053/ipfs/QmWEsG4ayh75BMk2H1CowAdALPjsi3fD7CSZ6qxNM1yNnz/image/moralis.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  Button
} from "@mui/material";
import ApiButton from "./ApiButton.jsx";
import { FaShareAlt } from "react-icons/fa/index.js";
import { convertToCr } from "../utils/HelperMethods.js";
import { useNavigate } from "react-router-dom";
import { GET } from "../utils/Const.js";
import Tooltip from '@mui/material/Tooltip/Tooltip.js';
import { generatePropertyUrl } from "../utils/propertyUtils.js";

export default function HomeCard({
  element,
  onClickApi,
  onClickNavigate,
  classname,
  apiType = GET,
  disableOnClickNavigate = false,
}) {
  const navigateTo = useNavigate();
  const cardDetailUrl = generatePropertyUrl(element);
  const handleShareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share !== undefined) {
      navigator.share({
        title: "WebShare",
        url: cardDetailUrl,
      });
    }
  };
  return (
    <Card
      className={`home-card ${classname}`}
    // sx={{
    //   maxWidth: "345px",
    //   width: "auto",
    //   minHeight: "auto",
    //   marginTop: "0px",
    // }}
    >
      <CardActionArea className="hc_action">
        <CardMedia
          component="img"
          height="100"
          image={Array.isArray(element.thumbnails) ? element.thumbnails[0] : element.thumbnails}
          // image = "https://builderfloors.s3.ap-south-1.amazonaws.com/upload/photos/A329ASL1/1st%20Floor/NORMAL/THUMBNAIL.jpg"
          alt={element.title}
          className="thumbnail"
          onClick={() => {
            if (!disableOnClickNavigate) {
              window.open(cardDetailUrl, "_blank");
              // navigateTo(
              //   `${onClickNavigate}?title=${element.title?.replaceAll(
              //     " ",
              //     "-"
              //   )}&id=${element._id}`
              // );
            }
          }}
        />
        {/* <CardMedia
          // image = "https://builderfloors.s3.ap-south-1.amazonaws.com/upload/photos/A329ASL1/1st%20Floor/NORMAL/THUMBNAIL.jpg"
          component="img"
          image={
            "https://www.builderfloor.com/assets/imgs/icons/360-degrees.png"
          }
          className="360-image-icon"
          alt={"360-image-icon"}
        /> */}
        <CardContent className="home_card_content">
          <a href={!disableOnClickNavigate ? cardDetailUrl : null} className="property_link" target="_blank">
            <Typography gutterBottom variant="h6" component="div" className="title">
              {element?.title}
            </Typography>
          </a>
          <Typography variant="body2" color="text.primary" className="location">
            {element?.sectorNumber}
          </Typography>
          <div className="details_list">
            <div className="list_item">
              <img
                src="/icons/home.svg"
                alt="img"
                className="homecardicon"
                height="20px"
                width="20px"
              />
              <Typography variant="body2" className="homecardtext" color="text.secondary">
                {element?.accommodation}
              </Typography>
            </div>
            <div className="list_item">
              <img
                src="https://builder-floor-flax.vercel.app/assets/imgs/page/homepage5/floor.svg"
                alt="img"
                className="homecardicon"
                height="20px"
                width="20px"
              />
              <Typography variant="body2" color="text.secondary">{element?.floor}</Typography>
            </div>
            <div className="list_item">
              <img
                src="/icons/area-svg.svg"
                alt="img"
                className="homecardicon"
                height="20px"
                width="20px"
              />
              <Typography variant="body2" color="text.secondary">{element?.size}Sq.Yd.</Typography>
            </div>
          </div>
        </CardContent>

        <div className="ratings_and_price">
          <Tooltip title="Share" arrow classes="tooltip">
            <Button variant="outlined" onClick={e => handleShareClick(e)} className="btn sc_btn sc_share_btn hc_share_btn">
              <FaShareAlt size={"23px"} className="share_icon" />
            </Button>
          </Tooltip>
          <Rating
            name="home-card-fixed-rating"
            value={element?.raiting || 5}
            precision={1}
            readOnly
          />
          <ApiButton
            component={{
              apiType: apiType,
              api: onClickApi,
              buttonLabel: `₹ ${convertToCr(element?.price)} Cr.`,
              btnClass: `btn price_btn`,
              // navigate: (!disableOnClickNavigate && `/${element?.title?.replaceAll(
              //   " ",
              //   "-"
              // )}/${element._id}`),
            }}
            queryParams={{ id: element?._id }}
          />
        </div>
      </CardActionArea>
    </Card>
  );
}

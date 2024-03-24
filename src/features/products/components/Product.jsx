import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function Product({ _id, main_image, name, price, description,deleteProduct }) {
  const trimmedDescription = description.length > 100 ? `${description.slice(0, 100)}...` : description;

  return (
    <Card sx={{ maxWidth: 300, minWidth: 300}}>
      <img src={main_image} width={"100%"}height={'200px'} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {trimmedDescription}
        </Typography>
        <Typography mt={2} variant="body2" color="text.secondary">
        قیمت : {price}  تومان
        </Typography>
      </CardContent>
      <CardActions sx={{ gap: 2 }}>
      <button
        variant="outlined"
        size="small"
        onClick={() => deleteProduct(_id)}
        style={{ backgroundColor: '#ff5252', color: 'white',border:'none',padding:'2px 10px',borderRadius:'5px' }}
      >
        حذف
      </button>
      <button
        variant="contained"
        size="small"
        style={{ backgroundColor: '#64b5f6', color: 'white',border:'none',padding:'2px 10px',borderRadius:'5px' }}
      >
        ویرایش
      </button>
      <Link to={`/products/${_id}`}>
        <button
          variant="outlined"
          size="small"
          style={{ backgroundColor: '#66bb6a', color: 'white',border:'none',padding:'2px 10px',borderRadius:'5px' }}
        >
          مشاهده
        </button>
      </Link>
      </CardActions>
    </Card>
    
  );
}

export default Product;

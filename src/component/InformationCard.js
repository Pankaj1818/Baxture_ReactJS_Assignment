import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import { Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import Avatar from '@mui/material/Avatar';
import classes from "./InformationCard.module.css";

const InformationCard = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFollow = id => {
    console.log(id)

  }

  const deleteById = id => {
    setData(oldValues => {
      return oldValues.filter(data => data.id !== id)
    })
  }

  return (
    data.map((info) =>
      <Box className={classes.box}>
        <Stack className={classes.mainBox}
        spacing={1}
          sx={{
            width: { md: "320px", xs: "87%", sm: "40%" },
           
          }}
        >
          <Card key={info.id} sx={{ maxWidth: 305 }}>

            <CardContent>
              <Box className={classes.cardContentBox} >
                <Avatar sx={{ bgcolor: "purple", width: 104, height: 104, fontSize: "50px" }} >{info.logoName}</Avatar>
              </Box>
              <Typography gutterBottom variant="h6" component="div" className={classes.name} >
                {info.name}
              </Typography>

              <Box className={classes.info}>
                <Stack spacing={1} >
                  <Typography className={classes.info} gutterBottom variant="h7">
                    <AlternateEmailIcon fontSize="small" />
                    {info.email}
                  </Typography>
                  <Typography className={classes.info} gutterBottom variant="h7">
                    <PhoneInTalkOutlinedIcon fontSize="small" />
                    {info.phone}
                  </Typography>
                  <Typography className={classes.info} gutterBottom variant="h7">
                    <LanguageOutlinedIcon fontSize="small" />
                    {info.website}
                  </Typography>
                </Stack>
              </Box>

              <Box className={classes.buttonBox}>
                <Stack spacing={2} direction="row">
                  <Button id={info.id} variant="contained" onClick={() => handleFollow(info.id)} startIcon={<PersonAddAltOutlinedIcon />} >Follow</Button>
                  <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => deleteById(info.id)}>Delete</Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    )

  );
};

export default InformationCard;

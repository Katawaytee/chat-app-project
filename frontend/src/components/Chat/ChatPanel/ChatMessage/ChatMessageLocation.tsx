import React, { useEffect, useState } from "react";
import MyMap from "../../../MyMap";
import { Box, Modal } from "@mui/material";

export default function ChatMessageLocation({latitude,longitude,}: {latitude: number;longitude: number}) {
  
  const [open, setOpen] = useState<boolean>(false);

  const [tempState, setTempState] = useState<boolean>(false);

  useEffect(() => {
    setTempState(false);
    setTimeout(() => {
      setTempState(true);
    }, 200);
  }, []);

  return (
    
    <>
      
      <div onClick={() => setOpen(true)} className="w-72 aspect-video">
        {
          <MyMap
            key={tempState ? 0 : new Date().toTimeString()}
            lat={latitude}
            lng={longitude}
          />
        }
      </div>
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className="flex justify-center items-center w-full h-full"
      >
        <Box className="flex justify-center items-center w-3/4 aspect-video">
          <MyMap lat={latitude} lng={longitude} />
        </Box>
      </Modal>

    </>

  )

}

"use client";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { Box, Button, ButtonGroup, Dialog, Tooltip } from "@mui/material";
import {
  GridRenderCellParams,
  GridRenderEditCellParams,
} from "@mui/x-data-grid";
import { CldImage, CldUploadWidget, CldVideoPlayer } from "next-cloudinary";
import React, { useState } from "react";

export function RenderCellForMediaSelect({
  cellParams,
  mediaType,
}: {
  cellParams: GridRenderCellParams | GridRenderEditCellParams;
  mediaType: "image" | "video";
}) {
  const { isEditable, value, api, id, colDef } = cellParams;
  const [isViewrOpened, setOpenViewer] = useState(false);

  const handleOpenViewer = () => {
    value && setOpenViewer(true);
  };
  const handleCloseViewer = () => {
    setOpenViewer(false);
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
      >
        <Box>{value && <CldImage alt="cell-image" src={value} />}</Box>
        <ButtonGroup variant="text">
          <Tooltip title="View">
            <Button color="info" onClick={handleOpenViewer}>
              <InfoIcon />
            </Button>
          </Tooltip>
          {isEditable && (
            <CldUploadWidget
              uploadPreset="avatarUploadPreview"
              options={{
                publicId: id.toString(),
                tags: ["Image", "User avatar"],
                clientAllowedFormats: [mediaType],
                maxFiles: 1,
              }}
              onSuccess={(result) => {
                const { info, event } = result;
                if (event === "success") {
                  let infoConverted: any = info;
                  api.setEditCellValue({
                    id,
                    field: colDef.field,
                    value: infoConverted.secure_url,
                  });
                }
              }}
            >
              {({ open }) => (
                <Tooltip title="Edit">
                  <Button color="warning" onClick={() => open()}>
                    <EditIcon />
                  </Button>
                </Tooltip>
              )}
            </CldUploadWidget>
          )}
        </ButtonGroup>
      </Box>
      <Dialog open={isViewrOpened} onClose={handleCloseViewer}>
        {mediaType === "image" ? (
          <CldImage alt="image-previewer" src={value} />
        ) : (
          <CldVideoPlayer src={value} width={"50vw"} height={"70vw"} />
        )}
      </Dialog>
    </>
  );
}

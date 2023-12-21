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
  const { isEditable, value, api, id, colDef, cellMode } = cellParams;
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
        <Box>
          {value && (
            <CldImage
              alt="cell-image"
              width={1000}
              height={1000}
              style={{ width: "auto", height: "36px" }}
              src={value}
            />
          )}
        </Box>
        <ButtonGroup variant="text">
          <Tooltip title="View">
            <Button color="info" onClick={handleOpenViewer}>
              <InfoIcon />
            </Button>
          </Tooltip>
          {isEditable && (
            <CldUploadWidget
              signatureEndpoint={"/api/cloudinary/sign-params"}
              options={{
                folder: "users/avatars",
                showAdvancedOptions: false,
                cropping: true,
                publicId: id.toString(),
                tags: ["Image", "User avatar"],
                clientAllowedFormats: [mediaType],
                maxFiles: 1,
                multiple: false,
                styles: {
                  palette: {
                    window: "#F5F5F5",
                    sourceBg: "#FFFFFF",
                    windowBorder: "#90a0b3",
                    tabIcon: "#0094c7",
                    inactiveTabIcon: "#69778A",
                    menuIcons: "#0094C7",
                    link: "#53ad9d",
                    action: "#8F5DA5",
                    inProgress: "#0194c7",
                    complete: "#53ad9d",
                    error: "#c43737",
                    textDark: "#000000",
                    textLight: "#FFFFFF",
                  },
                  fonts: {
                    default: null,
                    "'Kalam', cursive": {
                      url: "https://fonts.googleapis.com/css?family=Kalam",
                      active: true,
                    },
                  },
                },
                showPoweredBy: false,
              }}
              onSuccess={(result) => {
                const info: any = result.info;
                if (info) {
                  api.setEditCellValue({
                    id,
                    field: colDef.field,
                    value: info.secure_url,
                  });
                }
                if (cellMode === "edit") {
                  api.stopRowEditMode({ id, field: colDef.field });
                }
              }}
            >
              {({ open }) => (
                <Tooltip title="Edit">
                  <Button
                    color="warning"
                    onClick={() => {
                      if (cellMode === "view") {
                        api.startRowEditMode({
                          id,
                          fieldToFocus: colDef.field,
                        });
                      }
                      open();
                    }}
                  >
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
          <CldImage
            alt="image-previewer"
            src={value}
            width={1000}
            height={1000}
            style={{ width: "auto", height: "auto" }}
          />
        ) : (
          <CldVideoPlayer src={value} width={"50vw"} height={"70vw"} />
        )}
      </Dialog>
    </>
  );
}

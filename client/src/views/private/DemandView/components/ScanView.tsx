import React, { useEffect } from "react";
// Import the main component
import { Viewer, Worker } from "@react-pdf-viewer/core";
// thêm pubgin
import {
  defaultLayoutPlugin,
  ThumbnailIcon,
} from "@react-pdf-viewer/default-layout";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";
import { RotateDirection } from "@react-pdf-viewer/core";
import type { RenderThumbnailItemProps } from "@react-pdf-viewer/thumbnail";

import { Box, Flex } from "@chakra-ui/layout";
import pdftesst from "../../../../assets/images/DAY-LA-FILE-MAU-PDF.pdf";
// them thu viện css
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/thumbnail/lib/styles/index.css";
import "./customStyle.css";
import { RotateLeftIcon, RotateRightIcon } from "~/components/common/Icons";
import { IconButton } from "@chakra-ui/react";

const renderThumbnailItem = (props: RenderThumbnailItemProps) => (
  <div key={props.key}>
    <div style={{ marginBottom: "0.5rem" }} onClick={props.onJumpToPage}>
      {props.renderPageThumbnail}
    </div>
    <Flex alignItems="center" justifyContent="space-between">
      <IconButton
        size={"md"}
        onClick={() => props.onRotatePage(RotateDirection.Forward)}
        icon={<RotateLeftIcon size={7} color="black" />}
        aria-label="rotate"
        bgColor={"none"}
        _hover={{ bgColor: "gray.400" }}
      />
      <IconButton
        size={"md"}
        onClick={() => props.onRotatePage(RotateDirection.Backward)}
        icon={<RotateRightIcon size={7} color="black" />}
        aria-label="rotate"
        bgColor={"none"}
        _hover={{ bgColor: "gray.400" }}
      />
    </Flex>
  </div>
);

const ScanView = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) =>
      [
        {
          content: <Thumbnails renderThumbnailItem={renderThumbnailItem} />,
          icon: <ThumbnailIcon />,
          title: "Thumbnails",
        },
      ].concat(defaultTabs.slice(1)),
  });
  const { toggleTab } = defaultLayoutPluginInstance;

  const thumbnailPluginInstance =
    defaultLayoutPluginInstance.thumbnailPluginInstance;

  const { Thumbnails } = thumbnailPluginInstance;
  // Đặt mức zoom mặc định là 130% khi component mount
  useEffect(() => {
    toggleTab(0);
  }, []);
  return (
    <Box h="full" w="full" rounded="md">
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
      >
        <Viewer fileUrl={pdftesst} plugins={[defaultLayoutPluginInstance]} />;
      </Worker>
    </Box>
  );
};

export default ScanView;

import React, { useEffect, useRef, useState } from "react";
// Import the main component
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import { PDFDocument } from "pdf-lib";
// thêm pubgin
import { RotateDirection } from "@react-pdf-viewer/core";
import type { RenderThumbnailItemProps } from "@react-pdf-viewer/thumbnail";

import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";

import { Box, Flex, Text } from "@chakra-ui/layout";
import pdftesst from "../../../../assets/images/DAY-LA-FILE-MAU-PDF.pdf";
// them thu viện css
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/thumbnail/lib/styles/index.css";
import {
  PlusCircleIcon,
  RotateLeftIcon,
  RotateRightIcon,
  TrashIcon,
} from "~/components/common/Icons";
import { IconButton, Input } from "@chakra-ui/react";

const renderThumbnailItem = (
  props: RenderThumbnailItemProps,
  deletePage: any,
  insertPage: any,
  fileInputRef: any,
  handleClick: any
) => {
  return (
    <Flex key={props.key} flexDir={"column"} alignItems={"start"}>
      <Flex>
        <Flex alignItems="center" justifyContent="center" flexDir="column">
          <IconButton
            size={"md"}
            icon={<RotateLeftIcon size={7} color="black" />}
            aria-label="rotate"
            bgColor={"none"}
            _hover={{ bgColor: "gray.400" }}
          />
          <IconButton
            size={"md"}
            icon={<RotateRightIcon size={7} color="black" />}
            aria-label="rotate"
            bgColor={"none"}
            _hover={{ bgColor: "gray.400" }}
          />
        </Flex>
        <Box
          style={{ marginBottom: "0.5rem" }}
          onClick={props.onJumpToPage}
          border={`${
            props.currentPage === props.pageIndex && "4px solid gray"
          }`}
        >
          {props.renderPageThumbnail}
        </Box>
        <Flex alignItems="center" justifyContent="center" flexDir="column">
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
      </Flex>
      <Flex justifyContent={"center"} alignItems="center" w="100%">
        <Box>
          <IconButton
            size={"md"}
            icon={<PlusCircleIcon size={7} color="black" />}
            aria-label="rotate"
            bgColor={"none"}
            _hover={{ bgColor: "gray.200" }}
            onClick={() => handleClick(props.pageIndex)}
          />
          <Input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => insertPage(e)}
          />
        </Box>
        <Text fontSize={"md"}>{props.renderPageLabel}</Text>
        <IconButton
          size={"md"}
          icon={<TrashIcon size={7} color="black" strokeWidth={1} />}
          aria-label="rotate"
          bgColor={"none"}
          _hover={{ bgColor: "gray.200" }}
          onClick={() => {
            deletePage(props.pageIndex);
          }}
        />
      </Flex>
    </Flex>
  );
};

const ScanView = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pdfFile, setPdfFile] = useState(pdftesst);
  const [pageIndex, setPageIndex] = useState<null | number>(null);
  const thumbnailPluginInstance = thumbnailPlugin();

  const insertPage = async (e: any) => {
    if (fileInputRef.current) {
      const file = e.target.files?.[0];

      if (!file) {
        console.error("No file selected");
        return;
      }

      try {
        const fileData = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(
          await fetch(pdfFile).then((res) => res.arrayBuffer())
        );
        const insertDoc = await PDFDocument.load(fileData);

        const [insertedPage] = await pdfDoc.copyPages(insertDoc, [0]); // Sao chép trang đầu tiên của tệp chèn
        pdfDoc.insertPage(pageIndex as number, insertedPage);

        const pdfBytes = await pdfDoc.save();
        console.log(pdfBytes);

        const updatedPdfBlob = new Blob([pdfBytes], {
          type: "application/pdf",
        });
        const updatedPdfUrl = URL.createObjectURL(updatedPdfBlob);

        // Assuming setPdfFile is a state update function within a React component
        setPdfFile(updatedPdfUrl);
      } catch (error) {
        console.error("Error fetching or loading PDFs:", error);
      }
    } else {
      console.error("fileInputRef.current is null");
    }
  };
  const handleClick = (pageIndex: number) => {
    if (fileInputRef.current) {
      setPageIndex(pageIndex + 1);
      fileInputRef.current.click();
    } else {
      console.error("fileInputRef.current is null");
    }
  };
  // Hàm để xóa trang
  const deletePage = async (pageIndex: any) => {
    if (!pdfFile) return;
    const pdfDoc = await PDFDocument.load(
      await fetch(pdfFile).then((res) => res.arrayBuffer())
    );
    pdfDoc.removePage(pageIndex); // Xóa trang theo chỉ mục

    const pdfBytes = await pdfDoc.save();
    const updatedPdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const updatedPdfUrl = URL.createObjectURL(updatedPdfBlob);

    setPdfFile(updatedPdfUrl);
  };
  const { Thumbnails } = thumbnailPluginInstance;
  // Đặt mức zoom mặc định là 130% khi component mount
  return (
    <Flex h="full" w="full" rounded="md">
      <Box style={{ width: "30%", borderRight: "1px solid #ccc" }}>
        <Thumbnails
          renderThumbnailItem={(props) =>
            renderThumbnailItem(
              props,
              deletePage,
              insertPage,
              fileInputRef,
              handleClick
            )
          }
        />
      </Box>
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
      >
        <Viewer
          fileUrl={pdfFile}
          plugins={[thumbnailPluginInstance]}
          defaultScale={SpecialZoomLevel.PageFit}
        />
        ;
      </Worker>
    </Flex>
  );
};

export default ScanView;

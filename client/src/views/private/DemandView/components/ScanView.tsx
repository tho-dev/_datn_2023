import { useEffect, useRef, useState } from "react";
// Import the main component
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import { PDFDocument } from "pdf-lib";
// thêm pubgin
import { RotateDirection } from "@react-pdf-viewer/core";
import type { RenderThumbnailItemProps } from "@react-pdf-viewer/thumbnail";

import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";
import { RenderRotatePageProps, rotatePlugin } from "@react-pdf-viewer/rotate";
import {
  RenderCurrentScaleProps,
  RenderZoomInProps,
  zoomPlugin,
} from "@react-pdf-viewer/zoom";
import { RenderZoomOutProps } from "@react-pdf-viewer/zoom";

import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button, Tooltip, useToast } from "@chakra-ui/react";

import pdftesst from "../../../../assets/images/DAY-LA-FILE-MAU-PDF.pdf";
// them thu viện css
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/thumbnail/lib/styles/index.css";
import "./customStyle.css";

import {
  ArrowDownIcon,
  ArrowUpAdminIcon,
  PlusFileIcon,
  RotateLeftIcon,
  RotateRightIcon,
  TrashIcon,
  ZoomOutIcon,
  ZoomInIcon,
  SaveFileIcon,
  ScanIcon,
} from "~/components/common/Icons";
import { IconButton, Input, Link } from "@chakra-ui/react";

const renderThumbnailItem = (
  props: RenderThumbnailItemProps,
  setPageIndex: any
) => {
  return (
    <Flex key={props.key} gap="4" alignItems={"center"} w="100%">
      <Flex
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        border={`${props.currentPage === props.pageIndex && "4px solid gray"}`}
        mb="1"
        w="full"
        cursor={"pointer"}
        rounded={"md"}
      >
        <Box
          onClick={() => {
            props.onJumpToPage();
            setPageIndex(props.pageIndex);
          }}
        >
          {props.renderPageThumbnail}
        </Box>
        <Text fontSize={"md"}>Page {props.renderPageLabel}</Text>
      </Flex>
    </Flex>
  );
};
type Props = {
  dataPdf: any;
  handleScan: any;
};
const ScanView = ({ dataPdf, handleScan }: Props) => {
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pdfFile, setPdfFile] = useState<any>();
  const [pageIndex, setPageIndex] = useState<null | number>(0);

  const thumbnailPluginInstance = thumbnailPlugin();
  const rotatePluginInstance = rotatePlugin();
  const zoomPluginInstance = zoomPlugin();
  const { RotatePage } = rotatePluginInstance;
  const { CurrentScale, ZoomIn, ZoomOut } = zoomPluginInstance;

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
  const handleOpenInsertFile = () => {
    if (fileInputRef.current && pageIndex) {
      setPageIndex(pageIndex + 1);
      fileInputRef.current.click();
    } else {
      console.error("fileInputRef.current is null");
    }
  };
  // Hàm để xóa trang
  const deletePage = async () => {
    if (!pdfFile) return;
    if (pageIndex === null) return;
    const pdfDoc = await PDFDocument.load(
      await fetch(pdfFile).then((res) => res.arrayBuffer())
    );
    pdfDoc.removePage(pageIndex); // Xóa trang theo chỉ mục

    const pdfBytes = await pdfDoc.save();
    const updatedPdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const updatedPdfUrl = URL.createObjectURL(updatedPdfBlob);

    setPdfFile(updatedPdfUrl);
  };

  const movePage = async (direction: string) => {
    if (!pdfFile) return;
    if (pageIndex === null) return;

    const pdfDoc = await PDFDocument.load(
      await fetch(pdfFile).then((res) => res.arrayBuffer())
    );
    const totalPages = pdfDoc.getPageCount();
    // Tính toán vị trí mới
    let newIndex;

    if (direction === "up" && pageIndex > 0) {
      newIndex = pageIndex - 1;
    } else if (direction === "down" && pageIndex < totalPages - 1) {
      newIndex = pageIndex + 1;
    } else {
      toast({
        title: "Thất bại",
        duration: 1600,
        position: "top-right",
        status: "error",
        description: "Không thể di chuyển trang theo hướng đã cho",
      });
      return;
    }
    // Sao chép trang cần di chuyển
    const [movedPage] = await pdfDoc.copyPages(pdfDoc, [pageIndex]);
    // Xóa trang cũ
    pdfDoc.removePage(pageIndex);

    // Chèn trang vào vị trí mới
    pdfDoc.insertPage(newIndex, movedPage);

    // Lưu lại PDF
    const pdfBytes = await pdfDoc.save();
    const updatedPdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const updatedPdfUrl = URL.createObjectURL(updatedPdfBlob);

    // Cập nhật trạng thái PDF và chỉ số trang
    setPdfFile(updatedPdfUrl);
    setPageIndex(newIndex);
  };
  const { Thumbnails } = thumbnailPluginInstance;
  // Đặt mức zoom mặc định là 130% khi component mount
  useEffect(() => {
    if (!pdfFile) setPdfFile(dataPdf);
  }, [dataPdf]);

  if (!pdfFile) {
    return (
      <Flex w="full" h="full" justifyContent={"center"} alignItems={"center"}>
        <Link href="sc://">
          <Button>Scan</Button>
        </Link>
      </Flex>
    );
  }
  return (
    <Flex w="full" flexDir={"column"} gap="2" h="full">
      <Flex
        w="full"
        p="2"
        rounded={"md"}
        bgColor={"white"}
        justifyContent={"space-between"}
      >
        <Flex gap="2.5">
          <Box>
            <Tooltip label="Scan">
              <IconButton
                size={"md"}
                icon={<ScanIcon size={7} color="gray.400" />}
                aria-label="rotate"
                bgColor={"gray.100"}
                _hover={{ bgColor: "text.textSuccess ", color: "text.white" }}
                onClick={handleOpenInsertFile}
              />
            </Tooltip>
            <Input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => insertPage(e)}
            />
          </Box>
          <Tooltip label="Thêm">
            <IconButton
              size={"md"}
              icon={<PlusFileIcon size={7} color="gray" />}
              aria-label="rotate"
              bgColor={"gray.100"}
              _hover={{ bgColor: "text.textSuccess ", color: "text.white" }}
            />
          </Tooltip>
          <RotatePage>
            {(props: RenderRotatePageProps) => (
              <Tooltip label="Xoay trái">
                <IconButton
                  size={"md"}
                  icon={<RotateLeftIcon size={7} color="gray" />}
                  aria-label="rotate"
                  bgColor={"gray.100"}
                  _hover={{
                    bgColor: "text.textSuccess ",
                    color: "text.white",
                  }}
                  onClick={() =>
                    props.onRotatePage(
                      pageIndex as number,
                      RotateDirection.Forward
                    )
                  }
                />
              </Tooltip>
            )}
          </RotatePage>
          <RotatePage>
            {(props: RenderRotatePageProps) => (
              <Tooltip label="Xoay phải">
                <IconButton
                  size={"md"}
                  icon={<RotateRightIcon size={7} color="gray" />}
                  aria-label="rotate"
                  bgColor={"gray.100"}
                  _hover={{
                    bgColor: "text.textSuccess ",
                    color: "text.white",
                  }}
                  onClick={() =>
                    props.onRotatePage(
                      pageIndex as number,
                      RotateDirection.Backward
                    )
                  }
                />
              </Tooltip>
            )}
          </RotatePage>

          <Tooltip label="Trang sau">
            <IconButton
              size={"md"}
              icon={<ArrowDownIcon size={7} color="gray" />}
              aria-label="rotate"
              bgColor={"gray.100"}
              _hover={{ bgColor: "text.textSuccess ", color: "text.white" }}
              onClick={() => movePage("down")}
            />
          </Tooltip>
          <Tooltip label="Trang trước">
            <IconButton
              size={"md"}
              icon={<ArrowUpAdminIcon size={7} color="gray" />}
              aria-label="rotate"
              bgColor={"gray.100"}
              _hover={{ bgColor: "text.textSuccess ", color: "text.white" }}
              onClick={() => movePage("up")}
            />
          </Tooltip>

          <Tooltip label="Xoá trang">
            <IconButton
              size={"md"}
              icon={<TrashIcon color="gray" />}
              aria-label="rotate"
              bgColor={"gray.100"}
              _hover={{ bgColor: "text.textSuccess ", color: "text.white" }}
              onClick={deletePage}
            />
          </Tooltip>
        </Flex>
        <Flex alignItems={"center"} gap="2">
          <ZoomIn>
            {(props: RenderZoomInProps) => (
              <Tooltip label="Phóng to">
                <IconButton
                  size={"md"}
                  icon={<ZoomInIcon color="gray" />}
                  aria-label="rotate"
                  bgColor={"gray.100"}
                  _hover={{
                    bgColor: "text.textSuccess ",
                    color: "text.white",
                  }}
                  onClick={props.onClick}
                />
              </Tooltip>
            )}
          </ZoomIn>

          <CurrentScale>
            {(props: RenderCurrentScaleProps) => (
              <Text>{`${Math.round(props.scale * 100)}%`}</Text>
            )}
          </CurrentScale>
          <ZoomOut>
            {(props: RenderZoomOutProps) => (
              <Tooltip label="Thu nhỏ">
                <IconButton
                  size={"md"}
                  icon={<ZoomOutIcon color="gray" />}
                  aria-label="rotate"
                  bgColor={"gray.100"}
                  _hover={{
                    bgColor: "text.textSuccess ",
                    color: "text.white",
                  }}
                  onClick={props.onClick}
                />
              </Tooltip>
            )}
          </ZoomOut>
        </Flex>
        <Flex>
          <Tooltip label="Lưu File">
            <IconButton
              size={"md"}
              icon={<SaveFileIcon color="text.white" />}
              aria-label="rotate"
              bgColor={"gray.200"}
              _hover={{ bgColor: "text.textSuccess" }}
            />
          </Tooltip>
        </Flex>
      </Flex>

      <Flex height={"815px"} w="full" gap="2">
        <Flex
          bgColor="bg.white"
          w="20%"
          rounded="md"
          justifyContent={"center"}
          alignItems={"center"}
          p="2"
        >
          <Thumbnails
            renderThumbnailItem={(props) =>
              renderThumbnailItem(props, setPageIndex)
            }
          />
        </Flex>
        <Box
          w="80%"
          h="screen"
          bgColor="bg.white"
          rounded="md"
          className="pdf-viewer-container"
        >
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
          >
            <Viewer
              fileUrl={pdfFile}
              plugins={[
                thumbnailPluginInstance,
                rotatePluginInstance,
                zoomPluginInstance,
              ]}
              defaultScale={SpecialZoomLevel.PageFit}
            />
          </Worker>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ScanView;

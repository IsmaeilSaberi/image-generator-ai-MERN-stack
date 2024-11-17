import React from "react";
import styled from "styled-components";
import FileSaver from "file-saver";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Avatar } from "@mui/material";
import { DownloadRounded } from "@mui/icons-material";

const Card = styled.div`
  position: relative;
  display: flex;
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 60};
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 80};
    scale: 1.05;
  }
  &:nth-child(7n + 1) {
    grid-column: auto/span 2;
    grid-row: auto/span 2;
  }
`;

const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: start;
  gap: 2px;
  justify-content: end;
  flex-direction: column;
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  opacity: 0;
  padding: 16px;
  transition: opacity 0.3s ease;
  color: ${({ theme }) => theme.white};

  ${Card}:hover & {
    opacity: 1;
  }
`;

const Prompt = styled.div`
  font-weight: 400;
  font-size: 15px;
  color: ${({ theme }) => theme.white};
`;
const Author = styled.div`
  font-weight: 600;
  font-size: 14px;
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme }) => theme.white};
`;

const ImageCard = ({ item, heights }) => {
  return (
    <Card>
      <LazyLoadImage
        alt={item?.prompt}
        width="100%"
        // src={item?.photo}
        src="data:image/jpeg;base64,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"
        style={{ borderRadius: "12px" }}
      />
      <HoverOverlay>
        <Prompt>• {item?.prompt}</Prompt>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Author>
            <Avatar sx={{ background: "green", width: "32px", height: "32px" }}>
              {item?.name[0]}
            </Avatar>{" "}
            {item?.name}
          </Author>
          <DownloadRounded
            onClick={() => FileSaver.saveAs(item?.photo, `download.jpg`)}
          />
        </div>
      </HoverOverlay>
    </Card>
  );
};

export default ImageCard;

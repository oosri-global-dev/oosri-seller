import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { avatarMap } from "./avatarMap";
import {
  GridContainer,
  Grid,
  ImageContainer,
  StyledImage,
  SelectedAvatars,
  CheckIcon,
} from "./index.styles";

const AvatarsModal = ({ open, setOpen, setAvatarIndex, avatarIndex }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const avatars = Object.entries(avatarMap).map(([key, url]) => ({
    id: key,
    url,
  }));


  const handleSelectAvatar = (id) => {
    setAvatarIndex(id);
    setSelectedAvatar(selectedAvatar === id ? null : id);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    setSelectedAvatar(avatarIndex);
  }, [avatarIndex]);

  return (
    <Modal
      title="Select Avatar"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
    >
      <GridContainer>
        <Grid>
          {avatars.map((avatar) => (
            <ImageContainer
              key={avatar.id}
              onClick={() => handleSelectAvatar(avatar.id)}
            >
              <StyledImage
                src={avatar.url}
                alt={`Avatar ${avatar.id}`}
                isSelected={selectedAvatar === avatar.id}
              />
              {selectedAvatar === avatar.id && (
                <CheckIcon>
                  <CheckCircleFilled />
                </CheckIcon>
              )}
            </ImageContainer>
          ))}
        </Grid>
      </GridContainer>
      <SelectedAvatars>
        Selected Avatar: {selectedAvatar ? selectedAvatar : "None"}
      </SelectedAvatars>
    </Modal>
  );
};

export default AvatarsModal;

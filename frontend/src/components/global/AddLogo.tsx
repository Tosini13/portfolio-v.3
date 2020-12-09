import React from "react";
import imageCompression from "browser-image-compression";

import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import ClearIcon from "@material-ui/icons/Clear";

import styled from "styled-components";
import { mainTheme } from "../../styled/config";

const LogoContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: fit-content;
  position: relative;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  cursor: pointer;
`;

const LogoStyled = styled.div<{
  src?: string;
}>`
  height: 60px;
  width: 60px;
  background-size: cover;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 5px;
  ${(props) =>
    props.src
      ? `background-image: url("${props.src}");`
      : `display: flex;
    justify-content: center;
    align-items: center;`}
`;

const ButtonRemoveLogoStyled = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: ${mainTheme.palette.primary.main};
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
`;

const TournamentCreateLogoTextFieldStyled = styled.input`
  display: none;
`;

export type ImageModel = {
  name: string;
  file?: any;
};

type AddLogo = {
  image?: ImageModel;
  setImage: (image?: ImageModel) => void;
};

const AddLogo: React.FC<AddLogo> = ({ image, setImage }) => {
  const handleChangeImage = async (e: any) => {
    const image = e.target.files[0];
    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(image, options);
      console.log(compressedFile);
      setImage({
        name: URL.createObjectURL(compressedFile),
        file: compressedFile,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveImage = () => {
    setImage(undefined);
  };

  return (
    <LogoContainerStyled>
      <TournamentCreateLogoTextFieldStyled
        type="file"
        name="file"
        id="file"
        onChange={handleChangeImage}
      />
      <label htmlFor="file">
        <LogoStyled src={image?.name}>
          {image?.name ? null : <AddAPhotoIcon />}
        </LogoStyled>
      </label>
      {image?.name ? (
        <ButtonRemoveLogoStyled onClick={onRemoveImage}>
          <ClearIcon fontSize="small" color="secondary" />
        </ButtonRemoveLogoStyled>
      ) : null}
    </LogoContainerStyled>
  );
};

export default AddLogo;

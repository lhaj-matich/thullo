import React, { useRef, useState } from "react";
import { Image, IconButton, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { MdAddAPhoto } from "react-icons/md";
import { UseFormRegisterReturn } from "react-hook-form";
import { createImageLink } from "../utils/loadImage";

interface ProfileImageProps {
  userImage: string | undefined;
  register?: UseFormRegisterReturn;
}

const ProfileImage = ({ userImage, register }: ProfileImageProps) => {

  const fileInputRef = useRef<HTMLLabelElement | null>(null);
  const [imageData, setImageData] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    register?.onChange(e);
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setImageData(fileReader.result as string);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  return (
    <FormControl position="relative" boxSize={100}>
      <Image objectFit='cover' src={imageData || createImageLink(userImage)} boxSize={100} borderRadius={50} />
      <IconButton
        size="sm"
        variant="private"
        borderRadius={50}
        position="absolute"
        right={1}
        bottom={1}
        aria-label="Upload photo"
        icon={<MdAddAPhoto />}
        onClick={() => fileInputRef.current?.click()}
      />
      <FormLabel visibility="hidden" ref={fileInputRef} htmlFor="profilePicture"></FormLabel>
      <Input
        type="file"
        visibility="hidden"
        id="profilePicture"
        name="profilePicture"
        accept="image/jpeg"
        {...register}
        onChange={handleFileUpload}
      />
    </FormControl>
  );
};

export default ProfileImage;

import {
  Editable,
  EditableTextarea,
  EditablePreview,
  useEditableControls,
  ButtonGroup,
  Button,
  Flex,
  Textarea,
  VStack,
  Box,
  HStack,
  useStyleConfig,
} from "@chakra-ui/react";
import SectionTitle from "./SectionTitle";
import { IoDocumentTextSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

interface EditDescriptionProps {
  clickCB: (value: string) => void;
  width: string | number;
  height: string | number;
}

const EditDescription = () => {

  const previewStyles = useStyleConfig("EditablePreview", { variant: "generic" });
  const SaveControls = () => {
    const { getSubmitButtonProps, getCancelButtonProps, isEditing } = useEditableControls();
    if (!isEditing)
      return null;
    return (
      <HStack marginTop={3}>
        <Button fontSize="14px" variant="green" value="Submit" {...getSubmitButtonProps()}>
          Save
        </Button>
        <Button variant="ghost" {...getCancelButtonProps()}>
          Cancel
        </Button>
      </HStack>
    );
  };

  const EditControls = () => {
    const { getEditButtonProps, isEditing } = useEditableControls();

    return (
      <HStack>
        <SectionTitle title="Description" icon={IoDocumentTextSharp} />
        {!isEditing ? <Button
          {...getEditButtonProps()}
          marginLeft="8px"
          leftIcon={<MdEdit />}
          fontSize="14px"
          variant="outlinePrivate"
        >
          Edit
        </Button> : ""}
      </HStack>
    );
  };

  return (
    <Editable
      onSubmit={(value) => console.log(value)}
      defaultValue="Simple board to start on a porject, each list can bee hold"
      fontSize="lg"
      isPreviewFocusable={false}
    >
      <EditControls />
      <EditablePreview __css={previewStyles} maxHeight="300px" overflow="auto" width="100%" />
      {/* Here is the custom input */}
      <Textarea variant="generic" height="300px" as={EditableTextarea} placeholder="Here is a sample placeholder" />
      <SaveControls />
    </Editable>
  );
};

export default EditDescription;

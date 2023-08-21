import {
  Editable,
  EditableTextarea,
  useEditableControls,
  Button,
  Textarea,
  Box,
  HStack,
  useEditableContext,
} from "@chakra-ui/react";
import SectionTitle from "./SectionTitle";
import { IoDocumentTextSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface EditDescriptionProps {
  clickCB: (value: string) => void;
  width: string | number;
  height: string | number;
}

const EditDescription = () => {
  // const previewStyles = useStyleConfig("EditablePreview", { variant: "generic" });
  const SaveControls = () => {
    const { getSubmitButtonProps, getCancelButtonProps, isEditing } = useEditableControls();
    if (!isEditing) return null;
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
        {!isEditing ? (
          <Button
            {...getEditButtonProps()}
            marginLeft="8px"
            leftIcon={<MdEdit />}
            fontSize="14px"
            variant="outlinePrivate"
          >
            Edit
          </Button>
        ) : (
          ""
        )}
      </HStack>
    );
  };

  const DescriptionPreview = () => {
    const { value } = useEditableContext();
    const { isEditing } = useEditableControls();
    if (isEditing) return null;
    return (
      <Box className="description" paddingY={2} paddingX={8}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
      </Box>
    );
  };

  const descriptionMarkdown = `
  # Heading
  ~~STring~~
  - This is a bullet point
  - This is another bullet point
  \n\n
  **This is bold text** within the description.
`;

  return (
    <Editable
      defaultValue={descriptionMarkdown}
      onSubmit={(value) => console.log(value)}
      fontSize="lg"
      isPreviewFocusable={false}
    >
      <EditControls />
      <DescriptionPreview />
      <Textarea variant="generic" height="300px" as={EditableTextarea} />
      <SaveControls />
    </Editable>
  );
};

export default EditDescription;

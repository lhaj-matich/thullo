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
  value: string | undefined;
  height: string | number;
  edit: boolean;
}

const EditDescription = ({ value, clickCB, height, edit }: EditDescriptionProps) => {
  const SaveControls = () => {
    const { getSubmitButtonProps, getCancelButtonProps, isEditing } = useEditableControls();
    if (!isEditing) return null;
    return (
      <HStack marginY={3}>
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
        {!isEditing && edit ? (
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
      <Box className="description" paddingY={2} paddingX={2}>
        <ReactMarkdown className="reactMarkDown" remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
      </Box>
    );
  };
  return (
    <Editable submitOnBlur={false} defaultValue={value} onSubmit={clickCB} fontSize="lg" isPreviewFocusable={false}>
      <EditControls />
      <DescriptionPreview />
      <Textarea variant="generic" height={height} as={EditableTextarea} />
      <SaveControls />
    </Editable>
  );
};

export default EditDescription;

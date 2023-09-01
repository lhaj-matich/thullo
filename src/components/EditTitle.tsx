import {
  Editable,
  useEditableControls,
  Box,
  useEditableContext,
  Heading,
  EditableInput,
  Input,
  BoxProps,
} from "@chakra-ui/react";

interface EditTitleProps extends BoxProps {
  clickCB: (value: string) => void;
  title: string | undefined;
  edit: boolean;
}

const EditTitle = ({ edit, title, clickCB, ...rest }: EditTitleProps) => {
  const TitlePreview = () => {
    let { value, isValueEmpty } = useEditableContext();
    const { isEditing, getEditButtonProps } = useEditableControls();

    if (isValueEmpty) value = title || "No title";
    if (isEditing) return null;
    return (
      <Box
        {...getEditButtonProps()}
        _hover={{ backgroundColor: "gray.100", borderRadius: "10px" }}
        className="description"
        paddingY={2}
        {...rest}
      >
        <Heading fontWeight={400} paddingX={1} variant="generic" fontSize="19px">
          {value}
        </Heading>
      </Box>
    );
  };
  return (
    <>
      {edit ? (
        <Editable defaultValue={title} onSubmit={clickCB} fontSize="lg" selectAllOnFocus={true}>
            <TitlePreview />
          <Input borderRadius={8} marginY={2} fontWeight={400} fontSize="19px" variant="generic" as={EditableInput} paddingX={3} />
        </Editable>
      ) : (
        <Heading fontWeight={400} paddingX={1} variant="generic" fontSize="19px">
          {title}
        </Heading>
      )}
    </>
  );
};

export default EditTitle;

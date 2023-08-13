import { Button, Icon } from '@chakra-ui/react'

interface ButtonProps {
    icon: any;
    text: string
}

const GenericButton = ({icon, text}: ButtonProps) => {
  return (
    <Button
    variant="private"
    leftIcon={<Icon as={icon} boxSize={4} />}
  >
    {text}
  </Button>
  )
}

export default GenericButton
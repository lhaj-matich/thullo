import { Button, Icon } from '@chakra-ui/react'
import type { ButtonProps } from '@chakra-ui/react';

interface GenericButtonProps extends ButtonProps{
    icon: any;
    text: string
}

const GenericButton = ({icon, text, ...rest}: GenericButtonProps) => {
  return (
    <Button
    variant="private"
    leftIcon={<Icon as={icon} boxSize={4} />}
    {...rest}
  >
    {text}
  </Button>
  )
}

export default GenericButton
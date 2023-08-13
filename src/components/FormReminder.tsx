import React from 'react'
import { Card, Link, Text, HStack } from "@chakra-ui/react";

interface FormReminderProps {
    reminderText: string,
    callToAction: string,
    linkToAction: string
}

const FormReminder = ({reminderText, callToAction, linkToAction} : FormReminderProps) => (
  <Card
    boxShadow="0px 2px 30px rgba(220,220,220, 0.5)"
    width="350px"
    padding={4}
    marginY={5}
    fontFamily="Poppins"    
  >
    <HStack>
      <Text color="gray.600">{reminderText}</Text>
      <Link color="primary" href={linkToAction}>
        {callToAction}
      </Link>
    </HStack>
  </Card>
);

export default FormReminder;
